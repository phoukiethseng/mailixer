<?php

namespace App\Services\Implementations;

use App\Repositories\Interfaces\UserRepository;
use App\Services\Interfaces\SubscribePageService;

class SubscribePageServiceImpl implements SubscribePageService
{
    public function __construct(private UserRepository $userRepository)
    {

    }
    public function getDescription($userId)
    {
        return $this->userRepository->findById($userId)->subscribePage->description;
    }

    public function updateDescription($userId, $newDescription)
    {
        $subscribePage = $this->userRepository->findById($userId)->subscribePage;
        $subscribePage->description = $newDescription;
        $subscribePage->save();
    }
}