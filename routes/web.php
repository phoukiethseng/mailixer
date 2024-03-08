<?php

use App\Http\Controllers\AuthActionController;
use App\Http\Controllers\AuthPageController;
use App\Http\Controllers\DashboardPageController;
use App\Http\Controllers\DashboardActionController;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\NewsletterActionController;
use App\Http\Controllers\NewsletterPageController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\SubscribePageController;
use App\Http\Controllers\SubscribeActionController;
use App\Http\Controllers\UnsubscribePageController;
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

    Route::get('/', [HomePageController::class, 'homePage'])->name('home');

    Route::get('/login', [AuthPageController::class, 'loginPage'])->name('login');
    Route::get('/logout', [AuthPageController::class, 'logoutPage'])->name('logout');

    Route::post('/login', [AuthActionController::class, 'login']);
    Route::post('/logout', [AuthActionController::class, 'logout']);
});

Route::prefix('subscribe_page')->group(function () {

    Route::get('/{token}', [SubscribePageController::class, 'subscribePage'])->name("subscribe.index");
    Route::get('/{token}/success', [SubscribePageController::class, 'successPage'])->name('subscribe.success');

    Route::post('/', [SubscribeActionController::class, 'subscribe']);

});

Route::prefix('/unsubscribe')->group(function () {
    Route::middleware('signed')->get('/{unsubscribeToken}', [UnsubscribePageController::class, 'unsubscribePage'])->name('unsubscribe');
});


Route::middleware('auth')->prefix('dashboard')->group(function () {
    // Dashboard pages
    Route::get('/', [DashboardPageController::class, 'indexPage'])->name('dashboard.index');
    Route::get('/customize_page', [DashboardPageController::class, 'customizationPage'])->name('dashboard.customization');
    Route::get('/all_subscribers_page', [DashboardPageController::class, 'allSubscribersPage'])->name('dashboard.subscribers');
    Route::get('/compose_newsletter_page', [NewsletterPageController::class, 'composeNewsletterPage'])->name('dashboard.composeNewsletter');
    Route::get('/draft_newsletter_page', [NewsletterPageController::class, 'draftNewsletterPage'])->name('dashboard.draftNewsletter');
    Route::get('/blacklisted_subscribers', [DashboardPageController::class, 'blacklistedSubscribersPage']);
    Route::get('/newsletter_status_page', [NewsletterPageController::class, 'newsletterStatusPage']);

    // Dashboard actions
    Route::post('/subscribePage', [DashboardActionController::class, 'editSubscribePage']);
    Route::delete('/subscriber/{subscriberId}', [DashboardActionController::class, 'unsubscribe']);
    Route::get('/unsubscribe_url/{subscriberId}', [DashboardActionController::class, 'getUnsubscribeUrl']);
    Route::post('/sendNewsletter', [NewsletterActionController::class, 'sendNewsletter']);
    Route::put('/sendDraftNewsletter', [NewsletterActionController::class, 'sendDraftNewsletter']);
    Route::post('/saveNewsletter', [NewsletterActionController::class, 'saveNewsletter']);
    Route::delete('/deleteNewsletter', [NewsletterActionController::class, 'deleteNewsletter']);
    Route::put('/updateNewsletter', [NewsletterActionController::class, 'updateNewsletter']);
    Route::put('/blacklistSubscriber', [SubscribeActionController::class, 'blacklistSubscriber']);
    Route::put('/whitelistSubscriber', [SubscribeActionController::class, 'whitelistSubscriber']);
});

Route::middleware('auth')->prefix('user')->group(function () {
    Route::get('settings', [SettingsController::class, 'AccountSettingsPage']);
    Route::post('profile', [AccountController::class, 'editProfile']);
    Route::post('account', [AccountController::class, 'editAccount']);
});

Route::middleware('userTo:dashboard.index')->group(function () {
    Route::get('/register', [AuthPageController::class, 'registerPage']);
    Route::post('/checkEmail', [AuthActionController::class, 'checkEmail']);
    Route::post('/register', [AuthActionController::class, 'createNewAccount']);
});

