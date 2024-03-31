<?php

namespace App\DTOs;

use App\Enums\NewsletterStatus;
use App\Models\Newsletter;

class NewsletterStatusDTO extends NewsletterDTO
{

    /**
     * @var "DRAFT" | "PENDING" | "SENT"
     */
    public $status;

    public function __construct(Newsletter $newsletter)
    {
        parent::__construct($newsletter);
        $this->status = $newsletter->status;
    }
}
