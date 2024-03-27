<?php

namespace App\Repositories\Implementations;

use App\Models\Subscriber;
use App\Repositories\Interfaces\SubscriberRepository;
use App\Repositories\Traits\EloquentCRUD;
use Illuminate\Database\Eloquent\Collection;

class EloquentSubscriberRepository implements SubscriberRepository
{
    use EloquentCRUD;
    public function __construct() {
        $this->modelClassName = Subscriber::class;
    }

    public function findByEmail($email) {
        return Subscriber::where("email", $email)->whereNull("unsubscribed_at")->first();
    }
    public function findAllByUserId($userId) {
        return Subscriber::where("user_id", $userId)->whereNull("unsubscribed_at")->get();
    }
    public function findByUnsubscribeToken($unsubscribeToken) {
        return Subscriber::where("unsubscribe_token", $unsubscribeToken)->first();
    }

    public function findAllBlacklistedByUserId($userId)
    {
        return Subscriber::where("is_blacklisted", true)->where("user_id", $userId)->whereNull("unsubscribed_at")->get();
    }

    public function findAllWhitelistedByUserId($userId)
    {
        return Subscriber::where("is_blacklisted", false)->where("user_id", $userId)->whereNull("unsubscribed_at")->get();
    }

    public function findAllSubscriptionRecordsByUserId($userId)
    {
        return Subscriber::whereRelation('user', 'id', $userId)->orderBy('created_at', 'asc')->get();
    }
}
