<?php

namespace App\Enums;

use BackedEnum;

enum EmailStatus:int implements CaseNameSearchableBackedEnum
{
    case SENT = 1; // Newsletter is accepted by outbound MSA server and queued for sending
    case DELIVERED = 2; // Newsletter is successfully sent to receiver server
    case BOUNCE = 3; // Newsletter is sent but was rejected by receiving server
    case COMPLAINT = 4; // Newsletter was delivered, but receiver (subscriber) marked it as spam
    case FAILED = 5; // Newsletter failed to submit to outbound MSA server
    public static function getCase(string $caseName): BackedEnum
    {
        return match ($caseName) {
          'SENT' => self::SENT,
          'DELIVERED' => self::DELIVERED,
          'COMPLAINT' => self::COMPLAINT,
          'BOUNCE' => self::BOUNCE,
          'FAILED' => self::FAILED,
        };
    }
}
