<?php

use App\Http\Controllers\AuthActionController;
use App\Http\Controllers\AuthPageController;
use App\Http\Controllers\DashboardPageController;
use App\Http\Controllers\DashboardActionController;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\SubscribePageController;
use App\Http\Controllers\SubscribeActionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::prefix('/')->group(function () {

    Route::get('/', [HomePageController::class, 'homePage']);

    Route::get('/login', [AuthPageController::class, 'loginPage']);
    Route::get('/logout', [AuthPageController::class, 'logoutPage']);

    Route::post('/login', [AuthActionController::class, 'login']);
    Route::post('/logout', [AuthActionController::class, 'logout']);
});

Route::prefix('subscribe_page')->group(function () {

    Route::get('/{userId}', [SubscribePageController::class, 'subscribePage'])->name("subscribe.index");
    Route::get('/{userId}/success', [SubscribePageController::class, 'successPage'])->name('subscribe.success');

    Route::post('/', [SubscribeActionController::class, 'subscribe']);

});


Route::middleware('auth')->prefix('dashboard')->group(function () {
    // Dashboard pages
    Route::get('/', [DashboardPageController::class, 'indexPage'])->name('dashboard.index');
    Route::get('/customization_page', [DashboardPageController::class, 'customizationPage'])->name('dashboard.customization');
    Route::get('/subscribers_page', [DashboardPageController::class, 'subscribersPage'])->name('dashboard.subscribers');

    // Dashboard actions
    Route::post('/page/description', [DashboardActionController::class, 'updatePageDescription']);
    Route::delete('/subscriber/{subscriberId}', [DashboardActionController::class, 'unsubscribe']);
});