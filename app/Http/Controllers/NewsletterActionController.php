<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveNewsletterRequest;
use App\Http\Requests\SendDraftNewsletterRequest;
use App\Http\Requests\SendNewsletterRequest;
use App\Http\Requests\UpdateNewsletter;
use App\Repositories\Interfaces\UserRepository;
use App\Enums\NewsletterContentType;
use App\Services\Interfaces\NewsletterService;
use Illuminate\Http\Request;

class NewsletterActionController extends Controller
{
    public function __construct(
        private NewsletterService $newsletterService,
        private UserRepository $userRepository
    ) {

    }

    public function sendDraftNewsletter(SendDraftNewsletterRequest $request)
    {
        $data = $request->validated();
        $newsletter = $this->newsletterService->getNewsletterById($data['id']);
        $this->newsletterService->sendNewsletter($newsletter);
        return back()->with([
            'message' => 'Successfully sent newsletter'
        ]);
    }
    public function sendNewsletter(SendNewsletterRequest $request)
    {
        $data = $request->validated();

        $user = $this->userRepository->findById($request->user()->id);

        $newsletter = $this->createNewsletter($data, $user);

        $this->newsletterService->sendNewsletter($newsletter);

        return back()->with([
            'message' => 'Successfully sent newsletter',
        ]);
    }
    public function saveNewsletter(SaveNewsletterRequest $request)
    {
        $user = $this->userRepository->findById($request->user()->id);
        $data = $request->validated();

        $newsletter = $this->createNewsletter($data, $user);
        return back()->with([
            'id' => $newsletter->id,
            'message' => 'Successfully save newsletter'
        ]);
    }
    public function deleteNewsletter(Request $request)
    {
        $data = $request->validate([
            'id' => "numeric",
        ]);
        $this->newsletterService->deleteNewsletter($data["id"]);
        return back()->with([
            'message' => "Successfully deleted newsletter"
        ]);
    }

    /**
     * @param mixed $data
     * @param \Illuminate\Database\Eloquent\Model|\App\Models\User $user
     * @return \App\Models\Newsletter
     */
    private function createNewsletter(mixed $data, \Illuminate\Database\Eloquent\Model|\App\Models\User $user): \App\Models\Newsletter
    {
        return $this->newsletterService->createNewsletter(
            NewsletterContentType::getCase($data['contentType']),
            $data['subject'],
            $data['content'],
            $user
        );
    }

    public function updateNewsletter(UpdateNewsletter $request)
    {
        $data = $request->validated();
        $this->newsletterService->saveNewsletter($data['id'], $data['subject'], $data['content'], NewsletterContentType::getCase($data['contentType']));
        return back()->with([
            'message' => 'Successfully updated draft newsletter'
        ]);
    }
}
