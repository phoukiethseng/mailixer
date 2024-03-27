<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class NewsletterSendResult extends Pivot
{
    use HasFactory;
    protected $table = 'newsletter_send_results';
    protected $primaryKey = 'id';
}
