<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\AuthActionController;
use App\Http\Controllers\AuthPageController;
use App\Http\Controllers\DashboardActionController;
use App\Http\Controllers\DashboardAnalyticsController;
use App\Http\Controllers\DashboardPageController;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\NewsletterActionController;
use App\Http\Controllers\NewsletterPageController;
use App\Http\Controllers\ProfileResourceController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\SubscribePageController;
use App\Http\Controllers\SubscriptionActionController;
use App\Http\Controllers\UnsubscribePageController;
use App\Http\Requests\MailixerEmailVerificationRequest;
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

    Route::post('/', [SubscriptionActionController::class, 'subscribe']);

});

Route::prefix('/unsubscribe')->group(function () {
    Route::middleware('signed')->get('/{unsubscribeToken}', [UnsubscribePageController::class, 'unsubscribePage'])->name('unsubscribe');

    // List-Unsubscribe One Click POST request from gmail
    Route::middleware('signed')->post('/{unsubscribeToken}', [SubscriptionActionController::class, 'listUnsubscribeOneClick'])->name('unsubscribe.oneClick');


});


Route::middleware('auth')->prefix('dashboard')->group(function () {
    // Dashboard pages
    Route::get('/', [DashboardPageController::class, 'indexPage'])->name('dashboard.index');
    Route::get('/customize_page', [DashboardPageController::class, 'customizationPage'])->name('dashboard.customization');
    Route::get('/whitelisted_subscribers', [DashboardPageController::class, 'whitelistedSubscribersPage'])->name('dashboard.subscribers');
    Route::get('/compose_newsletter_page', [NewsletterPageController::class, 'composeNewsletterPage'])->name('dashboard.composeNewsletter');
    Route::get('/draft_newsletter_page', [NewsletterPageController::class, 'draftNewsletterPage'])->name('dashboard.draftNewsletter');
    Route::get('/blacklisted_subscribers', [DashboardPageController::class, 'blacklistedSubscribersPage']);
    Route::get('/newsletter_status_page', [NewsletterPageController::class, 'newsletterStatusPage']);
    Route::get('/subscriber_overview_page', [DashboardPageController::class, 'subscriberOverviewPage']);

    // Dashboard actions
    Route::post('/subscribePage', [DashboardActionController::class, 'editSubscribePage']);
    Route::delete('/subscriber/{subscriberId}', [DashboardActionController::class, 'unsubscribe']);
    Route::get('/unsubscribe_url/{subscriberId}', [DashboardActionController::class, 'getUnsubscribeUrl']);
    Route::post('/sendNewsletter', [NewsletterActionController::class, 'sendNewsletter']);
    Route::put('/sendDraftNewsletter', [NewsletterActionController::class, 'sendDraftNewsletter']);
    Route::post('/saveNewsletter', [NewsletterActionController::class, 'saveNewsletter']);
    Route::delete('/deleteNewsletter', [NewsletterActionController::class, 'deleteNewsletter']);
    Route::put('/updateNewsletter', [NewsletterActionController::class, 'updateNewsletter']);
    Route::put('/blacklistSubscriber', [DashboardActionController::class, 'blacklistSubscriber']);
    Route::put('/whitelistSubscriber', [DashboardActionController::class, 'whitelistSubscriber']);
    Route::get('/previewNewsletter/{newsletterId}', [NewsletterPageController::class, 'previewNewsletter']);
    Route::delete('/batchUnsubscribe', [DashboardActionController::class, 'batchUnsubscribe'])->name('dashboard.batch.unsubscribe');
    Route::post('/batchBlacklist', [DashboardActionController::class, 'batchBlacklist'])->name('dashboard.batch.blacklist');
    Route::get('/getSubscriptionRecords/{from}/{to}', [DashboardAnalyticsController::class, 'getSubscriptionRecords'])->name('dashboard.subscription.records');
});

Route::middleware('auth')->prefix('user')->group(function () {
    Route::get('settings', [SettingsController::class, 'AccountSettingsPage'])->name("setting.account");
    Route::post('profile', [AccountController::class, 'editProfile']);
    Route::post('account', [AccountController::class, 'editAccount']);
    Route::get('profilePicture/{userId}', [ProfileResourceController::class, 'getProfilePicture'])->name('user.profile');
});

Route::middleware('userTo:dashboard.index')->group(function () {
    Route::get('/register', [AuthPageController::class, 'registerPage'])->name('register.page');
    Route::post('/checkEmail', [AuthActionController::class, 'checkEmail']);
    Route::post('/register', [AuthActionController::class, 'createNewAccount']);
});


// TODO: Make email verification actually work
Route::get('/email/verify/{id}/{hash}', function (MailixerEmailVerificationRequest $request) {
    $request->fulfill();

    return to_route('home');
})->middleware(['auth', 'signed'])->name('verification.verify');

