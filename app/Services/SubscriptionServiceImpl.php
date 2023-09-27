<?php

namespace App\Services;

use App\Models\Subscriber;
use App\Models\User;

use App\Services\SubscriptionService;
use Exception;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

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
            'unsubscribe_token' => Str::random(20),
        ]);
    }

    public function getAllSubscribers($userId) {
        $subscribers = User::find($userId)->subscribers;

        return $subscribers;
    }
    public function unsubscribeById($subscriberId) {
        $subscriber = Subscriber::find($subscriberId)->first();
        if (!$subscriber) {
            throw new Exception("Couldn't find subscriber");
        }
        $subscriber->forceDelete();
    }
    public function getSubscriber($subscriberId) {
        return Subscriber::find($subscriberId);
    }

    public function getSubscribersCount($userId) {
        $count = User::find($userId)->subscribers()->count();
        return $count;
    }
    public function unsusbscribeByToken($unsubscribeToken) {
       $subscriberId = Subscriber::select('id')->where('unsubscribe_token', $unsubscribeToken)->first(); 
       if ($subscriberId) {
            $this->unsubscribeById($subscriberId);
       } else {
            throw new Exception('Invalid unsubscribe token');
       }
    }
    public function getUnsubscribeUrlById($subscriberId) {
        $subscriber = $this->getSubscriberById($subscriberId);
        if ($subscriber) {
            return Route::signedRoute('unsubscribe', [$subscriber->unsubscribe_token]);
        } else {
            throw new Exception("Couldn't generate unsubscribe url");
        }
    }
    public function getUnsubscribeUrlByEmail($email) {
        $subscriber = $this->getSubscriberByEmail($email);
        $token = $subscriber->unsubscribe_token;
        if ($token) {
            return $token; 
        } else {
            throw new Exception('Email is invalid or not subscribed');
        }
    }
    public function getSubscriberByEmail($email) {
        return Subscriber::where('email', $email)->first();
    }

    public function getSubscriberById($subscriberId) {
        return Subscriber::find($subscriberId)->first();
    }
}