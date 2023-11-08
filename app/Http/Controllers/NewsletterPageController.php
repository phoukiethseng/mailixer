<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsletterPageController extends Controller
{
    public function composeNewsletterPage() {
        return Inertia::render('DashBoard/Newsletter/ComposeNewsletter');
    }
}
