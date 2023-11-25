<?php

namespace App\Http\Controllers;

use App\Services\Interfaces\SubscribePageService;
use App\Services\Interfaces\SubscriptionService;
use Exception;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class UnsubscribePageController extends Controller
{

    public function __construct(private SubscriptionService $subscriptionService, private SubscribePageService $subscribePageService) {

    }
    public function unsubscribePage($unsubscribeToken) {
        try {
            $author = $this->subscriptionService->getSubscriberAuthorByUnsubscribeToken($unsubscribeToken);
            $name = $author->name;
            $this->subscriptionService->unsusbscribeByToken($unsubscribeToken);
        return Inertia::render('Unsubscribe/Success',[
                'author.name' => $name,
        ]);
        } catch(Exception $e) {
            Log::debug('Unsubscribe Exception', [$e]);
            return Inertia::render('Unsubscribe/Error', [
                'message' => "Couldn't unsubscribe newsletter"
            ]);
        }
    }
}
