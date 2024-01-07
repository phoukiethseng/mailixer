<?php

namespace App\Services\Implementations;

use App\Repositories\Interfaces\SubscribePageRepository;
use App\Repositories\Interfaces\UserRepository;
use App\Services\Interfaces\SubscribePageService;

class SubscribePageServiceImpl implements SubscribePageService
{
    public function __construct(private UserRepository $userRepository, private SubscribePageRepository $subscribePageRepository)
    {

    }
    public function getDescriptionByToken($token)
    {
        $subscribePage = $this->subscribePageRepository->findByToken($token);

        return $subscribePage->description;
    }

    public function updateDescriptionByToken($token, $newDescription)
    {
        $subscribePage = $this->subscribePageRepository->findByToken($token);
        $subscribePage->description = $newDescription;
        $subscribePage->save();
    }
    public function getAuthorIdByToken($token) {
        $subscribePage = $this->subscribePageRepository->findByToken($token);
        $user = $subscribePage->user;
        return $user->id;
    }
    public function getSubscribePageTokenByAuthorId($authorId) {
        $user = $this->userRepository->findById($authorId);
        $subscribePage = $user->subscribePage;
        return $subscribePage->token;
    }
}
