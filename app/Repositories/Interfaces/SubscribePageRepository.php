<?php

namespace App\Repositories\Interfaces;
use App\Models\SubscribePage;

interface SubscribePageRepository extends CRUDRepository {
    public function findByToken($token): SubscribePage | null;
}
