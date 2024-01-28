<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateDescriptionRequest;
use App\Services\Interfaces\SubscribePageService;
use App\Services\Interfaces\SubscriptionService;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;

class DashboardActionController extends Controller
{
    public function __construct(private SubscribePageService $subscribePageService, private SubscriptionService $subscriptionService)
    {

    }
    public function updatePageDescription(UpdateDescriptionRequest $request)
    {
        $data = $request->validated();
        $user = $request->user();
        try {
            $this->subscribePageService->updateDescriptionByToken($user->id, $data['description']);
        } catch (Exception) {
            return back()->withErrors([
                'message' => "Couldn't update subscribe page description"
            ]);
        }
        return back()->with([
            'message' => 'Successfully updated page description'
        ]);
    }

    public function unsubscribe($subscriberId)
    {
        try {
            $this->subscriptionService->unsubscribeById($subscriberId);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return back()->withErrors([
                'message' => "Couldn't unsubscribe {$this->subscriptionService->getSubscriberById($subscriberId)}"
            ]);
        }
        return back()->with([
            'message' => 'Successfully unsubscribed'
        ]);
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
            return response(status: 500)->json([
                'message' => 'Error while generating unsubscribe url'
            ]);
        }

    }
}
