<?php

namespace App\Services;

interface SubscriptionService {
    public function subscribe($userId, $email);
    public function unsubscribe($subscriberId);
    public function getAllSubscribers($userId);
    public function getSubscribersCount($userId);
    public function getSubscriber($subscriberId);
}