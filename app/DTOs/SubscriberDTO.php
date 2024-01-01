<?php

namespace App\DTOs;

use \App\Models\Subscriber;
use App\Traits\HasId;
use App\Traits\HasEmail;

class SubscriberDTO
{
    use HasId, HasEmail;

    public $unsubscribeToken;
    public $createdAt;
    public function __construct(Subscriber $subscriber)
    {
        $this->id = $subscriber->id;
        $this->email = $subscriber->email;
        $this->createdAt = $subscriber->created_at;
        $this->unsubscribeToken = $subscriber->unsubscribe_token;
    }
}
