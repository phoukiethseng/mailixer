<?php

namespace App\Mail;

use App\Models\Newsletter;
use App\Models\Subscriber;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SendNewsletter extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(private Newsletter $newsletter, private User $publisher, private Subscriber $subscriber)
    {
        //
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->newsletter->subject,
            to: $this->subscriber->email,
            from: $this->publisher->email,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return $this->getNewsletterContent();
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }

    private function getNewsletterContent(): Content
    {
        /*
            Convert all content to html format
        */

        $contentType = $this->newsletter->contentType()->first()->name;
        $content = $this->newsletter->content;

        if ($contentType === "markdown") {
            $content = \Illuminate\Support\Str::markdown($content);
        }

        return new Content(
            html: 'email.html_template',
            with: [
                'content' => $content,
                'contentType' => $contentType,
            ]
        );
    }
}