<?php

namespace App\Http\Controllers;

use App\Http\Requests\BlacklistSubscriberRequest;
use App\Http\Requests\WhitelistSubscriberRequest;
use App\Services\Interfaces\SubscribePageService;
use App\Services\Interfaces\SubscriptionService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SubscriptionActionController extends Controller
{
    public function __construct(private SubscriptionService $subscriptionService, private SubscribePageService $subscribePageService)
    {

    }

    public function subscribe(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|numeric',
            'email' => 'required|string|email',
        ]);

        try {
            $this->subscriptionService->subscribe($data['user_id'], $data['email']);
            $subscribePageToken = $this->subscribePageService->getSubscribePageTokenByAuthorId($data['user_id']);
            return to_route('subscribe.success', [
                'token' => $subscribePageToken,
            ]);
        } catch (Exception $e) {
            Log::debug('', [$e]);
            return back()->withErrors(
                $this->responseMessage($e->getMessage())
            );
        }
    }

    public function blacklistSubscriber(BlacklistSubscriberRequest $request)
    {
        $data = $request->validated();
        try {
            $this->subscriptionService->blacklistById($data['id']);
            return back()->with([
                'message' => 'Blacklisted'
            ]);
        } catch (Exception $e) {
            Log::debug('', [$e]);
            return back()->withErrors(
                $this->responseMessage($e->getMessage())
            );
        }
    }

    public function whitelistSubscriber(WhitelistSubscriberRequest $request)
    {
        $data = $request->validated();
        try {
            $this->subscriptionService->whitelistById($data['id']);
            return back()->with(
                $this->responseMessage('Successfully whitelisted subscriber')
            );
        } catch(Exception $e) {
            return back()->with(
                $this->responseMessage('Successfully whitelisted subscriber')
            );
        }
    }

    public function listUnsubscribeOneClick($unsubscribeToken) {
        try {
            $this->subscriptionService->unsusbscribeByToken($unsubscribeToken);
            return response()->setStatusCode(200);
        } catch (Exception $e) {
            Log::debug('listUnsubscribeOneClick', [$e]);
        }
    }
}
