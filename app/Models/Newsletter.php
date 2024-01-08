<?php

namespace App\Models;

use App\Models\NewsletterContentType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Newsletter extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $table = 'newsletters';
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function contentType(): BelongsTo
    {
        return $this->belongsTo(NewsletterContentType::class);
    }
    public function status(): BelongsTo {
        return $this->belongsTo(NewsletterStatus::class);
    }
}
