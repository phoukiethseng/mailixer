<?php

namespace App\Providers;

use App\Services\SubscriptionService;
use Illuminate\Support\ServiceProvider;
use App\Services\SubscriptionServiceImpl;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(SubscriptionService::class, SubscriptionServiceImpl::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
