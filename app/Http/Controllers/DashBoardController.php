<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateDescriptionRequest;
use App\Models\Subscriber;
use App\Services\SubscribePageService;
use App\Services\SubscriptionService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashBoardController extends Controller
{

    public function __construct(private SubscribePageService $subscribePageService, private SubscriptionService $subscriptionService) {

    }
    public function subscribersPage(Request $request) {
        $user = $request->user();
        try {
            $subscribers = $this->subscriptionService->getAllSubscribers($user->id);
        } catch (Exception) {
            return back()->withErrors([
                'message' => "Couldn't retrieve subscribers list" 
            ]);
        }
        return Inertia::render('DashBoard/Subscribers', [
            'subscribers' => collect($subscribers)->mapInto(SubscriberDTO::class)
        ]);
    }
    public function page(Request $request) {
        $user = $request->user();
        try {
            $description = $this->subscribePageService->getDescription($user->id);
            $pageUrl = $this->subscribePageService->getPageUrl($user->id);
        } catch(Exception) {
            return back()->withErrors([
                'message' => "Couldn't retreive page description or preview url"
            ]);
        }
        return Inertia::render('DashBoard/Page', [
            'description' => $description ? $description : '',
            'preview.liveUrl' => $pageUrl
        ]);
    }

    public function updatePageDescription(UpdateDescriptionRequest $request) {
        $data = $request->validated();
        $user = $request->user();
        try {
            $this->subscribePageService->updateDescription($user->id, $data['description']);
        } catch(Exception) {
            return back()->withErrors([
                'message' => "Couldn't update subscribe page description"
            ]);
        }
        return back()->with([
            'message' => 'Successfully updated page description'
        ]);
    }

    public function unsubscribe($subscriberId) {
        try {
            $this->subscriptionService->unsubscribe($subscriberId);
        } catch(Exception) {
            return back()->withErrors([
                'message' => "Couldn't unsubscribe {$this->subscriptionService->getSubscriber($subscriberId)}"
            ]);
        }
        return back();
    }

    public function index() {
        return redirect()->route('dashboard.page');
    }
}


// Used for mapping backend data to frontend data
class SubscriberDTO {
    public $id;
    public $email;
    public $createdAt;
    public function __construct(Subscriber $subscriber) {
        $this->id = $subscriber->id;
        $this->email = $subscriber->email;
        $this->createdAt = $subscriber->created_at;
    }
}