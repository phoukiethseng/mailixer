<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsletterPageController extends Controller
{
    public function newsletterPage() {
        return Inertia::render('DashBoard/Newsletter');
    }
}
