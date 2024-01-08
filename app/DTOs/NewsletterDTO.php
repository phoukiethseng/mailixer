<?php

namespace App\DTOs;

use App\Enums\NewsletterStatus;
use \App\Models\Newsletter;
use App\Enums\NewsletterContentType;
use App\Traits\HasId;

class NewsletterDTO {
    use HasId;

    public $subject;
    public $content;
    public $contentType;
    public $status;
    public function __construct(Newsletter $newsletter)
    {
        $this->id = $newsletter->id;
        $this->subject = $newsletter->subject;
        $this->content = $newsletter->content;

        $contentTypeId = $newsletter->content_type_id;

        $this->contentType = NewsletterContentType::from($contentTypeId)->name;

        $this->status = NewsletterStatus::from($newsletter->status->id)->name;
    }
}


