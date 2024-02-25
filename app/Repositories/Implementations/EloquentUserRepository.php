<?php

namespace App\Repositories\Implementations;

use App\Models\SubscribePage;
use App\Models\User;
use App\Repositories\Interfaces\UserRepository;
use App\Repositories\Traits\EloquentCRUD;

class EloquentUserRepository implements UserRepository
{
    use EloquentCRUD;
    public function __construct() {
        $this->modelClassName = User::class;
    }

    public function findByEmail(string $email): User | null
    {
        return User::where('email', $email)->first();
    }
}
