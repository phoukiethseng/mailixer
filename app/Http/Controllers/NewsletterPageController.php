<?php

namespace App\Http\Controllers;

use App\DTOs\NewsletterDTO;
use App\Repositories\Interfaces\UserRepository;
use App\Services\Interfaces\NewsletterService;
use Illuminate\Http\Request;
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
            'newsletters' => $newsletters->mapInto(NewsletterDTO::class)
        ]);
    }
}
