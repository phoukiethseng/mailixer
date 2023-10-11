<?php

namespace App\Services;

use App\Models\Newsletter;
use App\Models\User;

enum NewsletterContentType: int {
    case HTML = 1;
    case MARKDOWN = 2;
    case PLAINTEXT = 3;
}

interface NewsletterService {
    public function sendNewsletter(Newsletter $newsletter, User $author);
    public function createNewsletter(NewsletterContentType $content_type,string $subject, string $content, User $author): Newsletter;
    public function getNewsletterById(int $id): Newsletter;
    public function getAllNewsletterForAuthor(User $author);
}