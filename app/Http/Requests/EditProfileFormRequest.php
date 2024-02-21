<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class EditProfileFormRequest extends FormRequest
{

    protected $errorBag = 'profile';

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
            'isChangeProfilePicture' => 'required|boolean',
            'profilePicture' => 'required_if_accepted:isChangeProfilePicture|string', // base64 regex:/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/
            'profilePictureType' => 'required_if_accepted:isChangeProfilePicture|string',
            'displayName' => 'required|alpha_num:ascii',
        ];
    }
}
