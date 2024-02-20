<?php

namespace App\Services\Interfaces;

interface SubscribePageService
{
    public function getSubscribePageTokenByAuthorId($authorId);
    public function getDescriptionByToken($token);

    public function getShowProfilePicture($token);

    public function setShowProfilePicture($token, $value);
    public function updateDescriptionByToken($token, $description);
    public function getAuthorIdByToken($token);

}
