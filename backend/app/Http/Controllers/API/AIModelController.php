
<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAIModelRequest;
use App\Http\Requests\UpdateAIModelRequest;
use App\Http\Resources\AIModelResource;
use App\Services\AIModelService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class AIModelController extends Controller
{
    protected $aiModelService;
    
    public function __construct(AIModelService $aiModelService)
    {
        $this->aiModelService = $aiModelService;
    }

    /**
     * Get all AI models
     *
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        $models = $this->aiModelService->getAllModels();
        return AIModelResource::collection($models);
    }

    /**
     * Get a specific AI model by ID
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show($id): JsonResponse
    {
        try {
            $model = $this->aiModelService->getModelById($id);
            
            if (!$model) {
                return response()->json([
                    'success' => false,
                    'error' => 'AI model not found'
                ], 404);
            }
            
            return (new AIModelResource($model))->response();
            
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], $e->getCode() ?: 500);
        }
    }

    /**
     * Create a new AI model
     *
     * @param StoreAIModelRequest $request
     * @return JsonResponse
     */
    public function store(StoreAIModelRequest $request): JsonResponse
    {
        try {
            $model = $this->aiModelService->createModel($request->validated());
            
            return (new AIModelResource($model))
                ->additional(['message' => 'AI model created successfully'])
                ->response()
                ->setStatusCode(201);
                
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], $e->getCode() ?: 500);
        }
    }

    /**
     * Update an existing AI model
     *
     * @param UpdateAIModelRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(UpdateAIModelRequest $request, $id): JsonResponse
    {
        try {
            $model = $this->aiModelService->updateModel($id, $request->validated());
            
            return (new AIModelResource($model))
                ->additional(['message' => 'AI model updated successfully'])
                ->response();
                
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], $e->getCode() ?: 500);
        }
    }

    /**
     * Delete an AI model
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy($id): JsonResponse
    {
        try {
            $this->aiModelService->deleteModel($id);
            
            return response()->json([
                'success' => true,
                'message' => 'AI model deleted successfully'
            ]);
            
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], $e->getCode() ?: 500);
        }
    }

    /**
     * Toggle default status for an AI model
     *
     * @param int $id
     * @return JsonResponse
     */
    public function toggleDefault($id): JsonResponse
    {
        try {
            $model = $this->aiModelService->toggleDefaultStatus($id);
            
            return (new AIModelResource($model))
                ->additional(['message' => 'Default AI model updated successfully'])
                ->response();
                
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], $e->getCode() ?: 500);
        }
    }

    /**
     * Toggle status (active/inactive) for an AI model
     *
     * @param int $id
     * @return JsonResponse
     */
    public function toggleStatus($id): JsonResponse
    {
        try {
            $model = $this->aiModelService->toggleActiveStatus($id);
            
            return (new AIModelResource($model))
                ->additional(['message' => 'AI model status updated successfully'])
                ->response();
                
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], $e->getCode() ?: 500);
        }
    }
}
