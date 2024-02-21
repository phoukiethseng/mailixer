<?php

namespace App\Services\Interfaces;

use App\Models\User;

interface AccountService
{
    public function setDisplayName(User $user, string $displayName);
    public function setEmail(User $user, string $email);

    public function setPassword(User $user, string $newPassword, string $oldPassword): bool;

    public function setProfilePicture(User $user, string $base64Image, string $mimeType);
}
