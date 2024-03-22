<?php

namespace App\DTOs;

use App\Models\Newsletter;
use Illuminate\Database\Eloquent\Collection;

class NewsletterWithSendResultsDTO extends NewsletterStatusDTO
{
    /**
     * @var \Illuminate\Support\Collection<SendResultDTO>
     */
    public $sendResults;

    public function __construct(Newsletter $newsletter, Collection $sentSubscribers)
    {
        parent::__construct($newsletter);
        $this->sendResults = $sentSubscribers
            ->mapInto(SendResultDTO::class)
            ->toArray();
    }
}
