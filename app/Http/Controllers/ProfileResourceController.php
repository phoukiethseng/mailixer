<?php

namespace App\Http\Controllers;

use App\DTOs\ProfilePictureDTO;
use App\Repositories\Interfaces\UserRepository;

class ProfileResourceController extends Controller
{
    public function __construct(private UserRepository $userRepository)
    {

    }

    public function getProfilePicture($userId)
    {
        $user = $this->userRepository->findById($userId);
        $profilePictureDTO = new ProfilePictureDTO($user);
        if ($profilePictureDTO->base64Data) {
            return response([
                'base64Data' => $profilePictureDTO->base64Data
            ]);
        } else {
            return response(status: 404);
        }
    }
}
