<?php

namespace App\Enums;

enum NewsletterContentType: int implements CaseNameSearchableBackedEnum {
    case HTML = 1;
    case MARKDOWN = 2;
    case PLAINTEXT = 3;

    public static function getCase(string $caseName): NewsletterContentType {
        return match($caseName) {
            'HTML' => NewsletterContentType::HTML,
            'MARKDOWN' => NewsletterContentType::MARKDOWN,
            'PLAINTEXT' => NewsletterContentType::PLAINTEXT,
        };
    }
}
