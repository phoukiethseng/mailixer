<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Services\Interfaces\StringRandomGenerator;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
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
        DB::table('users')->upsert(
            [
                [
                    'name' => '科森',
                    'email' => 'puseng123@gmail.com',
                    'password' => Hash::make('012858378'),
                ]
            ],
            ['email'],
            ['name', 'password']
        );

        $stringRandomGenerator = App::make(StringRandomGenerator::class);
        DB::table('subscribe_pages')->upsert(
            [
                'user_id' => DB::table('users')->select('id')->where('email', 'puseng123@gmail.com')->first()->id,
                'token' => $stringRandomGenerator->generateRandom(30),
            ],
            ['user_id'],
            ['user_id']
        );

        DB::table('newsletter_content_type')->upsert(
            [
                ['name' => 'html', 'id' => 1],
                ['name' => 'markdown', 'id' => 2],
                ['name' => 'plaintext', 'id' => 3]

            ],
            ['id'],
            ['name', 'id']
        );
        DB::table('newsletters')->upsert(
            [
                [
                    'user_id' => 1,
                    'subject' => 'Test Newsletter',
                    'content' => '<h1>This is header 1</h1>',
                    'content_type_id' => 1,
                ]

            ],
            ['id'],
            ['subject', 'content', 'content_type_id']
        );
        DB::table('newsletter_status')->upsert(
            [
                [
                    'id' => 1,
                    'name' => 'DRAFT'
                ],
                [
                    'id' => 2,
                    'name' => 'SENT'
                ]
            ],
            ['id'],
            ['name']
        );
    }
}
