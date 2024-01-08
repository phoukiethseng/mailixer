<?php

namespace Database\Factories;

use App\Services\Interfaces\StringRandomGenerator;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\App;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subscriber>
 */
class SubscriberFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'unsubscribe_token' => App::make(StringRandomGenerator::class)->generateRandom(30),
        ];
    }
}
