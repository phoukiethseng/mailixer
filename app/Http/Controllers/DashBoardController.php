<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateDescriptionRequest;
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
            'subscribers' => $subscribers
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
        return back();
    }

    public function index() {
        return redirect()->route('dashboard.page');
    }
}
