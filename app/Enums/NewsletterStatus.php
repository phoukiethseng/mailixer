<?php

namespace App\Enums;

enum NewsletterStatus: int implements CaseNameSearchableBackedEnum {
    case DRAFT = 1;
    case SENT = 2;

    public static function getCase(string $caseName): NewsletterStatus
    {
        return match ($caseName) {
            'DRAFT' => NewsletterStatus::DRAFT,
            'SENT' => NewsletterStatus::SENT
        };
    }
}
