<?php

namespace App\Enums;

use App\Enums\CaseNameSearchableBackedEnum;
use BackedEnum;

enum EmailStatus:int implements CaseNameSearchableBackedEnum
{
    case SENT = 1; // Newsletter is accepted and queued for sending
    case DELIVERED = 2; // Newsletter is successfully sent to receiver server
    case REJECTED = 3; // Newsletter was rejected by Mailixer due to reason specified by Mailixer server
    case COMPLAINT = 4; // Newsletter was delivered, but receiver (subscriber) marked it as spam
    case BOUNCED = 5; // Newsletter is sent but was rejected but was rejected by receiving server
    public static function getCase(string $caseName): BackedEnum
    {
        return match ($caseName) {
          'SENT' => self::SENT,
          'DELIVERED' => self::DELIVERED,
          'REJECTED' => self::REJECTED,
          'COMPLAINT' => self::COMPLAINT,
          'BOUNCED' => self::BOUNCED
        };
    }
}
