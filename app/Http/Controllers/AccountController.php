<?php

namespace App\Http\Controllers;

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
        return back()->with([
            'message' => 'Successfully saved profile information'
        ]);
    }
}
