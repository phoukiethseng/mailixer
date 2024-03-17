<?php

namespace App\Http\Controllers;

use App\Enums\NewsletterContentType;
use App\Exceptions\ServiceException;
use App\Http\Requests\SaveNewsletterRequest;
use App\Http\Requests\SendDraftNewsletterRequest;
use App\Http\Requests\SendNewsletterRequest;
use App\Http\Requests\UpdateNewsletter;
use App\Models\Newsletter;
use App\Models\User;
use App\Repositories\Interfaces\UserRepository;
use App\Services\Interfaces\NewsletterService;
use Illuminate\Database\Eloquent\Model;
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
            $this->responseMessageWithData('Successfully sent newsletter')
        ]);
    }
    public function sendNewsletter(SendNewsletterRequest $request)
    {
        $data = $request->validated();

        try {
            $user = $this->userRepository->findById($request->user()->id);
            $newsletter = $this->createNewsletter($data, $user);
            $this->newsletterService->sendNewsletter($newsletter);
            return back()->with([
                $this->responseMessageWithData('Successfully sent newsletter')
            ]);
        } catch (ServiceException $e) {
            return back()->withErrors(
                $this->responseMessage('Failed to send newsletter. An error occurred')
            );
        }

    }
    public function saveNewsletter(SaveNewsletterRequest $request)
    {
        $data = $request->validated();

        $user = $this->userRepository->findById($request->user()->id);

        $newsletter = $this->createNewsletter($data, $user);

        return back()->with(
            $this->responseMessageWithData('Successfully save newsletter', [
                'id' => $newsletter->id
            ])
        );
    }
    public function deleteNewsletter(Request $request)
    {
        $data = $request->validate([
            'id' => "numeric",
        ]);
        $this->newsletterService->deleteNewsletter($data["id"]);
        return back()->with(
            $this->responseMessage('Successfully deleted newsletter')
        );
    }

    /**
     * Create and save newsletter
     *
     * @param mixed $data
     * @param Model|User $user
     * @return Newsletter
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
        return back()->with(
            $this->responseMessage('Successfully updated draft newsletter')
        );
    }
}
