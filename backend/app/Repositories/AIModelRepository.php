
<?php

namespace App\Repositories;

use App\Models\AIModel;
use Illuminate\Database\Eloquent\Collection;

class AIModelRepository
{
    /**
     * Get all AI models
     * 
     * @return Collection
     */
    public function getAll(): Collection
    {
        return AIModel::all();
    }
    
    /**
     * Find an AI model by ID
     * 
     * @param int $id
     * @return AIModel|null
     */
    public function findById(int $id): ?AIModel
    {
        return AIModel::find($id);
    }
    
    /**
     * Save a new AI model
     * 
     * @param array $data
     * @return AIModel
     */
    public function create(array $data): AIModel
    {
        $model = new AIModel();
        $model->fill($data);
        $model->save();
        
        return $model;
    }
    
    /**
     * Update an existing AI model
     * 
     * @param AIModel $model
     * @param array $data
     * @return AIModel
     */
    public function update(AIModel $model, array $data): AIModel
    {
        $model->fill($data);
        $model->save();
        
        return $model;
    }
    
    /**
     * Delete an AI model
     * 
     * @param AIModel $model
     * @return bool
     */
    public function delete(AIModel $model): bool
    {
        return $model->delete();
    }
    
    /**
     * Set all models to non-default
     * 
     * @return void
     */
    public function unsetAllDefaults(): void
    {
        AIModel::where('is_default', true)->update(['is_default' => false]);
    }
}
