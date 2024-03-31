<?php

namespace App\DTOs;

use App\Models\Subscriber;
use App\Traits\HasEmail;
use App\Traits\HasId;

class SubscriberDTO extends BaseDTO
{
    use HasId, HasEmail;

    public $unsubscribeToken;
    public $createdAt;
    public $status;

    public function __construct(Subscriber $subscriber)
    {
        $this->id = $subscriber->id;
        $this->email = $subscriber->email;
        $this->createdAt = $subscriber->created_at;
        $this->unsubscribeToken = $subscriber->unsubscribe_token;
        $this->status = $subscriber->status->name;
    }
}
