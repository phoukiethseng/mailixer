<?php

namespace App\DTOs;

use App\DTOs\BaseDTO;
use App\Models\ProfilePicture;
use App\Models\User;

class ProfilePictureDTO extends BaseDTO
{
    public string $base64Data;

    public function __construct(User $user)
    {
        $this->base64Data = $user->profilePicture ? $user->profilePicture['base64_data'] : null;
    }
}
