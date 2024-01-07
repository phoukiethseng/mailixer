<?php

namespace App\Console;

use App\Mail\SendNewsletter;
use App\Models\Newsletter;
use App\Models\User;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Services\Interfaces\StringRandomGenerator;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // $schedule->command('inspire')->hourly();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');

        $this->command('email:test', function () {
            $stringRandomGenerator = App::make(StringRandomGenerator::class);
            $newsletter = Newsletter::firstOrNew([
                'subject' => 'Test Newsletter',
                'content_type_id' => 1,
                'content' => '<h1>This is test newsletter</h1>',
                'user_id' => User::first()->id,
            ]);
            $publisher = $newsletter->user;
            $subscriber = $publisher->subscribers()->firstOrNew([
                'email' => 'seng@example.com',
                'unsubscribe_token' => $stringRandomGenerator->generateRandom(30),
                'user_id' => $publisher->id
            ]);

            $email = new SendNewsletter($newsletter, $publisher, $subscriber);

            Mail::to($subscriber->email)
                ->send($email);

            echo 'Success please check log';
        });
    }
}
