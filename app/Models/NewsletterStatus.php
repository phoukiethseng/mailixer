<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class NewsletterStatus extends Model
{
    use HasFactory;

    protected $table = 'newsletter_status';
    protected $primaryKey = 'id';
    public function newsletters(): HasMany {
        return $this->hasMany(Newsletter::class, 'status_id');
    }
}
