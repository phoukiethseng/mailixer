<?php

namespace App\Http\Controllers;

use App\Repositories\Interfaces\UserRepository;
use App\Services\Interfaces\NewsletterContentType;
use App\Services\Interfaces\NewsletterService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class NewsletterPageController extends Controller
{
    public function __construct(private NewsletterService $newsletterService, private UserRepository $userRepository)
    {
        
    }
    public function composeNewsletterPage() {
        return Inertia::render('DashBoard/Newsletter/ComposeNewsletter');
    }
    public function draftNewsletterPage(Request $request) {
        $author = $this->userRepository->findById($request->user()->id);
        $newsletters = $this->newsletterService->getAllNewsletterForAuthor($author);
        return Inertia::render('DashBoard/Newsletter/DraftNewsletter', [
            'newsletters' => $newsletters->map(function ($newsletter) {
                return [
                    'id' => $newsletter->id,
                    'subject' => $newsletter->subject,
                    'contentType' => NewsletterContentType::from($newsletter->contentType->id)->name,
                    'content' => $newsletter->content,
                ];
            })
        ]);
    }
}
