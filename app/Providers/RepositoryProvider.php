<?php

namespace App\Providers;

use App\Repositories\Implementations\UserRepositoryImpl;
use App\Repositories\Interfaces\SubscriberRepository;
use App\Repositories\Implementations\SubscriberRepositoryImpl;
use App\Repositories\Interfaces\UserRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(SubscriberRepository::class, SubscriberRepositoryImpl::class);
        $this->app->bind(UserRepository::class, UserRepositoryImpl::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
