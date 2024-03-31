<?php

namespace App\DTOs;

use App\DTOs\BaseDTO;
use App\Models\Subscriber;
use App\Traits\HasEmail;
use App\Traits\HasId;

class SubscriptionRecordDTO extends SubscriberDTO
{
    use HasId, HasEmail;
    public $unsubscribedAt;

    public function __construct(Subscriber $subscriber)
    {
        parent::__construct($subscriber);
        $this->id = $subscriber->id;
        $this->email = $subscriber->email;
        $this->createdAt = $subscriber->created_at;
        $this->unsubscribedAt = $subscriber->unsubscribed_at;
    }


}
