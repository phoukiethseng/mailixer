<?php

namespace App\DTOs;

use App\Enums\NewsletterContentType;
use App\Models\Newsletter;
use App\Traits\HasId;

class NewsletterDTO extends BaseDTO
{
    use HasId;

    public $subject;
    public $content;
    public $contentType;

    public function __construct(Newsletter $newsletter)
    {
        $this->id = $newsletter->id;
        $this->subject = $newsletter->subject;
        $this->content = $newsletter->content;

        $contentTypeId = $newsletter->content_type_id;

        $this->contentType = NewsletterContentType::from($contentTypeId)->name;
    }
}


