
<?php

namespace App\Services;

use App\Models\AIModel;
use App\Repositories\AIModelRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Validation\ValidationException;

class AIModelService
{
    protected $repository;
    
    public function __construct(AIModelRepository $repository)
    {
        $this->repository = $repository;
    }
    
    /**
     * Get all AI models
     * 
     * @return Collection
     */
    public function getAllModels(): Collection
    {
        return $this->repository->getAll();
    }
    
    /**
     * Get a specific AI model by ID
     * 
     * @param int $id
     * @return AIModel|null
     */
    public function getModelById(int $id): ?AIModel
    {
        return $this->repository->findById($id);
    }
    
    /**
     * Create a new AI model
     * 
     * @param array $data
     * @return AIModel
     */
    public function createModel(array $data): AIModel
    {
        // If this model is set as default, unset default flag on others
        if (isset($data['is_default']) && $data['is_default']) {
            $this->repository->unsetAllDefaults();
        }
        
        return $this->repository->create($data);
    }
    
    /**
     * Update an existing AI model
     * 
     * @param int $id
     * @param array $data
     * @return AIModel
     * @throws \Exception
     */
    public function updateModel(int $id, array $data): AIModel
    {
        $model = $this->repository->findById($id);
        
        if (!$model) {
            throw new \Exception('AI model not found', 404);
        }
        
        // If this model is being set as default, unset default flag on others
        if (isset($data['is_default']) && $data['is_default'] && !$model->is_default) {
            $this->repository->unsetAllDefaults();
        }
        
        return $this->repository->update($model, $data);
    }
    
    /**
     * Delete an AI model
     * 
     * @param int $id
     * @return bool
     * @throws \Exception
     */
    public function deleteModel(int $id): bool
    {
        $model = $this->repository->findById($id);
        
        if (!$model) {
            throw new \Exception('AI model not found', 404);
        }
        
        if ($model->is_default) {
            throw new \Exception('Cannot delete the default AI model', 422);
        }
        
        return $this->repository->delete($model);
    }
    
    /**
     * Toggle default status for an AI model
     * 
     * @param int $id
     * @return AIModel
     * @throws \Exception
     */
    public function toggleDefaultStatus(int $id): AIModel
    {
        $model = $this->repository->findById($id);
        
        if (!$model) {
            throw new \Exception('AI model not found', 404);
        }
        
        if ($model->is_default) {
            throw new \Exception('Cannot unset default model. Set another model as default first.', 422);
        }
        
        $this->repository->unsetAllDefaults();
        
        $model->is_default = true;
        $model->save();
        
        return $model;
    }
    
    /**
     * Toggle active/inactive status for an AI model
     * 
     * @param int $id
     * @return AIModel
     * @throws \Exception
     */
    public function toggleActiveStatus(int $id): AIModel
    {
        $model = $this->repository->findById($id);
        
        if (!$model) {
            throw new \Exception('AI model not found', 404);
        }
        
        if ($model->is_default && $model->status === 'active') {
            throw new \Exception('Cannot deactivate the default AI model', 422);
        }
        
        $model->status = $model->status === 'active' ? 'inactive' : 'active';
        $model->save();
        
        return $model;
    }
}
