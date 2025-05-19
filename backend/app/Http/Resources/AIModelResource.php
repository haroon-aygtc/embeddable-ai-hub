
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AIModelResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'provider' => $this->provider,
            'description' => $this->description,
            'api_key' => $this->api_key,
            'base_url' => $this->base_url,
            'model_type' => $this->model_type,
            'max_tokens' => $this->max_tokens,
            'temperature' => $this->temperature,
            'is_default' => $this->is_default,
            'status' => $this->status,
            'capabilities' => $this->capabilities,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }

    /**
     * Get additional data that should be returned with the resource array.
     *
     * @param  Request  $request
     * @return array
     */
    public function with($request): array
    {
        return [
            'success' => true
        ];
    }
}
