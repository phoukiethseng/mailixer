<?php

namespace App\DTOs;

use App\Models\User;
use App\Traits\HasEmail;
use App\Traits\HasId;
use App\Traits\HasName;
use Illuminate\Support\Facades\URL;

class UserDTO extends BaseDTO
{
    use HasId, HasName, HasEmail;

    public string $profilePictureType;
    public $profilePictureUrl;

    public function __construct(User $user)
    {
        $profile = $user->profilePicture;
        $this->id = $user->id;
        $this->name = $user->name;
        $this->email = $user->email;
        $this->profilePictureUrl = URL::signedRoute('user.profile', $user->id);
        $this->profilePictureType = $profile?->mime_type ?: "";
    }
}
