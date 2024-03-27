<?php

namespace App\Http\Controllers;

use App\DTOs\SubscriberDTO;
use App\DTOs\SubscriptionRecordDTO;
use App\Repositories\Interfaces\UserRepository;
use App\Services\Interfaces\SubscriptionService;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Request;

class DashboardAnalyticsController extends Controller
{


    public function __construct(private SubscriptionService $subscriptionService, private UserRepository $userRepository)
    {
    }

    public function getSubscriptionRecords($from, $to)
    {

        $user = $this->userRepository->findById(Request::user()->id);

        $fromCarbon = Carbon::parse($from);
        $toCarbon = Carbon::parse($to);

        $subscriptionRecords = $this->subscriptionService->getSubscriptionRecordsForUser($user->id, $fromCarbon->toDateTime(), $toCarbon->toDateTime());

        return response(content: $this->responseMessageWithData("Success", [
            'subscriptionRecords' => $subscriptionRecords->mapInto(SubscriptionRecordDTO::class)->values()
        ]), status: 200);

    }
}
