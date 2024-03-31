<?php

namespace App\DTOs;

use App\Models\Newsletter;
use Illuminate\Support\Collection;

class NewsletterWithSendResultsDTO extends NewsletterStatusDTO
{
    /**
     * @var \Illuminate\Support\Collection<SendResultDTO>
     */
    public $sendResults;

    public function __construct(Newsletter $newsletter, Collection $sentResults)
    {
        parent::__construct($newsletter);
        $this->sendResults = $sentResults
            ->mapInto(SendResultDTO::class);
    }
}
