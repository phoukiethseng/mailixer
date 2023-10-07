<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class NewsletterContentType extends Model
{
    use HasFactory;
    protected $table = 'newsletter_content_type'; 
    public function newsletters(): HasMany {
        return $this->hasMany(Newsletter::class);
    }
}
