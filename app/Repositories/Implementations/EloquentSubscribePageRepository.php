<?php

namespace App\Repositories\Implementations;

use App\Models\SubscribePage;
use App\Repositories\Interfaces\SubscribePageRepository;
use App\Repositories\Traits\EloquentCRUD;
use Illuminate\Support\Facades\Log;

class EloquentSubscribePageRepository implements SubscribePageRepository {
    use EloquentCRUD;

    public function findByToken($token): SubscribePage | null {
        $subscribePage = SubscribePage::with(['user'])->where('token', $token)->first();
        Log::debug('', ['subscribePage' => $subscribePage, 'token' => $token]);
        return $subscribePage;
    }
}
