<?php

namespace App\Services;

use App\Mail\SendNewsletter;
use App\Models\Newsletter;
use App\Models\User;
use App\Services\SubscriptionService;
use Illuminate\Support\Facades\Mail;

class NewsletterServiceImpl implements NewsletterService {

    public function __construct(private SubscriptionService $subscriptionService) {

    }

    public function sendNewsletter(Newsletter $newsletter, User $author ) {
        $subscribers = $this->subscriptionService->getAllSubscribers($author->id);
        foreach ($subscribers as $subscriber) {
            // FYI: Laravel docs recommendrthat we should use new instance of mailable for each of receipiant
            Mail::send(new SendNewsletter($newsletter, $author, $subscriber));
        }
    }

    public function createNewsletter(NewsletterContentType $contentType,string $subject, string $content, User $author): Newsletter {
        return Newsletter::create([
            'content_type_id' => $contentType,
            'content' => $content,
            'subject' => $subject,
            'user_id' => $author->id,
        ]);
    }

    public function getAllNewsletterForAuthor(User $author) {
        $newsletters = Newsletter::where('user_id', $author->id)->get();
        return $newsletters;
    }

    public function getNewsletterById(int $id): Newsletter {
        $newsletters = Newsletter::find($id);
        return $newsletters;
    }
}