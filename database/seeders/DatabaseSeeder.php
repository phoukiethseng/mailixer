<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
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
        DB::table('users')->upsert([
            [
                'name' => '科森',
                'email' => 'puseng123@gmail.com',
                'password' => Hash::make('012858378'),
            ]
        ],
            ['email'],
            ['name', 'password']
        );

        DB::table('subscribe_pages')->upsert([
            'user_id' => DB::table('users')->select('id')->where('email', 'puseng123@gmail.com')->first()->id
        ],
        ['user_id'],
        []
    );
    }
}
