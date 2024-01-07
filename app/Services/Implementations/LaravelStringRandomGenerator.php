<?php

namespace App\Services\Implementations;

use Illuminate\Support\Str;
use App\Services\Interfaces\StringRandomGenerator;

class LaravelStringRandomGenerator implements StringRandomGenerator {
    public function generateRandom($length): string {
        return Str::random($length);
    }
}
