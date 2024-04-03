<?php

namespace App\Repositories\Implementations;

use App\Models\EmailSendResult;
use App\Models\Newsletter;
use App\Repositories\Interfaces\NewsletterRepository;
use App\Repositories\Traits\EloquentCRUD;
use Illuminate\Database\Eloquent\Collection;

class EloquentNewsletterRepository implements NewsletterRepository
{
    use EloquentCRUD;

    public function __construct()
    {
        $this->modelClassName = Newsletter::class;
    }

    public function findAllByUserId($userId): Collection
    {
        return Newsletter::with(['contentType'])->where("user_id", $userId)->get();
    }

    public function getAuthorIdById($id)
    {
        return Newsletter::find($id)->user_id;
    }

    public function getAllSendResults($newsletterId): Collection
    {
        return Newsletter::find($newsletterId)->sendResults();
    }

  public function setSendResultStatusIdByMessageId($messageId, $statusId)
  {
    EmailSendResult::where('message_id', '=', $messageId)->update([
      'status_id' => $statusId
    ]);
  }
}
