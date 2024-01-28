<?php

namespace App\Http\Requests;

use App\Enums\NewsletterContentType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateNewsletter extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => 'required|numeric',
            'subject' => 'required|string',
            'content' => 'required|string',
            'contentType' => ['required', Rule::in(array_map(function ($contentType) {
                return $contentType->name;
            },NewsletterContentType::cases()))]
        ];
    }
}
