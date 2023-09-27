<?php

namespace App\Http\Controllers;

use App\Models\Subscriber;
use App\Models\User;
use App\Services\SubscribePageService;
use App\Services\SubscriptionService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UnsubscribePageController extends Controller
{
    
    public function __construct(private SubscriptionService $subscriptionService, private SubscribePageService $subscribePageService) {

    }
    public function unsubscribePage($unsubscribeToken) {
        $name = Subscriber::where('unsubscribe_token', $unsubscribeToken)->first()->user()->name ?? '';
        try {
            $this->subscriptionService->unsusbscribeByToken($unsubscribeToken);
        } catch(Exception $e) {
            return Inertia::render('Unsubscribe/Error', [
                'message' => $e->getMessage()
            ]);
        }

        return Inertia::render('Unsubscribe/Success',[
                'auth.user.name' => $name,
        ]);
        
    }
}
