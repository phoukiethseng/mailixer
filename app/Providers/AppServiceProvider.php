<?php

namespace App\Providers;

use App\Services\SubscribePageService;
use App\Services\SubscriptionService;
use Illuminate\Support\ServiceProvider;
use App\Services\SubscriptionServiceImpl;
use App\Services\SubscribePageServiceImpl;
use App\Services\NewsletterService;
use App\Services\NewsletterServiceImpl;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(SubscriptionService::class, SubscriptionServiceImpl::class);
        $this->app->bind(SubscribePageService::class, SubscribePageServiceImpl::class);
        $this->app->bind(NewsletterService::class, NewsletterServiceImpl::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
