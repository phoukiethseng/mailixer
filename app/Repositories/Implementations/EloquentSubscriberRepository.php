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
        return Subscriber::where("user_id", $userId)->get();
    }
    public function findByUnsubscribeToken($unsubscribeToken) {
        return Subscriber::where("unsubscribe_token", $unsubscribeToken)->first();
    }

    public function findAllBlacklistedByUserId($userId)
    {
        return Subscriber::where("is_blacklisted", true)->where("user_id", $userId)->get();
    }

    public function findAllWhitelistedByUserId($userId)
    {
        return Subscriber::where("is_blacklisted", false)->where("user_id", $userId)->get();
    }

    public function findAllSubscriptionRecordsByUserId($userId)
    {
        return Subscriber::whereRelation('user', 'id', $userId)->orderBy('created_at', 'asc')->get();
    }

    public function findCurrentlyBlacklistedByUserId($userId)
    {
        return $this->findAllBlacklistedByUserId($userId)->whereNull('unsubscribed_at');
    }

    public function findCurrentlyWhitelistedByUserId($userId)
    {
        return $this->findAllWhitelistedByUserId($userId)->whereNull('unsubscribed_at');
    }

    public function findAllSubscribedByUserId($userId)
    {
        return $this->findAllByUserId($userId)->whereNull('unsubscribed_at');
    }
}
