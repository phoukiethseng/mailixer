<?php

namespace App\Mail;

use App\Models\Newsletter;
use App\Models\Subscriber;
use App\Models\User;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Headers;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\URL;

class NewsletterEmail extends Mailable
{
    use SerializesModels;

    public function __construct(private Newsletter $newsletter, private User $publisher, private Subscriber $subscriber, private string $unsubscribeUrl)
    {

        $this->unsubscribeUrl = $unsubscribeUrl;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->newsletter->subject,
            to: $this->subscriber->email,
            from: $this->publisher->name . '@mailixer.cc',
        );
    }

    public function headers(): Headers
    {
        return new Headers(text: [
            'List-Unsubscribe-Post' => 'List-Unsubscribe=One-Click',
            'List-Unsubscribe' => '<'. $this->unsubscribeUrl . '>'
        ]);
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
                'subject' => $this->newsletter->subject,
                'subscriberId' => $this->subscriber->id,
                'newsletterId' => $this->newsletter->id,
                'content' => $content,
                'contentType' => $contentType,
                'unsubscribe_url' => $this->unsubscribeUrl
            ]
        );
    }
}
