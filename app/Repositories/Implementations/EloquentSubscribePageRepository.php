<?php

namespace App\Repositories\Implementations;

use App\Models\SubscribePage;
use App\Repositories\Interfaces\SubscribePageRepository;
use App\Repositories\Traits\EloquentCRUD;
use Illuminate\Support\Facades\Log;

class EloquentSubscribePageRepository implements SubscribePageRepository {
    use EloquentCRUD;

    public function __construct()
    {
        $this->modelClassName = SubscribePage::class;
    }

    public function findByToken($token): SubscribePage | null {
        $subscribePage = SubscribePage::with(['user'])->where('token', $token)->first();
        return $subscribePage;
    }
}
