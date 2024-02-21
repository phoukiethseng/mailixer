<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EditAccountFormRequest extends FormRequest
{

    protected $errorBag = 'account';

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
            'email' => 'required|email',
            'newPassword' => 'string|nullable|between:8,30',
            'oldPassword' => 'required_with:newPassword|string|between:8,30'
        ];
    }
}
