<?php

namespace App\Services\Implementations;

use App\Models\Subscriber;
use App\Models\User;

use App\Repositories\Interfaces\SubscriberRepository;
use App\Repositories\Interfaces\UserRepository;
use App\Services\Interfaces\SubscriptionService;
use Exception;
use Illuminate\Support\Str;

class SubscriptionServiceImpl implements SubscriptionService
{
    public function __construct(private SubscriberRepository $subscriberRepository, private UserRepository $userRepository)
    {

    }
    public function subscribe($userId, $email)
    {
        // Check if user exist
        $user = $this->userRepository->findById($userId);

        if (!$user) {
            throw new Exception("User does not exist");
        }

        // Check for existing subscriber
        if ($this->subscriberRepository->findByEmail($email)) {
            throw new Exception("Email is already subscribed");
        }

        // Add new Subscriber record
        $subscriber = $this->subscriberRepository->getNewInstance([
            'email' => $email,
            'user_id' => $user->id,
            'unsubscribe_token' => Str::random(20),
        ]);
        $this->subscriberRepository->save($subscriber);
    }

    public function getAllSubscribersByUserId($userId)
    {
        $subscribers = $this->subscriberRepository->findAllByUserId($userId);

        return $subscribers;
    }
    public function unsubscribeById($subscriberId)
    {
        $subscriber = $this->subscriberRepository->findById($subscriberId);
        if (!$subscriber) {
            throw new Exception("Couldn't find subscriber");
        }
        $this->subscriberRepository->delete($subscriber);
    }
    public function getSubscriber($subscriberId)
    {
        return $this->subscriberRepository->findById($subscriberId);
    }

    public function getSubscribersCount($userId)
    {
        $count = $this->subscriberRepository->findAllByUserId($userId)->count();
        return $count;
    }
    public function unsusbscribeByToken($unsubscribeToken)
    {
        $subscriberId = $this->subscriberRepository->findByUnsubscribeToken($unsubscribeToken)->id;
        if ($subscriberId) {
            $this->unsubscribeById($subscriberId);
        } else {
            throw new Exception('Invalid unsubscribe token');
        }
    }

    public function getSubscriberById($subscriberId)
    {
        return $this->subscriberRepository->findById($subscriberId);
    }

    public function getSubscriberAuthorByUnsubscribeToken($unsubscribeToken): User
    {
        return $this->subscriberRepository->findByUnsubscribeToken($unsubscribeToken)->user;
    }
    public function getUnsubscribeTokenById($subscriberId)
    {
        return $this->subscriberRepository->findById($subscriberId)->unsubscribe_token;
    }
}