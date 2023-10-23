<?php

namespace App\Http\Controllers;

use App\Repositories\Interfaces\UserRepository;
use App\Services\Interfaces\SubscribePageService;
use App\Services\Interfaces\SubscriptionService;
use Inertia\Inertia;

class SubscribePageController extends Controller
{
    public function __construct(
        private SubscriptionService $subscriptionService,
        private SubscribePageService $subscribePageService,
        private UserRepository $userRepository
    ) {

    }
    public function subscribePage($userId)
    {
        $user = $this->userRepository->findById($userId);
        $pageDescription = $this->subscribePageService->getDescription($user->id);

        if (!$user) {
            return Inertia::render('Error', [
                'message' => "Couldn't find corresponding page"
            ]);
        }

        return Inertia::render('Subscribe/Index', [
            'auth.user.name' => $user->name,
            'auth.user.id' => $user->id,
            'subscribe' => [
                'description' => $pageDescription,
            ]
        ]);
    }
    public function successPage($userId)
    {
        return Inertia::render('Subscribe/Success');
    }
}
