<?php

namespace App\Enums;

enum NewsletterStatus: int {
    case DRAFT = 1;
    case SENT = 2;
}