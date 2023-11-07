<?php

namespace App\Services\Implementations;

use App\Mail\SendNewsletter;
use App\Models\Newsletter;
use App\Models\User;
use App\Repositories\Interfaces\NewsletterRepository;
use App\Services\Interfaces\NewsletterContentType;
use App\Services\Interfaces\NewsletterService;
use App\Services\Interfaces\SubscriptionService;
use Illuminate\Support\Facades\Mail;

class NewsletterServiceImpl implements NewsletterService
{

    public function __construct(private SubscriptionService $subscriptionService, private NewsletterRepository $newsletterRepository)
    {

    }

    public function sendNewsletter(Newsletter $newsletter, User $author)
    {
        $subscribers = $this->subscriptionService->getAllSubscribersByUserId($author->id);
        foreach ($subscribers as $subscriber) {
            // FYI: Laravel docs recommend that we should use new instance of mailable for each of receipiant
            Mail::send(new SendNewsletter($newsletter, $author, $subscriber));
        }
    }

    public function createNewsletter(NewsletterContentType $contentType, string $subject, string $content, User $author): Newsletter {
        $data = [
            'content_type_id' => $contentType,
            'content' => $content,
            'subject' => $subject,
            'user_id' => $author->id,
        ];
        $newsletter = $this->newsletterRepository->getNewInstance($data);
        $newsletter = $this->newsletterRepository->save($newsletter);
        return $newsletter;
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
}
