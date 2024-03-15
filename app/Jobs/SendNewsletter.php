<?php

namespace App\Jobs;

use App\Mail\NewsletterEmail;
use App\Models\Newsletter;
use App\Models\Subscriber;
use App\Services\Interfaces\NewsletterService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendNewsletter implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(public Newsletter $newsletter, public Subscriber $subscriber, public NewsletterEmail $newsletterEmail)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // We cannot use failed() method since laravel will create a new instance of Job
        // before invoking failed(), so we would lost reference to the model

        // Another way to solve this is to handle exception ourselves rather than let laravel handle it
        try {
            $message = Mail::send($this->newsletterEmail);
            Log::debug('returned message from Mail::send', ['message' => $message]);
            if ($message) {
                $messageId = $message->getMessageId();
                Log::debug('messageId', ['messageId' => $messageId]);
            }
        } catch (\Throwable $e) {
            Log::debug('send newsletters job failed', ['exeception' => $e->getMessage()]);
            App::get(NewsletterService::class)->createSendFailedResult($this->newsletter->id, $this->subscriber->id);
        }
    }


}
