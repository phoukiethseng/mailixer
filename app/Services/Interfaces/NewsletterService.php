<?php

namespace App\Services\Interfaces;

use App\Enums\NewsletterContentType;
use App\Enums\NewsletterStatus;
use App\Models\Newsletter;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

interface NewsletterService
{
    public function sendNewsletter(Newsletter $newsletter);

    public function createNewsletter(NewsletterContentType $content_type, string $subject, string $content, User $author): Newsletter;

    public function getNewsletterById($id): Newsletter;

    /**
     * @param User $author
     * @return Collection<Newsletter>
     */
    public function getAllNewsletterForAuthorUser(User $author);

    public function deleteNewsletter($newsletterId);

    public function saveNewsletter($id, $subject, $content, NewsletterContentType $contentType);

    public function createSendSuccessResult($newsletterId, $subscriberId, $messageId);

    public function createSendFailedResult($newsletterId, $subscriberId);

    public function getAllSendResultsForNewsletterId($newsletterId);

    public function setNewsletterStatus($newsletterId, NewsletterStatus $newsletterStatusEnum);
}
