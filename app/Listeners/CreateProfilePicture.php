<?php

namespace App\Listeners;

use App\Repositories\Interfaces\UserRepository;
use App\Services\Interfaces\AccountService;
use Illuminate\Auth\Events\Registered;

class CreateProfilePicture
{
    /**
     * Create the event listener.
     */
    public function __construct(private AccountService $accountService, private UserRepository $userRepository)
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(Registered $event): void
    {
        $user = $this->userRepository->findById($event->user->id);

        // Create empty profile picture if not existed
        if (is_null($user->profilePicture)) {
            $this->accountService->setProfilePicture($user, "", "image/png");
        }
    }
}
