<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class EmailSendResult extends Pivot
{
    use HasFactory;
    protected $table = 'email_send_results';
    protected $primaryKey = 'id';
}
