<?php

namespace App\Http\Controllers;

use App\Http\Requests\EditSubscribePageRequest;
use App\Repositories\Interfaces\UserRepository;
use App\Services\Interfaces\SubscribePageService;
use App\Services\Interfaces\SubscriptionService;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;

class DashboardActionController extends Controller
{

    public function __construct(private SubscribePageService $subscribePageService, private SubscriptionService $subscriptionService, private UserRepository $userRepository)
    {

    }
    public function editSubscribePage(EditSubscribePageRequest $request)
    {
        $data = $request->validated();
        $user = $this->userRepository->findById($request->user()->id);
        $subscribePageToken = $user->subscribePage->token;

        try {
            $this->subscribePageService->updateDescriptionByToken($subscribePageToken, $data['description']);
            $this->subscribePageService->setShowProfilePicture($subscribePageToken, $data['showProfilePicture']);
        } catch (Exception) {
            return back()->withErrors(
                $this->responseMessage("Couldn't update subscribe page description")
            );
        }
        return back()->with(
            $this->responseMessage('Successfully updated page description')
        );
    }

    public function unsubscribe($subscriberId)
    {
        try {
            $this->subscriptionService->unsubscribeById($subscriberId);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return back()->withErrors(
                $this->responseMessage("Couldn't unsubscribe {$this->subscriptionService->getSubscriberById($subscriberId)}")
            );
        }
        return back()->with(
            $this->responseMessage('Successfully unsubscribed')
        );
    }

    public function getUnsubscribeUrl($subscriberId)
    {
        try {
            $token = $this->subscriptionService->getUnsubscribeTokenById($subscriberId);
            $url = URL::signedRoute('unsubscribe', ['unsubscribeToken' => $token]);
            return response()->json([
                'url' => $url
            ]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response(status: 500)->json(
                $this->responseMessage('Error while generating unsubscribe url')
            );
        }

    }
}
