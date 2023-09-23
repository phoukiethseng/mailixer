<?php

use App\Http\Controllers\AuthController;
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

Route::get('/', [FrontendController::class, 'homePage'])->name('home')->middleware('auth');

Route::get('/login', [FrontendController::class, 'loginPage'])->name('login');

Route::post('/login', [AuthController::class, 'login']);

Route::get('/logout', [FrontendController::class, 'logoutPage']);

Route::post('/logout', [AuthController::class, 'logout']);

Route::get('/subscribe/{userId}', [SubscribeController::class, 'subscribePage'])->name("subscribe.index");

Route::get('/subscribe/{userId}/success', [SubscribeController::class, 'successPage'])->name('subscribe.success');