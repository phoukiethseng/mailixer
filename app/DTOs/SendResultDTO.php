<?php

namespace App\DTOs;

use App\Enums\EmailStatus;

class SendResultDTO extends BaseDTO
{
    public int $subscriberId;
    public string $status;

    public string | null $timestamp;

    public function __construct($sendResult)
    {
        $this->subscriberId = $sendResult['subscriber_id'];
        $this->timestamp = $sendResult['created_at'];
        $this->status = EmailStatus::from($sendResult['status_id'])->name;
    }

}
