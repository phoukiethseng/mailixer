<?php

namespace App\Enums;

use BackedEnum;

interface CaseNameSearchableBackedEnum
{
    public static function getCase(string $caseName): BackedEnum;
}
