<?php

namespace App\Http\Controllers;

use App\DTOs\NewsletterDTO;
use App\Services\Interfaces\NewsletterService;
use App\Services\Interfaces\SubscribePageService;
use App\Services\Interfaces\SubscriptionService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\DTOs\SubscriberDTO;
use App\Repositories\Interfaces\UserRepository;

class DashboardPageController extends Controller
{

    public function __construct(private SubscribePageService $subscribePageService, private SubscriptionService $subscriptionService, private UserRepository $userRepository, private NewsletterService $newsletterService)
    {

    }

    public function allSubscribersPage(Request $request)
    {
        $user = $this->userRepository->findById($request->user()->id);
        try {
            // We only return whitelisted subscribers since now
            // we have a dedicated blacklisted subscribers page
            $subscribers = $this->subscriptionService->getAllWhitelistedSubscribersByUserId($user->id);
            $SubscriberCount = $this->subscriptionService->getSubscribersCount($user->id);
            $blacklistedSubscribersCount = $this->subscriptionService->getBlacklistedCount($user->id);
            return Inertia::render('DashBoard/Subscribers/AllSubscribers', [
                'subscribers' => $subscribers->mapInto(SubscriberDTO::class),
                'subscribersCount' => $SubscriberCount,
                'blacklistedSubscribersCount' => $blacklistedSubscribersCount
            ]);
        } catch (Exception) {
            return back()->withErrors(
                $this->responseMessage("Couldn't retrieve subscribers list")
            );
        }
    }

    public function customizationPage(Request $request)
    {
        $user = $this->userRepository->findById($request->user()->id);
        try {
            $subscribePageToken = $this->subscribePageService->getSubscribePageTokenByAuthorId($user->id);
            $description = $this->subscribePageService->getDescriptionByToken($subscribePageToken);
            $subscribePageUrl = route('subscribe.index', $subscribePageToken);
            $showProfilePicture = $this->subscribePageService->getShowProfilePicture($subscribePageToken);

            return Inertia::render('DashBoard/Customization', [
                'subscribePage' => [
                    'showProfilePicture' => $showProfilePicture,
                    'description' => $description,
                    'subscribeUrl' => $subscribePageUrl,
            ]
        ]);

        } catch (Exception $e) {
            Log::debug("customization page", [$e]);
            return back()->withErrors(
                $this->responseMessage("Couldn't retrieve page description or preview url")
            );
        }

    }


    public function indexPage()
    {
        return redirect()->route('dashboard.customization');
    }

    public function blacklistedSubscribersPage(Request $request)
    {
        $userId = $request->user()->id;
        return Inertia::render('DashBoard/Subscribers/BlacklistedSubscribers', [
            'subscribers.blacklisted' => $this->subscriptionService->getAllBlacklistedSubscribersByUserId($userId)->mapInto(SubscriberDTO::class)
        ]);
    }


}


