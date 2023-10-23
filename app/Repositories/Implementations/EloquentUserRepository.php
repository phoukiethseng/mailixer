<?php

namespace App\Repositories\Implementations;

use App\Models\User;
use App\Repositories\Interfaces\UserRepository;
use App\Repositories\Traits\EloquentCRUD;

class EloquentUserRepository implements UserRepository
{
    use EloquentCRUD;
    public function __construct() {
        $this->modelClassName = User::class;
    }
}