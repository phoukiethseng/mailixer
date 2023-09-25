<?php

namespace App\Models;

use App\Models\SubscribePage;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Model
{
    use HasFactory;

    public function subscribers(): HasMany {
        return $this->hasMany(Subscriber::class);
    }
    public function subscribePage(): HasOne {
        return $this->hasOne(SubscribePage::class);
    }
    protected $table = 'users';
    protected $primaryKey = 'id';
}
