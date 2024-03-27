<?php

namespace App\DTOs;

use App\Enums\NewsletterStatus;
use App\Models\Newsletter;

class NewsletterStatusDTO extends NewsletterDTO
{

    /**
     * @var "DRAFT" | "PENDING" | "SENT" | "FAILED"
     */
    public $status;

    public function __construct(Newsletter $newsletter)
    {
        parent::__construct($newsletter);
        $this->status = NewsletterStatus::from($newsletter->status_id)->name;
    }
}
