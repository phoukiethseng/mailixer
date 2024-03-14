<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckEmailRequest;
use App\Http\Requests\CreateNewAccountRequest;
use App\Services\Interfaces\AccountService;
use App\Services\Interfaces\SubscribePageService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthActionController extends Controller
{

    public function __construct(private AccountService $accountService, private SubscribePageService $subscribePageService)
    {

    }

    public function login(Request $request) {
        $validatedData = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::attempt($validatedData)) {
            return to_route('home');
        } else {
            return back()->withErrors(['message' => 'Email or Password is incorrect']);
        }
    }

    public function logout(Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return to_route('home');
    }

    public function checkEmail(CheckEmailRequest $request) {
        $data = $request->validated();
        $emailNotExisted = $this->accountService->checkExistingUserByEmail($data['email']);
        if ($emailNotExisted) {
            return response([
                'status' => 'ok'
            ], 200);
        } else {
            return response([
                'status' => 'failed',
                'message' => 'Email already existed'
            ], 403);
        }
    }

    public function createNewAccount(CreateNewAccountRequest $request) {
        $data = $request->validated();
        $newUser = $this->accountService->registerNewUser($data['name'], $data['email'], $data['password']);

        if ($data['profilePicture'] && $data['profilePicture'] != "") {
            $this->accountService->setProfilePicture($newUser, $data['profilePicture'], $data['profilePictureType']);
        }

        Auth::login($newUser);

        return to_route('dashboard.customization');
    }
}
