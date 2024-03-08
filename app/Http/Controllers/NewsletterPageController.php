<?php

namespace App\Http\Controllers;

use App\DTOs\NewsletterSendResultDTO;
use App\DTOs\NewsletterStatusDTO;
use App\Repositories\Interfaces\UserRepository;
use App\Services\Interfaces\NewsletterService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Inertia\Inertia;

class NewsletterPageController extends Controller
{
    public function __construct(private NewsletterService $newsletterService, private UserRepository $userRepository)
    {

    }

    public function composeNewsletterPage()
    {
        return Inertia::render('DashBoard/Newsletter/ComposeNewsletter');
    }

    public function draftNewsletterPage(Request $request)
    {
        $author = $this->userRepository->findById($request->user()->id);
        $newsletters = $this->newsletterService->getAllNewsletterForAuthorUser($author);
        return Inertia::render('DashBoard/Newsletter/DraftNewsletter', [
            'newsletters' => $newsletters->mapInto(NewsletterStatusDTO::class)
        ]);
    }

    public function newsletterStatusPage(Request $request)
    {
        $user = $this->userRepository->findById($request->user()->id);
        $newsletters = $this->newsletterService->getAllNewsletterForAuthorUser($user);
        $newsletterSendResultsDTOs = $newsletters->map(function ($newsletter) {
            $sendResults = App::get(NewsletterService::class)->getAllSendResultsForNewsletterId($newsletter->id);
            return new NewsletterSendResultDTO($newsletter, $sendResults);
        });
        return Inertia::render('DashBoard/Newsletter/NewsletterStatus', [
            'newsletters' => $newsletterSendResultsDTOs
        ]);
    }
}
