<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashBoardController extends Controller
{
    public function page() {
        return Inertia::render('DashBoard/Page');
    }

    public function index() {
        return redirect()->route('dashboard.page');
    }
}
