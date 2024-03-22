<?php

namespace App\DTOs;

use App\Models\NewsletterSendResult;
use DateTime;

class SendResultDTO extends BaseDTO
{
    public int $subscriberId;
    public bool $isSuccess;

    public DateTime $timestamp;

    public function __construct(NewsletterSendResult $sendResult)
    {
        $this->subscriberId = $sendResult['subscriber_id'];
        $this->isSuccess = $sendResult['is_success'];
        $this->timestamp = $sendResult['created_at'];
    }

}
