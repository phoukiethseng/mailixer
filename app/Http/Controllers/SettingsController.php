<?php

namespace App\Http\Controllers;

use App\DTOs\UserDTO;
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
        $userDTO = new UserDTO($user);
        return Inertia::render('Account/Settings', [
            'account' => [
                'profilePictureUrl' => $userDTO->profilePictureUrl,
                'profilePictureType' => $userDTO->profilePictureType,
                'displayName' => $userDTO->name,
                'email' => $userDTO->email,
            ],
        ]);
    }
}
