<?php

namespace App\Listeners;

use App\Enums\NewsletterStatus;
use App\Services\Interfaces\NewsletterService;
use Illuminate\Mail\Events\MessageSent;
use Illuminate\Support\Facades\Log;

class CreateSuccessSendResult
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
        $messageHeaders = $event->message->getHeaders();
        Log::debug('message headers', ['headers' => $messageHeaders]);

        if (($messageHeaders->has('X-Message-ID') || $messageHeaders->has('Message-ID'))
            && $messageHeaders->has('X-Mailixer-Newsletter')) {

            $newsletterId = $event->data['newsletterId'];
            $subscriberId = $event->data['subscriberId'];

            $messageId = match(true) {
                $messageHeaders->has('Message-ID') => $messageHeaders->get('Message-ID')->getBody(),
                $messageHeaders->has('X-Message-ID') => $messageHeaders->get('X-Message-ID')->getBody(),
            };

            Log::debug('setting message id', ['messageId' => $messageId]);

            $this->newsletterService->createSendSuccessResult($newsletterId, $subscriberId, $messageId);
            $this->newsletterService->setNewsletterStatus($newsletterId, NewsletterStatus::SENT);
        }
    }
}
