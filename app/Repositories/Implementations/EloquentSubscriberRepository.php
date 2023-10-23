<?php

namespace App\Repositories\Implementations;

use App\Models\Subscriber;
use App\Repositories\Interfaces\SubscriberRepository;
use App\Repositories\Traits\EloquentCRUD;

class EloquentSubscriberRepository implements SubscriberRepository
{
    use EloquentCRUD;
    public function __construct() {
        $this->modelClassName = Subscriber::class;
    }

    public function findByEmail($email) {
        return Subscriber::where("email", $email)->first();
    }
    public function findAllByUserId($userId) {
        return Subscriber::where("user_id", $userId)->get();
    }
    public function findByUnsubscribeToken($unsubscribeToken) {
        return Subscriber::where("unsubscribe_token", $unsubscribeToken)->get();
    }

}