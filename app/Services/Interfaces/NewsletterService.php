<?php

namespace App\Services\Interfaces;

use App\Models\Newsletter;
use App\Models\User;
use App\Enums\NewsletterContentType;

interface NewsletterService {
    public function sendNewsletter(Newsletter $newsletter, User $author);
    public function createNewsletter(NewsletterContentType $content_type,string $subject, string $content, User $author): Newsletter;
    public function getNewsletterById(int $id): Newsletter;
    public function getAllNewsletterForAuthor(User $author);
    public function deleteNewsletter(int $newsletterId);
}
