<?php

namespace App\Http\Controllers;

use App\Models\Subscriber;
use App\Services\SubscribePageService;
use App\Services\SubscriptionService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardPageController extends Controller
{

    public function __construct(private SubscribePageService $subscribePageService, private SubscriptionService $subscriptionService) {

    }
    public function subscribersPage(Request $request) {
        $user = $request->user();
        try {
            $subscribers = $this->subscriptionService->getAllSubscribers($user->id);
            $count = $this->subscriptionService->getSubscribersCount($user->id);
            return Inertia::render('DashBoard/Subscribers', [
                'subscribers' => collect($subscribers)->mapInto(SubscriberDTO::class),
                'subscribersCount' => $count
            ]);
        } catch (Exception) {
            return back()->withErrors([
                'message' => "Couldn't retrieve subscribers list" 
            ]);
        }
    }
    public function customizationPage(Request $request) {
        $user = $request->user();
        try {
            $description = $this->subscribePageService->getDescription($user->id);
            $pageUrl = $this->subscribePageService->getPageUrl($user->id);
        } catch(Exception) {
            return back()->withErrors([
                'message' => "Couldn't retreive page description or preview url"
            ]);
        }
        return Inertia::render('DashBoard/Customization', [
            'description' => $description ? $description : '',
            'preview.liveUrl' => $pageUrl
        ]);
    }


    public function indexPage() {
        return redirect()->route('dashboard.customization');
    }
}


// Used for mapping backend data to frontend data
class SubscriberDTO {
    public $id;
    public $email;
    public $unsubscribe_token;
    public $createdAt;
    public function __construct(Subscriber $subscriber) {
        $this->id = $subscriber->id;
        $this->email = $subscriber->email;
        $this->createdAt = $subscriber->created_at;
        $this->unsubscribe_token = $subscriber->unsubscribe_token;
    }
}