<?php

namespace App\Http\Controllers;

use App\Http\Requests\BatchBlackListRequest;
use App\Http\Requests\BatchUnsubscribeRequest;
use App\Http\Requests\BlacklistSubscriberRequest;
use App\Http\Requests\EditSubscribePageRequest;
use App\Http\Requests\WhitelistSubscriberRequest;
use App\Repositories\Interfaces\UserRepository;
use App\Services\Interfaces\SubscribePageService;
use App\Services\Interfaces\SubscriptionService;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;

class DashboardActionController extends Controller
{

    public function __construct(private SubscribePageService $subscribePageService, private SubscriptionService $subscriptionService, private UserRepository $userRepository)
    {

    }
    public function editSubscribePage(EditSubscribePageRequest $request)
    {
        $data = $request->validated();
        $user = $this->userRepository->findById($request->user()->id);
        $subscribePageToken = $user->subscribePage->token;

        try {
            $this->subscribePageService->updateDescriptionByToken($subscribePageToken, $data['description']);
            $this->subscribePageService->setShowProfilePicture($subscribePageToken, $data['showProfilePicture']);
        } catch (Exception) {
            return back()->withErrors(
                $this->responseMessage("Couldn't update subscribe page description")
            );
        }
        return back()->with(
            $this->responseMessage('Successfully updated page description')
        );
    }

    public function unsubscribe($subscriberId)
    {
        try {
            $this->subscriptionService->unsubscribeById($subscriberId);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return back()->withErrors(
                $this->responseMessage("Couldn't unsubscribe {$this->subscriptionService->getSubscriberById($subscriberId)}")
            );
        }
        return back()->with(
            $this->responseMessage('Successfully unsubscribed')
        );
    }

    public function batchUnsubscribe(BatchUnsubscribeRequest $request)
    {
        $data = $request->validated();
        $list = $data['subscriberIdList'];
        $listLength = sizeof($list);
        if ( $listLength > 0) {
            $collection = collect($list);
            foreach ($collection as $entry) {
                $this->subscriptionService->unsubscribeById($entry['id']);
            }
            return back()->with(
                $this->responseMessage("Successfully unsubscribed" . $listLength . "subscribers")
            );
        } else {
            return back()->withErrors(
                $this->responseMessage('List is empty')
            );
        }
    }

    public function batchBlacklist(BatchBlackListRequest $request)
    {
        $data = $request->validated();
        $subscriberIdList = $data['subscriberIdList'];
        $listLength = sizeof($subscriberIdList);
        if ( $listLength > 0 ) {
            $collection = collect($subscriberIdList);
            foreach ($collection as $entry) {
                $this->subscriptionService->blacklistById($entry['id']);
            }
            return back()->with(
                $this->responseMessage("Successfully blacklisted" . $listLength . "subscribers")
            );
        } else {
            return back()->withErrors(
                $this->responseMessage('List is empty')
            );
        }
    }

    public function getUnsubscribeUrl($subscriberId)
    {
        try {
            $token = $this->subscriptionService->getUnsubscribeTokenById($subscriberId);
            $url = URL::signedRoute('unsubscribe', ['unsubscribeToken' => $token]);
            return response()->json([
                'url' => $url
            ]);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response(status: 500)->json(
                $this->responseMessage('Error while generating unsubscribe url')
            );
        }

    }

    public function blacklistSubscriber(BlacklistSubscriberRequest $request)
    {
        $data = $request->validated();
        try {
            $this->subscriptionService->blacklistById($data['id']);
            return back()->with([
                'message' => 'Blacklisted'
            ]);
        } catch (Exception $e) {
            Log::debug('', [$e]);
            return back()->withErrors(
                $this->responseMessage($e->getMessage())
            );
        }
    }

    public function whitelistSubscriber(WhitelistSubscriberRequest $request)
    {
        $data = $request->validated();
        try {
            $this->subscriptionService->whitelistById($data['id']);
            return back()->with(
                $this->responseMessage('Successfully whitelisted subscriber')
            );
        } catch(Exception $e) {
            return back()->with(
                $this->responseMessage('Successfully whitelisted subscriber')
            );
        }
    }
}
