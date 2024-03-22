<?php

namespace App\Http\Requests;

use App\Repositories\Interfaces\UserRepository;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;

class MailixerEmailVerificationRequest extends EmailVerificationRequest
{
    /**
     * Modify authorize() logic because original logic make call to undefined getKey() method
     */
    public function authorize(): bool
    {
        $user = App::get(UserRepository::class)->findById($this->user()->id);
        if (! hash_equals((string) $user->getKey(), (string) $this->route('id'))) {
            return false;
        }

        if (! hash_equals(sha1($user->getEmailForVerification()), (string) $this->route('hash'))) {
            return false;
        }

        return true;
    }

    public function fulfill()
    {
        $user = App::get(UserRepository::class)->findById($this->user()->id);
        if (! $user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();

            event(new Verified($user));
        }
    }


}
