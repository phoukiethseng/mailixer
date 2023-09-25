<?php

namespace App\Services;

interface SubscriptionService {
    public function subscribe($userId, $email);
    public function getAllSubscribers($userId);
}