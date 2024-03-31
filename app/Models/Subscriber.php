<?php

namespace App\Models;

use App\Enums\SubscriptionStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Subscriber extends Model
{
    use HasFactory;

    protected $guarded = ['unsubscribed_at'];

    protected $casts = [
        'unsubscribed_at' => 'datetime'
    ];

    protected $table = 'subscribers';

    public function getStatusAttribute(): SubscriptionStatus
    {
        return isset($this->attributes['unsubscribed_at']) ? SubscriptionStatus::UNSUBSCRIBED : SubscriptionStatus::SUBSCRIBED;
    }

    public function setStatusAttribute(SubscriptionStatus $status)
    {
        $this->attributes['unsubscribed_at'] = now("UTC");
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

}
