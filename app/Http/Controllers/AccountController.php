<?php

namespace App\Http\Controllers;

use App\Http\Requests\EditAccountFormRequest;
use App\Http\Requests\EditProfileFormRequest;
use App\Repositories\Interfaces\UserRepository;
use App\Services\Interfaces\AccountService;
use Illuminate\Http\Request;

class AccountController extends Controller
{

    public function __construct(private AccountService $accountService, private UserRepository $userRepository)
    {

    }
    public function editProfile(EditProfileFormRequest $request)
    {
        $data = $request->validated();
        $user = $this->userRepository->findById($request->user()->id);
        if ($data['isChangeProfilePicture']) {
            $this->accountService->setProfilePicture($user, $data['profilePicture'], $data['profilePictureType']);
        }
        $this->accountService->setDisplayName($user, $data['displayName']);
        return back()->with(
            $this->responseMessage('Successfully saved profile information')
        );
    }

    public function editAccount(EditAccountFormRequest $request)
    {
        $data = $request->validated();
        $user = $this->userRepository->findById($request->user()->id);
        $this->accountService->setEmail($user, $data['email']);
        $success = true;

        if ($data['newPassword'] != "") {
            $success = $this->accountService->setPassword($user, $data['newPassword'], $data['oldPassword']);
        }

        if ($success) {
            return back()->with(
                $this->responseMessage('Successfully Changed Email and Password')
            );
        } else {
            return back()->withErrors(
                $this->responseMessage('Failed to change Email and Password')
            );

        }
    }
}
