<?php

namespace App\Http\Controllers;

use App\Services\Interfaces\SubscribePageService;
use App\Services\Interfaces\SubscriptionService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SubscribeActionController extends Controller
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
        } catch (Exception $e) {
            Log::debug('', [$e]);
            return back()->withErrors([
                'message' => $e->getMessage()
            ]);
        }

        return to_route('subscribe.success', [
            'userId' => $data['user_id']
        ]);
    }
}
