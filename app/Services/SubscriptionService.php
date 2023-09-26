<?php

namespace App\Services;

interface SubscriptionService {
    public function subscribe($userId, $email);
    public function unsubscribeById($subscriberId);
    public function getAllSubscribers($userId);
    public function getSubscribersCount($userId);
    public function getSubscriber($subscriberId);
}