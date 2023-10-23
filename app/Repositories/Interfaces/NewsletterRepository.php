<?php

namespace App\Repositories\Interfaces;
use App\Models\Newsletter;
use App\Repositories\Interfaces\CrudRepository;

/**
 * @implements CrudRepository<Newsletter, int>
 */
interface NewsletterRepository extends CrudRepository {
    public function findAllByUserId($userId);
}