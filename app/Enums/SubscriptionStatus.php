<?php

namespace App\Enums;

use App\Enums\CaseNameSearchableBackedEnum;
use BackedEnum;

enum SubscriptionStatus: int implements CaseNameSearchableBackedEnum
{
    case SUBSCRIBED = 1;
    case UNSUBSCRIBED = 2;

    public static function getCase(string $caseName): BackedEnum
    {
        return match ($caseName) {
            'SUBSCRIBED' => SubscriptionStatus::SUBSCRIBED,
            'UNSUBSCRIBED' => SubscriptionStatus::UNSUBSCRIBED,
        };
    }
}
