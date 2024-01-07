<?php

namespace App\Services\Implementations;

use App\Models\User;

use App\Repositories\Interfaces\SubscriberRepository;
use App\Repositories\Interfaces\UserRepository;
use App\Services\Interfaces\SubscriptionService;
use App\Services\Interfaces\StringRandomGenerator;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class SubscriptionServiceImpl implements SubscriptionService
{
    public function __construct(private SubscriberRepository $subscriberRepository, private UserRepository $userRepository, private StringRandomGenerator $stringRandomGenerator)
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
        if ($this->subscriberRepository->findByEmail($email) != null) {
            throw new Exception("Email is already subscribed");
        }

        // Add new Subscriber record
        $subscriber = $this->subscriberRepository->getNewInstance([
            'email' => $email,
            'user_id' => $user->id,
            'unsubscribe_token' => $this->stringRandomGenerator->generateRandom(30),
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
        $subscriber = $this->subscriberRepository->findByUnsubscribeToken($unsubscribeToken);
        Log::debug('found subscriber', [$subscriber]);
        $userId = $subscriber->user_id;
        $user = $this->userRepository->findById($userId);
        return $user;
    }
    public function getUnsubscribeTokenById($subscriberId)
    {
        return $this->subscriberRepository->findById($subscriberId)->unsubscribe_token;
    }
}
