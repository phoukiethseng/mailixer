<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProfilePicture extends Model
{
    use HasFactory;
    protected $table = 'profile_pictures';
    protected $primaryKey = 'id';
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
