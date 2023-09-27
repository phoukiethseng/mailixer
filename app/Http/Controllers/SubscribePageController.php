<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\SubscribePageService;
use App\Services\SubscriptionService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscribePageController extends Controller
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
}
