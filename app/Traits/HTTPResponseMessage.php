<?php

namespace App\Traits;

trait HTTPResponseMessage
{
    protected function responseMessageWithData(string $message, array $data = []): array
    {
        return array_merge($data, $this->responseMessage($message));
    }

    public function responseMessage(string $message): array
    {
        return [
            'message' => $message
        ];
    }

}
