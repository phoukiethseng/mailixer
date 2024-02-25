<?php

namespace App\Services\Implementations;

use App\Models\ProfilePicture;
use App\Models\User;
use App\Repositories\Interfaces\UserRepository;
use App\Services\Interfaces\AccountService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class AccountServiceImpl implements AccountService
{

    public function __construct(private UserRepository $userRepository)
    {

    }

    public function setDisplayName(User $user, string $displayName)
    {
        $user->name = $displayName;
        $user->save();
    }

    public function setEmail(User $user, string $email)
    {
        $user->email = $email;
        $user->save();
    }

    public function setProfilePicture(User $user, string $base64Image, string $mimeType)
    {
        $profile = $user->profilePicture;
        if ($profile) {
            $profile->base64_data = $base64Image;
            $profile->save();
        } else {
            $newProfile = ProfilePicture::factory()->makeOne([
                'base64_data' => $base64Image,
                'mime_type' => $mimeType
            ]);
            $user->profilePicture()->save($newProfile);
            $newProfile->save();
        }
        $user->save();
    }

    public function setPassword(User $user, string $newPassword, string $oldPassword): bool
    {
        $userPassword = $user->password;
        if (Hash::check($oldPassword, $userPassword)) {
            $user->password = Hash::make($newPassword);
            $this->userRepository->save($user);
            return true;
        } else {
            return false;
        }
    }

    public function registerNewUser(string $name, string $email, string $password): User
    {
        $newUser = $this->userRepository->getNewInstance([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password)
        ]);

        $this->userRepository->save($newUser);
        Event::dispatch(new Registered($newUser));

        return $newUser;
    }

    public function checkExistingUserByEmail($email): bool
    {
        $user = $this->userRepository->findByEmail($email);
        return !($user);
    }
}
