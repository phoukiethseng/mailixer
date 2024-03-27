<?php

namespace App\Services\Implementations;

use App\Exceptions\ServiceException;
use App\Models\Subscriber;
use App\Repositories\Interfaces\SubscriberRepository;
use App\Repositories\Interfaces\UserRepository;
use App\Services\Interfaces\StringRandomGenerator;
use App\Services\Interfaces\SubscriptionService;
use Carbon\Carbon;
use Exception;

class SubscriptionServiceImpl implements SubscriptionService
{
    public function __construct(private SubscriberRepository $subscriberRepository, private UserRepository $userRepository, private StringRandomGenerator $stringRandomGenerator)
    {

    }

    private function unsubscribe(Subscriber $subscriber)
    {
        $subscriber->unsubscribed_at = \Illuminate\Support\Carbon::now("UTC");
    }

    private function isUnsubscribed(Subscriber $subscriber)
    {
        return isset($subscriber->unsubscribed_at);
    }

    public function subscribe($userId, $email)
    {
        // Check if user exist
        try {
            $user = $this->userRepository->findById($userId);
        } catch (Exception $e) {
            throw new ServiceException("Error while querying for user", $e);
        }

        if (!$user) {
            throw new ServiceException("User does not exist");
        }

        // Check for existing subscriber
        if ($this->subscriberRepository->findByEmail($email) != null) {
            throw new ServiceException("Email is already subscribed");
        }

        // Add new Subscriber record
        $subscriber = $this->subscriberRepository->getNewInstance([
            'email' => $email,
            'user_id' => $user->id,
        ]);
        $this->subscriberRepository->save($subscriber);
    }

    public function getAllSubscribersByUserId($userId)
    {
        try {
            $subscribers = $this->subscriberRepository->findAllByUserId($userId);
        } catch (Exception $e) {
            throw new ServiceException("Error while querying for all author's subscribers", $e);
        }

        return $subscribers;
    }

    public function unsubscribeById($subscriberId)
    {
        try {
            $subscriber = $this->subscriberRepository->findById($subscriberId);
        } catch (Exception $e) {
            throw new ServiceException("Error while query for subscriber", $e);
        }

        if (!$subscriber) {
            throw new Exception("Couldn't find subscriber");
        }

        if ($this->isUnsubscribed($subscriber)) {
            throw new ServiceException("Subscriber is already unsubscribed");
        }

        $this->unsubscribe($subscriber);
        $this->subscriberRepository->save($subscriber);
    }

    public function getSubscribersCount($userId)
    {
        try {
            $count = $this->subscriberRepository->findAllByUserId($userId)->count();
        } catch (Exception $e) {
            throw new ServiceException("Error while query for subscriber count", $e);
        }
        return $count;
    }

    public function unsusbscribeByToken($unsubscribeToken)
    {
        try {
            $subscriber = $this->subscriberRepository->findByUnsubscribeToken($unsubscribeToken);
        } catch (Exception $e) {
            throw new ServiceException("Cannot find subscriber", $e);
        }

        if (!$subscriber) {
            throw new ServiceException("Invalid unsubscribe token");
        }

        if ($this->isUnsubscribed($subscriber)) {
            throw new ServiceException("Subscriber is already unsubscribed");
        }

        $this->unsubscribe($subscriber);
        $this->subscriberRepository->save($subscriber);
    }

    public function getSubscriberById($subscriberId)
    {
        return $this->subscriberRepository->findById($subscriberId);
    }

    public function getSubscriberAuthorByUnsubscribeToken($unsubscribeToken)
    {
        try {
            $subscriber = $this->subscriberRepository->findByUnsubscribeToken($unsubscribeToken);
        } catch (Exception $e) {
            throw new ServiceException("Error while querying for subscriber", $e);
        }

        if (!$subscriber) {
            throw new ServiceException("Cannot find subscriber");
        }

        $userId = $subscriber->user_id;

        try {
            $user = $this->userRepository->findById($userId);
        } catch (Exception $e) {
            throw new ServiceException("Cannot find author of given subscriber", $e);
        }

        return $user;
    }

    public function getUnsubscribeTokenById($subscriberId)
    {
        try {
            $subscriber = $this->subscriberRepository->findById($subscriberId);
        } catch (Exception $e) {
            throw new ServiceException("Error while querying for subscriber", $e);
        }

        if (!$subscriber) {
            throw new ServiceException("Cannot find subscriber");
        }

        return $subscriber->unsubscribe_token;
    }

    public function blacklistById($subscriberId)
    {
        try {
            $subscriber = $this->subscriberRepository->findById($subscriberId);
        } catch (Exception $e) {
            throw new ServiceException("Error while querying for blacklisted subscriber", $e);
        }

        if (!$subscriber) {
            throw new ServiceException("Cannot find subscriber");
        }

        $subscriber->is_blacklisted = true;
        $this->subscriberRepository->save($subscriber);
    }

    public function getAllBlacklistedSubscribersByUserId($userId)
    {
        try {
            return $this->subscriberRepository->findAllBlacklistedByUserId($userId);
        } catch (Exception $e) {
            throw new ServiceException('Error while querying for blacklisted subscribers', $e);
        }
    }

    public function getAllWhitelistedSubscribersByUserId($userId)
    {
        try {
            return $this->subscriberRepository->findAllWhitelistedByUserId($userId);
        } catch (Exception $e) {
            throw new ServiceException('Error while querying for whitelisted subscribers', $e);
        }
    }

    public function whitelistById($subscriberId)
    {
        try {
            $subscriber = $this->subscriberRepository->findById($subscriberId);
        } catch (Exception $e) {
            throw new ServiceException("Error while performing whitelist subscriber action", $e);
        }

        if (!$subscriber) {
            throw new ServiceException("Cannot find subscriber");
        }

        $subscriber->is_blacklisted = false;
        $this->subscriberRepository->save($subscriber);
    }

    public function getBlacklistedCount($userId)
    {
        try {
            return $this->subscriberRepository->findAllBlacklistedByUserId($userId)->count();
        } catch (Exception $e) {
            throw new ServiceException("Error while performing counting whitelisted subscribers", $e);
        }
    }

    public function getSubscriptionRecordsForUser($userId, \DateTime $from, \DateTime $to)
    {
        $subscribers = $this->subscriberRepository->findAllSubscriptionRecordsByUserId($userId);
        $fromCarbon = Carbon::instance($from);
        $toCarbon = Carbon::instance($to);
        return $subscribers->filter(function (Subscriber $subscriber) use ($fromCarbon, $toCarbon) {
            $createdAt = Carbon::instance($subscriber->created_at);
            if ($createdAt->gte($fromCarbon) && $createdAt->lte($toCarbon)) {
                return true;
            }

            if ($subscriber->unsubscribed_at) {
                $unsubscribedAt = Carbon::parse($subscriber->unsubscribed_at);
                if ($unsubscribedAt->gte($fromCarbon) && $unsubscribedAt->lte($toCarbon)) {
                    return true;
                }
            }

            return false;
        });
    }
}
