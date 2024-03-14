<?php

namespace App\Exceptions;

use Exception;

class ServiceException extends Exception
{
    public function __construct($message)
    {
        parent::__construct($message);
    }
}
