<?php

namespace App\Services\Implementations;

use App\Exceptions\ServiceException;
use App\Models\ProfilePicture;
use App\Models\User;
use App\Repositories\Interfaces\UserRepository;
use App\Services\Interfaces\AccountService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;

class AccountServiceImpl implements AccountService
{

    public function __construct(private UserRepository $userRepository)
    {

    }

    public function setDisplayName(User $user, string $displayName)
    {
        $user->name = $displayName;
        $this->userRepository->save($user);
    }

    public function setEmail(User $user, string $email)
    {
        $user->email = $email;
        $this->userRepository->save($user);
    }

    public function setProfilePicture(User $user, string $base64Image, string $mimeType)
    {
        $profile = $user->profilePicture;
        if ($profile) {
            $profile->base64_data = $base64Image;
//            $profile->save();
            $user->profilePicture()->save($profile);
        } else {
            $newProfile = ProfilePicture::factory()->makeOne([
                'base64_data' => $base64Image,
                'mime_type' => $mimeType
            ]);
            $user->profilePicture()->save($newProfile);
//            $newProfile->save();
        }
        $this->userRepository->save($user);

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
        try {
            DB::beginTransaction();

            $newUser = $this->userRepository->getNewInstance([
                'name' => $name,
                'email' => $email,
                'password' => Hash::make($password)
            ]);

            $this->userRepository->save($newUser);

            // Make sure any side-effect run successfully before committing,
            // rollback if any of side-effect failed to run
            Event::dispatch(new Registered($newUser));

            DB::commit();

            return $newUser;

        } catch (\Exception $e) {
            DB::rollBack();
            Log::debug('verifyEmail', ['trace' => $e->getTraceAsString()]);
            throw new ServiceException("Failed to create new user");
        }
    }

    public function checkExistingUserByEmail($email): bool
    {
        $user = $this->userRepository->findByEmail($email);
        return !($user);
    }
}
