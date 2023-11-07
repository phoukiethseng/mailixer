<?php

namespace App\Repositories\Interfaces;
use App\Models\Newsletter;
use App\Repositories\Interfaces\CRUDRepository;

/**
 * @implements CRUDRepository<Newsletter, int>
 */
interface NewsletterRepository extends CRUDRepository {
    public function findAllByUserId($userId);
}