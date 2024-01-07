<?php

namespace App\Providers;

use App\Services\Interfaces\SubscribePageService;
use App\Services\Interfaces\SubscriptionService;
use App\Services\Implementations\LaravelStringRandomGenerator;
use App\Services\Interfaces\StringRandomGenerator;
use Illuminate\Support\ServiceProvider;
use App\Services\Implementations\SubscriptionServiceImpl;
use App\Services\Implementations\SubscribePageServiceImpl;
use App\Services\Interfaces\NewsletterService;
use App\Services\Implementations\NewsletterServiceImpl;

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
        $this->app->bind(StringRandomGenerator::class, LaravelStringRandomGenerator::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
