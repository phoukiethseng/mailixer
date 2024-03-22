<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Support\Facades\Log;

class ServiceException extends Exception
{
    public function __construct($message, Exception | \ErrorException $exception = null)
    {
        // Log original exception
        if ($exception) {
            Log::error($exception->getMessage(), ['stackTrace' => $exception->getTraceAsString()]);
        }
        parent::__construct($message);
    }
}
