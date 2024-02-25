<?php

namespace App\Services\Interfaces;

use App\Models\SubscribePage;

interface SubscribePageService
{
    public function getSubscribePageTokenByAuthorId($authorId);
    public function getDescriptionByToken($token);

    public function getShowProfilePicture($token);

    public function setShowProfilePicture($token, $value);
    public function updateDescriptionByToken($token, $description);
    public function getAuthorIdByToken($token);

    public function createNewSubscribePage($user): SubscribePage;

}
