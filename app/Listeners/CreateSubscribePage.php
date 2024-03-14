<?php

namespace App\Listeners;

use App\Repositories\Interfaces\SubscribePageRepository;
use App\Repositories\Interfaces\UserRepository;use App\Services\Interfaces\SubscribePageService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CreateSubscribePage
{
    /**
     * Create the event listener.
     */
    public function __construct(private SubscribePageService $subscribePageService, private UserRepository $userRepository)
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(Registered $event): void
    {
        $user = $this->userRepository->findById($event->user->id);
        $this->subscribePageService->createNewSubscribePage($user);
    }
}
