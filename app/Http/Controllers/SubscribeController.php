<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use App\Services\SubscriptionService;
use Inertia\Inertia;

class SubscribeController extends Controller
{
    public function __construct(private SubscriptionService $subscriptionService) {

    }
    public function subscribePage($userId) {

        // Get user's name for requested page
        // TODO: Refactor this to use service instead
        $user = User::select('name', 'id')->where('id', $userId)->take(1)->first();

        if (!$user) {
            return Inertia::render('Error', [
                'message' => "Couldn't find corresponding page"
            ]);
        }

        return Inertia::render('Subscribe/Index', [
            'user' => $user,
            'subscribe' => [
                'description' => 'Subscribe to my newsletter to receive lastest news and activity'
                // TODO: Implement personalized description text feature
                // For now we use this default description text
            ]
        ]);
    }
    public function successPage($userId) {
        return Inertia::render('Subscribe/Success', [
            'user' => User::select('name')->where('id', $userId)->first()
        ]);
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
