
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAIModelRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'name' => 'sometimes|string|max:255',
            'provider' => 'sometimes|string|max:100',
            'description' => 'sometimes|string',
            'api_key' => 'nullable|string',
            'base_url' => 'nullable|string',
            'model_type' => 'sometimes|string|in:chat,completion,image,embedding',
            'max_tokens' => 'nullable|integer',
            'temperature' => 'nullable|numeric|between:0,1',
            'is_default' => 'boolean',
            'status' => 'sometimes|string|in:active,inactive,testing',
            'capabilities' => 'nullable|array'
        ];
    }
}
