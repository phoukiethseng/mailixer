<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Newsletter extends Model
{
    use HasFactory;

    protected $guarded = ['status_id'];
    protected $appends = ['status'];
    protected $table = 'newsletters';

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function contentType(): BelongsTo
    {
        return $this->belongsTo(NewsletterContentType::class);
    }

    public function getStatusAttribute()
    {
        return \App\Enums\NewsletterStatus::tryFrom($this->attributes['status_id'])->name;
    }
    public function setStatusAttribute(\App\Enums\NewsletterStatus $status)
    {
        $this->attributes['status_id'] = $status->value;
    }

    public function sentSubscribers(): BelongsToMany
    {
        return $this->belongsToMany(Subscriber::class, 'email_send_results');
    }
}
