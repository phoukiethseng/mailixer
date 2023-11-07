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
     * @param string $email
     * @return Subscriber|null
     */
    public function findByEmail($email);
    /**
     * @param string $unsubscribeToken
     * @return Subscriber|null
     */
    public function findByUnsubscribeToken($unsubscribeToken);
    /**
     * @param int $userId
     * @return Collection<User>
     */
    public function findAllByUserId($userId);

}