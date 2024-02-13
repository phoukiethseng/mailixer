<?php

namespace App\Http\Controllers;

use App\Repositories\Interfaces\UserRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{

    public function __construct(private UserRepository $userRepository)
    {

    }

    public function AccountSettingsPage(Request $request)
    {
        $user = $this->userRepository->findById($request->user()->id);
        return Inertia::render('Account/Settings', [
            'account' => [
                'displayName' => $user->name,
                'email' => $user->email,
            ],
        ]);
    }
}
