<?php

namespace App\Jobs;

use App\Enums\EmailStatus;
use App\Services\Interfaces\NewsletterService;
use Illuminate\Support\Facades\Log;
use VladimirYuldashev\LaravelQueueRabbitMQ\Queue\Jobs\RabbitMQJob as BaseJob;

class HandleEmailFeedback extends BaseJob
{
  public function fire()
  {
    /**
     * @type NewsletterService $newsletterService
     */
    $newsletterService = $this->container->get(NewsletterService::class);
    $message = $this->payload();
    Log::debug('handling email feedback job', [
      'message' => $message
    ]);

    /**
     * @type $status EmailStatus
     */
    $status = EmailStatus::getCase($message['type']);
    $newsletterService->setEmailSendResult($message['messageId'], $status);

    $this->delete();
  }

  public function getName()
  {
    return '';
  }

}
