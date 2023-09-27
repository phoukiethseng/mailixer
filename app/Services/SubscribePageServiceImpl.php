<?php

namespace App\Services;

use App\Models\User;
use App\Services\SubscribePageService;
use Illuminate\Support\Facades\URL;
use Exception;

class SubscribePageServiceImpl implements SubscribePageService {
    public function getDescription($userId) {
        return User::find($userId)->subscribePage->description;
    }

    public function updateDescription($userId, $newDescription) {
        $subscribePage = User::find($userId)->subscribePage;
        $subscribePage->description = $newDescription;
        $subscribePage->save();
    }
    public function getPageUrl($userId) {
        return route("subscribe.index", $userId);
    }
}