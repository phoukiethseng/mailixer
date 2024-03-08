<?php

namespace App\DTOs;

use App\Models\SubscribePage;
use App\Traits\HasId;

class SubscribePageDTO extends BaseDTO
{
    use HasId;

    public $description;

    public function __construct(SubscribePage $subscribePage)
    {
        $this->id = $subscribePage->id;
        $this->description = $subscribePage->description;
    }
}
