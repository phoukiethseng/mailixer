<?php

namespace App\Http\Controllers;

use App\Services\Interfaces\SubscribePageService;
use App\Services\Interfaces\SubscriptionService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\DTOs\SubscriberDTO;
use App\Repositories\Interfaces\UserRepository;

class DashboardPageController extends Controller
{

    public function __construct(private SubscribePageService $subscribePageService, private SubscriptionService $subscriptionService, private UserRepository $userRepository)
    {

    }
    public function subscribersPage(Request $request)
    {
        $user = $this->userRepository->findById($request->user()->id);
        try {
            $subscribers = $this->subscriptionService->getAllSubscribersByUserId($user->id);
            $SubscriberCount = $this->subscriptionService->getSubscribersCount($user->id);
            return Inertia::render('DashBoard/Subscribers', [
                'subscribers' => collect($subscribers)->mapInto(SubscriberDTO::class),
                'subscribersCount' => $SubscriberCount
            ]);
        } catch (Exception) {
            return back()->withErrors([
                'message' => "Couldn't retrieve subscribers list"
            ]);
        }
    }
    public function customizationPage(Request $request)
    {
        $user = $this->userRepository->findById($request->user()->id);
        try {
            $subscribePageToken = $this->subscribePageService->getSubscribePageTokenByAuthorId($user->id);
            $description = $this->subscribePageService->getDescriptionByToken($subscribePageToken);
            $subscribePageUrl = route('subscribe.index', $subscribePageToken);
        } catch (Exception) {
            return back()->withErrors([
                'message' => "Couldn't retreive page description or preview url"
            ]);
        }
        return Inertia::render('DashBoard/Customization', [
            'description' => $description ? $description : '',
            'subscribeUrl' => $subscribePageUrl
        ]);
    }


    public function indexPage()
    {
        return redirect()->route('dashboard.customization');
    }
}


