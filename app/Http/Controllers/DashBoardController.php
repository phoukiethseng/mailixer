<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateDescriptionRequest;
use App\Models\SubscribePage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashBoardController extends Controller
{
    public function page(Request $request) {
        $user = $request->user();
        $description = SubscribePage::select('description')->where('user_id', $user->id)->first()->description;
        return Inertia::render('DashBoard/Page', [
            'description' => $description ? $description : ''
        ]);
    }

    public function updatePageDescription(UpdateDescriptionRequest $request) {
        $data = $request->validated();
        $subscribePage = SubscribePage::where('user_id', $data['user_id'])->first();
        $subscribePage->description = $data['description'];
        $subscribePage->save();
        return back();
    }

    public function index() {
        return redirect()->route('dashboard.page');
    }
}
