<?php

namespace App\Repositories\Interfaces;

use App\Models\Subscriber;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use App\Repositories\Interfaces\CRUDRepository;

/**
 * @implements CRUDRepository<Subscriber, int>
 */
interface SubscriberRepository extends CRUDRepository
{
    /**
     * Return a single subscriber record that match given email
     * @param string $email
     * @return Subscriber | null
     */
    public function findByEmail($email);
    /**
     * Return a single subscriber record that match given unsubscribe token.
     * @param string $unsubscribeToken
     * @return Subscriber|null
     */
    public function findByUnsubscribeToken($unsubscribeToken);
    /**
     * Return all subscriber records belong to user by user's id.
     * @param int $userId
     * @return Collection<Subscriber>
     */
    public function findAllByUserId($userId);

    /**
     * Return blacklisted subscriber records that belong to user by user's id.
     * @param $userId
     * @return Collection<Subscriber>
     */
    public function findAllBlacklistedByUserId($userId);

    /**
     * Return whitelisted subscriber records that belong to user by user's id.
     * @param $userId
     * @return Collection<Subscriber>
     */
    public function findAllWhitelistedByUserId($userId);

    /**
     * @param $userId
     * @return Collection<Subscriber>
     */
    public function findAllSubscriptionRecordsByUserId($userId);

}
