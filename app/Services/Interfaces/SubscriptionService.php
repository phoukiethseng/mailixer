<?php

namespace App\Services\Interfaces;

interface SubscriptionService
{
    public function subscribe($userId, $email);
    public function unsubscribeById($subscriberId);
    public function unsusbscribeByToken($unsubscribeToken);
    public function getUnsubscribeTokenById($subscriberId);
    public function getSubscribersCount($userId);
    public function getSubscriberById($subscriberId);
    public function getSubscriberAuthorByUnsubscribeToken($unsubscribeToken);
    public function blacklistById($subscriberId);
    public function getAllBlacklistedSubscribersByUserId($userId);
    public function getAllWhitelistedSubscribersByUserId($userId);

    public function whitelistById($subscriberId);

    public function getBlacklistedCount($userId);
    public function getSubscriptionRecordsForUser($userId, \DateTime $from, \DateTime $to);

    public function getAllSubscriptionRecordsForUser($userId);
}
