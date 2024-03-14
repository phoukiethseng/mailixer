<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {

        });
    }

    public function render($request, Throwable $e)
    {
        if ($e instanceof NotFoundHttpException) {

            $response = parent::render($request, $e);

            return Inertia::render('NotFoundError', [
                'error.message' => App::isLocal() ? $e->getMessage() : null,
                'error.statusCode' => $response->getStatusCode()
            ])->toResponse($request)->setStatusCode($response->status());
        }
        return parent::render($request, $e);
    }


}
