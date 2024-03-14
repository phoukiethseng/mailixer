<?php

namespace App\Services\Implementations;

use App\Exceptions\ServiceException;
use App\Models\SubscribePage;
use App\Models\User;
use App\Repositories\Interfaces\SubscribePageRepository;
use App\Repositories\Interfaces\UserRepository;
use App\Services\Interfaces\StringRandomGenerator;
use App\Services\Interfaces\SubscribePageService;
use Illuminate\Support\Facades\Log;

class SubscribePageServiceImpl implements SubscribePageService
{
    public function __construct(private UserRepository $userRepository, private SubscribePageRepository $subscribePageRepository, private StringRandomGenerator $stringRandomGenerator)
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

    public function getShowProfilePicture($token)
    {
        $subscribePage = $this->getSubscribePage($token);
        return $subscribePage->show_profile_picture;
    }

    public function setShowProfilePicture($token, $value)
    {
        $subscribePage = $this->getSubscribePage($token);
        $subscribePage->show_profile_picture = $value;
        $subscribePage->save();
    }

    private function getSubscribePage($token): mixed
    {
        $authorId = $this->getAuthorIdByToken($token);
        $user = $this->userRepository->findById($authorId);
        $subscribePage = $user->subscribePage;
        return $subscribePage;
    }

    public function createNewSubscribePage(User $user): SubscribePage
    {
        $newSubscribePage = $this->subscribePageRepository->getNewInstance([
            'token' => $this->stringRandomGenerator->generateRandom(20)
        ]);
        $user->subscribePage()->save($newSubscribePage);
        $this->subscribePageRepository->save($newSubscribePage);

        return $newSubscribePage;

    }
}
