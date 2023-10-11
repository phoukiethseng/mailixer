<?php

namespace App\Http\Controllers;

use App\Models\User;
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
            'subject' => 'string|required',
            'content' => 'string|required',
            'content_type_id' => [new Enum(NewsletterContentType::class)],
        ]);

        $user = User::find($request->user()->id);

        $newsletter = $this->newsletterService->createNewsletter(NewsletterContentType::from($data['content_type_id']), $data['subject'], $data['content'], $user);

        $this->newsletterService->sendNewsletter($newsletter, $user);

        return back()->with([
            'message' => 'Successfully sent newsletter',
        ]);
    }
}
