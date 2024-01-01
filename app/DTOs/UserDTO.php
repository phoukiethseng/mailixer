<?php

namespace App\DTOs;

use App\Models\User;
use App\Traits\HasEmail;
use App\Traits\HasId;
use App\Traits\HasName;

class UserDTO {
    use HasId, HasName, HasEmail;
    public function __construct(User $user)
    {
        $this->id = $user->id;
        $this->name = $user->name;
        $this->email = $user->email;
    }
}
