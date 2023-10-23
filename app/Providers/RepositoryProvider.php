<?php

namespace App\Providers;

use App\Repositories\Implementations\EloquentNewsletterRepository;
use App\Repositories\Implementations\EloquentUserRepository;
use App\Repositories\Interfaces\NewsletterRepository;
use App\Repositories\Interfaces\SubscriberRepository;
use App\Repositories\Implementations\EloquentSubscriberRepository;
use App\Repositories\Interfaces\UserRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(SubscriberRepository::class, EloquentSubscriberRepository::class);
        $this->app->bind(UserRepository::class, EloquentUserRepository::class);
        $this->app->bind(NewsletterRepository::class, EloquentNewsletterRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
