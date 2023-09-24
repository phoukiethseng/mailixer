<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FrontendController extends Controller
{
    public function homePage(Request $request) {
        if ($request->user()) {
            return to_route('dashboard.index');
        }
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
