<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomePageController extends Controller
{
    public function homePage(Request $request) {
        if ($request->user()) {
            return to_route('dashboard.index');
        }
        return Inertia::render('Home');
    }
}
