<?php

namespace App\DTOs;

use App\Models\EmailSendResult;
use DateTime;

class SendResultDTO extends BaseDTO
{
    public int $subscriberId;
    public bool $isSuccess;
    public string $status;

    public string | null $timestamp;

    public function __construct($sendResult)
    {
        $this->subscriberId = $sendResult['subscriber_id'];
        $this->isSuccess = $sendResult['is_success'];
        $this->timestamp = $sendResult['created_at'];
        $this->status = EmailSendResult::getStatus($sendResult['status_id']);
    }

}
