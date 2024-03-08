<?php

namespace App\Listeners;

use App\Enums\NewsletterStatus;
use App\Services\Interfaces\NewsletterService;
use Illuminate\Mail\Events\MessageSent;

class SetNewsletterMessageId
{
    /**
     * Create the event listener.
     */
    public function __construct(private NewsletterService $newsletterService)
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(MessageSent $event): void
    {
        $newsletterId = $event->data['newsletterId'];
        $subscriberId = $event->data['subscriberId'];
        $messageHeaders = $event->message->getHeaders();

        if ($messageHeaders != null && $messageHeaders->has('X-Message-ID')) {
            $messageId = $messageHeaders->get('X-Message-ID')->getBody();
            $this->newsletterService->createSendSuccessResult($newsletterId, $subscriberId, $messageId);
            $this->newsletterService->setNewsletterStatus($newsletterId, NewsletterStatus::SENT);
        }
    }
}
