<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashBoardController;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\SubscribeController;
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

Route::get('/', [FrontendController::class, 'homePage'])->name('home');

Route::get('/login', [FrontendController::class, 'loginPage'])->name('login');

Route::post('/login', [AuthController::class, 'login']);

Route::get('/logout', [FrontendController::class, 'logoutPage']);

Route::post('/logout', [AuthController::class, 'logout']);

Route::prefix('subscribe')->group(function () {

    Route::get('/{userId}', [SubscribeController::class, 'subscribePage'])->name("subscribe.index");

    Route::get('/{userId}/success', [SubscribeController::class, 'successPage'])->name('subscribe.success');

    Route::post('/', [SubscribeController::class, 'subscribe']);

});


Route::middleware('auth')->prefix('dashboard')->group(function () {
    Route::get('/', [DashBoardController::class, 'index']);
    Route::get('/page', [DashBoardController::class, 'page'])->name('dashboard.page');
});