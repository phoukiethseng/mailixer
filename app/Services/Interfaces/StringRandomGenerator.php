<?php

namespace App\Services\Interfaces;

interface StringRandomGenerator extends RandomGenerator
{
    public function generateRandom($length): string;
}
