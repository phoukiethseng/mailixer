<?php

namespace App\Repositories\Implementations;
use App\Models\Newsletter;
use App\Repositories\Interfaces\NewsletterRepository;
use App\Repositories\Traits\EloquentCRUD;

class EloquentNewsletterRepository implements NewsletterRepository {
    use EloquentCRUD;
    public function __construct() {
        $this->modelClassName = Newsletter::class;
    }
    public function findAllByUserId($userId) {
        return Newsletter::with(['contentType'])->where("user_id", $userId)->get();
    }
}