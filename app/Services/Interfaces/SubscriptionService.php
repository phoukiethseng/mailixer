<?php

namespace App\Services\Interfaces;

interface SubscriptionService
{
    public function subscribe($userId, $email);
    public function unsubscribeById($subscriberId);
    public function unsusbscribeByToken($unsubscribeToken);
    public function getUnsubscribeTokenById($subscriberId);
    public function getAllSubscribersByUserId($userId);
    public function getSubscribersCount($userId);
    public function getSubscriberById($subscriberId);
    public function getSubscriberAuthorByUnsubscribeToken($unsubscribeToken);
}