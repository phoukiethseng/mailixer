<?php

namespace App\Services;

interface SubscriptionService {
    public function subscribe($userId, $email);
    public function unsubscribeById($subscriberId);
    public function unsusbscribeByToken($unsubscribeToken);
    public function getUnsubscribeUrlByEmail($email);
    public function getUnsubscribeUrlById($subscriberId);
    public function getAllSubscribers($userId);
    public function getSubscribersCount($userId);
    public function getSubscriberById($subscriberId);
    public function getSubscriberByEmail($email);
}