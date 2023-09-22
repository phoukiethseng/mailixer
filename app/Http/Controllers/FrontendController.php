<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FrontendController extends Controller
{
    public function subscribePage($userId) {

        // Get user's name for requested page
        $user = User::select('name', 'id')->where('id', $userId)->take(1)->first();

        if (!$user) {
            return Inertia::render('Error', [
                'message' => "Couldn't find corresponding page"
            ]);
        }

        return Inertia::render('Subscribe/Index', [
            'user' => $user
        ]);
    }
    public function homePage() {
        return Inertia::render('Home');
    }
    public function loginPage() {
        if(Auth::user()) {
            return to_route('home');
        }
        return Inertia::render('Login');
    }

    public function logoutPage() {
        if(!Auth::user()) {
            return to_route('home');
        }
        return Inertia::render('Logout');
    }
}
