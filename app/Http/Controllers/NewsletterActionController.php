<?php

namespace App\Http\Controllers;

use App\Repositories\Interfaces\UserRepository;
use App\Services\Interfaces\NewsletterContentType;
use App\Services\Interfaces\NewsletterService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;

class NewsletterActionController extends Controller
{
    public function __construct(
        private NewsletterService $newsletterService,
        private UserRepository $userRepository
    ) {

    }
    public function sendNewsletter(Request $request)
    {
        $data = $request->validate([
            'subject' => 'string|required',
            'content' => 'string|required',
            'content_type_id' => [new Enum(NewsletterContentType::class)],
        ]);

        $user = $this->userRepository->findById($request->user()->id);

        $newsletter = $this->newsletterService->createNewsletter(
            NewsletterContentType::from($data['content_type_id']),
            $data['subject'],
            $data['content'],
            $user
        );

        $this->newsletterService->sendNewsletter($newsletter, $user);

        return back()->with([
            'message' => 'Successfully sent newsletter',
        ]);
    }
    public function saveNewsletter(Request $request)
    {
        $user = $this->userRepository->findById($request->user()->id);
        $data = $request->validate([
            'subject' => 'string|required',
            'content' => 'string|required',
            'content_type_id' => [new Enum(NewsletterContentType::class)],
        ]);
        $newsletter = $this->newsletterService->createNewsletter(
            NewsletterContentType::from($data['content_type_id']),
            $data['subject'],
            $data['content'],
            $user
        );
        return back()->with([
            'id' => $newsletter->id,
            'message' => 'Successully save newsletter'
        ]);
    }
}
