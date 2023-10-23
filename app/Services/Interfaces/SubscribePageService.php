<?php

namespace App\Services\Interfaces;

interface SubscribePageService
{
    public function getDescription($userId);
    public function updateDescription($userId, $description);

}