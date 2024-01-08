<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Newsletter;
use App\Models\NewsletterContentType;
use App\Models\NewsletterStatus;
use App\Models\SubscribePage;
use App\Models\User;
use App\Services\Interfaces\StringRandomGenerator;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function __construct(private StringRandomGenerator $stringRandomGenerator)
    {
    }
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        $defaultUser = User::factory()->createOne([
            'name' => '科森',
            'email' => 'puseng123@gmail.com',
            'password' => Hash::make('012858378'),
        ]);

        $subscribePage = SubscribePage::factory()->makeOne([
            'description' => 'Subscribe to recieve latest about tech related news',
        ]);

        $defaultUser->subscribePage()->save($subscribePage);
        $subscribePage->save();

        $htmlContentType = NewsletterContentType::factory()->createOne([
            'name' => 'html',
            'id' => 1,
        ]);
        $markDownContentType = NewsletterContentType::factory()->createOne([
            'name' => 'markdown',
            'id' => 2,
        ]);
        $plainTextContentType = NewsletterContentType::factory()->createOne([
            'name' => 'plaintext',
            'id' => 3,
        ]);

        $draftNewsletterStatus = NewsletterStatus::factory()->createOne([
            'id' => 1,
            'name' => 'DRAFT'
        ]);
        $sentNewsletterStatus = NewsletterStatus::factory()->createOne([
            'id' => 2,
            'name' => 'SENT'
        ]);

        $defaultNewsletter = Newsletter::factory()->makeOne([
            'subject' => 'Mailixer Sample Newsletter Subject',
            'content' => '<h1>This is heading 1</h1>',
        ]);
        $defaultNewsletter->contentType()->associate($htmlContentType);
        $defaultUser->newsletters()->save($defaultNewsletter);
        $defaultNewsletter->status()->associate($draftNewsletterStatus);
        $defaultNewsletter->save();
    }
}
