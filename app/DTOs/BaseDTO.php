<?php

namespace App\DTOs;

use ReflectionClass;

class BaseDTO
{
    public function toKeyValueArray(): array
    {
        $arrayResult = [];
        $reflection = new ReflectionClass(get_class($this));
        $publicProperties = $reflection->getProperties(\ReflectionProperty::IS_PUBLIC);
        foreach ($publicProperties as $publicProperty) {
            $arrayResult[$publicProperty->getName()] = $publicProperty->getValue();
        }
        return $arrayResult;
    }
}
