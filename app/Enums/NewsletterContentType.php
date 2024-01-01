<?php

namespace App\Enums;

enum NewsletterContentType: int {
    case HTML = 1;
    case MARKDOWN = 2;
    case PLAINTEXT = 3;
}
