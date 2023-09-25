<?php

namespace App\Services;

interface SubscribePageService {
    public function getDescription($userId);
    public function updateDescription($userId, $description);

    public function getPageUrl($userId);
}