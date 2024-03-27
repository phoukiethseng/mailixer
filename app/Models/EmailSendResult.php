<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class EmailSendResult extends Pivot
{
    use HasFactory;
    protected $table = 'email_send_results';
    protected $primaryKey = 'id';

    private const STATUS = [
        1 => 'SENT',
        2 => 'DELIVERED',
        3 => 'REJECTED',
        4 => 'COMPLAINT',
    ];

    /**
     * @return 'SENT' | 'DELIVERED' | 'REJECTED' | 'COMPLAINT'
     */
    public static function getStatus($statusId)
    {
        return self::STATUS[$statusId];
    }
}
