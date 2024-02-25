<?php

namespace App\Repositories\Interfaces;

use App\Repositories\Interfaces\CRUDRepository;
use App\Models\User;

/**
 * @implements CRUDRepository<User, int>
 */
interface UserRepository extends CRUDRepository
{
    public function findByEmail(string $email): User | null;
}
