<?php

namespace App\Models;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Auth\MustVerifyEmail as MustVerifyEmailTrait;
use Illuminate\Notifications\Notifiable;
use \Illuminate\Auth\Authenticatable as AuthenticatableTrait;

class User extends Model implements MustVerifyEmail, Authenticatable
{
    use HasFactory, MustVerifyEmailTrait, Notifiable, AuthenticatableTrait;

    public function subscribers(): HasMany {
        return $this->hasMany(Subscriber::class);
    }
    public function subscribePage(): HasOne {
        return $this->hasOne(SubscribePage::class);
    }
    public function newsletters(): HasMany {
        return $this->hasMany(Newsletter::class);
    }
    public function profilePicture(): HasOne
    {
        return $this->hasOne(ProfilePicture::class, 'user_id', 'id');
    }
    protected $table = 'users';
    protected $primaryKey = 'id';
}
