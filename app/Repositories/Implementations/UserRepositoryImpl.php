<?php

namespace App\Repositories\Implementations;

use App\Models\User;
use App\Repositories\Interfaces\UserRepository;

class UserRepositoryImpl implements UserRepository
{
    public function findAll()
    {
        return User::all();
    }
    public function findById($id)
    {
        return User::find($id);
    }
    public function delete($model)
    {
        $model->forceDelete();
    }
    public function save($model)
    {
        $model->save();
    }
    public function getNewInstance($attributes)
    {
        return User::factory()->make($attributes);
    }
}