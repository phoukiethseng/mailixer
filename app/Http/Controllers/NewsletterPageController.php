<?php

namespace App\Http\Controllers;

use App\DTOs\NewsletterWithSendResultsDTO;
use App\DTOs\NewsletterStatusDTO;
use App\Http\Requests\PreviewNewsletterRequest;
use App\Repositories\Interfaces\UserRepository;
use App\Services\Interfaces\NewsletterService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\View;
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
            Log::debug("newsletter send results", ['sendResults' => $sendResults]);
            return new NewsletterWithSendResultsDTO($newsletter, $sendResults);
        });
        return Inertia::render('DashBoard/Newsletter/NewsletterStatus', [
            'newsletters' => $newsletterSendResultsDTOs
        ]);
    }

    public function previewNewsletter($newsletterId)
    {
        $newsletter = $this->newsletterService->getNewsletterById($newsletterId);
        $previewNewsletterRawHTML = View::make('email.html_template', [
            'subject' => $newsletter->subject,
            'contentType' => $newsletter->contentType,
            'content' => $newsletter->content,
            'unsubscribe_url' => "",
        ])->render();
        return response()->json([
            'html' => $previewNewsletterRawHTML
        ]);
    }
}
