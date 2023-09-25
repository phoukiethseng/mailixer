<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\SubscribePageService;
use Exception;
use Illuminate\Http\Request;
use App\Services\SubscriptionService;
use Inertia\Inertia;

class SubscribeController extends Controller
{
    public function __construct(private SubscriptionService $subscriptionService, private SubscribePageService $subscribePageService) {

    }
    public function subscribePage($userId) {

        // Get user's name for requested page
        // TODO: Refactor this to use service instead
        $user = User::find($userId);

        if (!$user) {
            return Inertia::render('Error', [
                'message' => "Couldn't find corresponding page"
            ]);
        }

        return Inertia::render('Subscribe/Index', [
            'auth.user.name' => $user->name,
            'auth.user.id' => $user->id,
            'subscribe' => [
                'description' => $this->subscribePageService->getDescription($user->id)
            ]
        ]);
    }
    public function successPage($userId) {
        return Inertia::render('Subscribe/Success');
    }
    public function subscribe(Request $request) {
        $data = $request->validate([
            'user_id' => 'required|numeric',
            'email' => 'required|string|email',
        ]);

        try {
            $this->subscriptionService->subscribe($data['user_id'], $data['email']);
        } catch(Exception $e) {
            return back()->withErrors([
                'message' => $e->getMessage()
            ]);
        }

        return to_route('subscribe.success', [
            'userId' => $data['user_id']
        ]);
    }

}
