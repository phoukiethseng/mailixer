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
                'profilePicture' => $user->profilePicture->base64_data,
                'profilePictureType' => $user->profilePicture->mime_type,
                'displayName' => $user->name,
                'email' => $user->email,
            ],
        ]);
    }
}
