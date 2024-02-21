<?php

namespace App\Services\Implementations;

use App\Models\ProfilePicture;
use App\Models\User;
use App\Services\Interfaces\AccountService;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class AccountServiceImpl implements AccountService
{
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
            $user->profilePicture->save($newProfile);
            $newProfile->save();
        }
        $user->save();
    }

    public function setPassword(User $user, string $newPassword, string $oldPassword): bool
    {
        $userPassword = $user->password;
        if (Hash::check($oldPassword, $userPassword)) {
            $user->password = Hash::make($newPassword);
            $user->save();
            return true;
        } else {
            return false;
        }
    }
}
