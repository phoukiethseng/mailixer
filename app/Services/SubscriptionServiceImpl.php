<?php

namespace App\Services;

use App\Models\Subscriber;
use App\Models\User;

use App\Services\SubscriptionService;
use Exception;

class SubscriptionServiceImpl implements SubscriptionService {
    public function subscribe($userId, $email) {
        // Check if user exist
        $user = User::where('id', $userId)->first();
        
        if(!$user) {
            throw new Exception("User does not exist");
        } 

        // Check for existing subscriber
        if (Subscriber::where('email', $email)->first()) {
            throw new Exception("Email is already subscribed");
        }

        // Add new Subscriber record
        Subscriber::create([
            'email' => $email,
            'user_id' => $user->id,
            'unsubscribe_token' => base64_encode($email),
        ]);
    }

    public function getAllSubscribers($userId) {
        $subscribers = User::find($userId)->subscribers;

        return $subscribers;
    }
    public function unsubscribe($subscriberId) {
        $subscriber = Subscriber::find($subscriberId);
        $subscriber->forceDelete();
    }
    public function getSubscriber($subscriberId) {
        return Subscriber::find($subscriberId);
    }

    public function getSubscribersCount($userId) {
        $count = User::find($userId)->subscribers()->count();
        return $count;
    }
}