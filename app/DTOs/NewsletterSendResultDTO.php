<?php

namespace App\DTOs;

use App\Models\Newsletter;
use Illuminate\Database\Eloquent\Collection;

class NewsletterSendResultDTO extends NewsletterStatusDTO
{
    public array $sendResults;

    public function __construct(Newsletter $newsletter, Collection $sentSubscribers)
    {
        parent::__construct($newsletter);
        $this->sendResults = $sentSubscribers
            ->map(function ($subscriber) {
                $sendResult = $subscriber->sendResult;
                return [
                    'subscriberId' => $sendResult['subscriber_id'],
                    'isSuccess' => $sendResult['is_success']
                ];
            })->toArray();
    }
}
