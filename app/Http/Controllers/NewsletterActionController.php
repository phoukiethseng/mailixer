<?php

namespace App\Http\Controllers;

use App\Services\NewsletterContentType;
use App\Services\NewsletterService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;

class NewsletterActionController extends Controller
{
    public function __construct(private NewsletterService $newsletterService) {

    }
    public function sendNewsletter(Request $request) {
        $data = $request->validate([
            'user_id' => 'numeric|required',
            'subject' => 'string|required',
            'content' => 'strring|required',
            'content_type' => [new Enum(NewsletterContentType::class)],
        ]);

        $user = $request->user();

        $newsletter = $this->newsletterService->createNewsletter($data['content_type'], $data['subject'], $data['content'], $user);

        $this->newsletterService->sendNewsletter($newsletter, $user);
    }
}
