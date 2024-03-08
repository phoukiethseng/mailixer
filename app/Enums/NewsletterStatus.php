<?php

namespace App\Enums;

enum NewsletterStatus: int implements CaseNameSearchableBackedEnum
{
    case DRAFT = 1;
    case PENDING = 2;
    case SENT = 3;

    public static function getCase(string $caseName): NewsletterStatus
    {
        return match ($caseName) {
            'DRAFT' => NewsletterStatus::DRAFT,
            'PENDING' => NewsletterStatus::PENDING,
            'SENT' => NewsletterStatus::SENT,
        };
    }
}
