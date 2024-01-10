<?php

namespace App\Services\Implementations;

use App\Enums\NewsletterStatus;
use App\Mail\SendNewsletter;
use App\Models\Newsletter;
use App\Models\User;
use App\Repositories\Interfaces\NewsletterRepository;
use App\Repositories\Interfaces\UserRepository;
use App\Services\Interfaces\NewsletterService;
use App\Services\Interfaces\SubscriptionService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Enums\NewsletterContentType;

class NewsletterServiceImpl implements NewsletterService
{

    public function __construct(private SubscriptionService $subscriptionService, private NewsletterRepository $newsletterRepository, private UserRepository $userRepository)
    {

    }

    public function sendNewsletter(Newsletter $newsletter)
    {
        $authorId = $this->newsletterRepository->getAuthorIdById($newsletter->id);
        $author = $this->userRepository->findById($authorId);
        $subscribers = $this->subscriptionService->getAllSubscribersByUserId($author->id);
        foreach ($subscribers as $subscriber) {
            // FYI: Laravel docs recommend that we should use new instance of mailable for each of receipiant
            Mail::send(new SendNewsletter($newsletter, $author, $subscriber));
        }
        // Mark newsletter as Sent
        $newsletter->status()->disassociate();
        $newsletter->status()->associate(\App\Models\NewsletterStatus::find(NewsletterStatus::SENT->value));
        $newsletter->save();
    }

    public function createNewsletter(NewsletterContentType $contentType, string $subject, string $content, User $author): Newsletter {
        $data = [
            'content' => $content,
            'subject' => $subject,
        ];

        $draftNewsletter = $this->newsletterRepository->getNewInstance($data);
        $draftNewsletter->user()->associate($author);
        $draftNewsletter->contentType()->associate(\App\Models\NewsletterContentType::find($contentType->value));
        $draftNewsletter->status()->associate(\App\Models\NewsletterStatus::find(NewsletterStatus::DRAFT->value));

        $draftNewsletter = $this->newsletterRepository->save($draftNewsletter);
        return $draftNewsletter;
    }

    public function getAllNewsletterForAuthor(User $author)
    {
        $newsletters = $this->newsletterRepository->findAllByUserId($author->id);
        return $newsletters;
    }

    public function getNewsletterById(int $id): Newsletter
    {
        $newsletters = $this->newsletterRepository->findById($id);
        return $newsletters;
    }
    public function deleteNewsletter(int $newsletterId)
    {
        $newsletter = $this->newsletterRepository->findById($newsletterId);
        if ($newsletter) {
            $this->newsletterRepository->delete($newsletter);
        }
    }
}
