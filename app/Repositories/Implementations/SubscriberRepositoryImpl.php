<?php

namespace App\Repositories\Implementations;

use App\Models\Subscriber;
use App\Repositories\Interfaces\SubscriberRepository;
use App\Repositories\Traits\CRUDable;

class SubscriberRepositoryImpl implements SubscriberRepository
{
    public function save($model)
    {
        $model->save();
    }
    public function findAll()
    {
        return Subscriber::all();
    }
    public function findById($modelId)
    {
        return Subscriber::find($modelId);
    }
    public function delete($model)
    {
        $model->forceDelete();
    }
    public function getNewInstance($attributes)
    {
        return Subscriber::factory()->make($attributes);
    }
    public function findByEmail($email)
    {
        return Subscriber::where("email", $email)->first();
    }
    public function findByUnsubscribeToken($unsubscribeToken)
    {
        return Subscriber::where("unsubscribe_token", $unsubscribeToken)->first();
    }

    public function findAllByUserId($userId)
    {
        return Subscriber::where("user_id", $userId)->get();
    }

}