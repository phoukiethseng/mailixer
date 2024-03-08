<?php

namespace App\Repositories\Interfaces;

use App\Models\Newsletter;
use Illuminate\Database\Eloquent\Collection;

/**
 * @implements CRUDRepository<Newsletter, int>
 */
interface NewsletterRepository extends CRUDRepository
{
    public function findAllByUserId($userId): Collection;

    public function getAuthorIdById($id);

    public function getAllSendResults($newsletterId): Collection;

}
