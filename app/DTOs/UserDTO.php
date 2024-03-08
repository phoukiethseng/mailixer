<?php

namespace App\DTOs;

use App\Models\User;
use App\Traits\HasEmail;
use App\Traits\HasId;
use App\Traits\HasName;

class UserDTO extends BaseDTO
{
    use HasId, HasName, HasEmail;

    public string $profilePictureType;
    public $profilePicture;

    public function __construct(User $user)
    {
        $profile = $user->profilePicture;
        $this->id = $user->id;
        $this->name = $user->name;
        $this->email = $user->email;
        $this->profilePicture = $profile?->base64_data;
        $this->profilePictureType = $profile?->mime_type ?: "";
    }
}
