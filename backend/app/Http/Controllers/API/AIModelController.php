
<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use App\Models\AIModel;

class AIModelController extends Controller
{
    /**
     * Get all AI models
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $models = AIModel::all();
        
        return response()->json([
            'success' => true,
            'data' => $models
        ]);
    }

    /**
     * Get a specific AI model by ID
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show($id): JsonResponse
    {
        $model = AIModel::find($id);
        
        if (!$model) {
            return response()->json([
                'success' => false,
                'error' => 'AI model not found'
            ], 404);
        }
        
        return response()->json([
            'success' => true,
            'data' => $model
        ]);
    }

    /**
     * Create a new AI model
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'provider' => 'required|string|max:100',
            'description' => 'required|string',
            'api_key' => 'nullable|string',
            'base_url' => 'nullable|string',
            'model_type' => 'required|string|in:chat,completion,image,embedding',
            'max_tokens' => 'nullable|integer',
            'temperature' => 'nullable|numeric|between:0,1',
            'is_default' => 'boolean',
            'status' => 'required|string|in:active,inactive,testing',
            'capabilities' => 'nullable|array'
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => $validator->errors()
            ], 422);
        }
        
        // If this model is set as default, unset default flag on others
        if ($request->is_default) {
            AIModel::where('is_default', true)->update(['is_default' => false]);
        }
        
        $model = new AIModel();
        $model->name = $request->name;
        $model->provider = $request->provider;
        $model->description = $request->description;
        $model->api_key = $request->api_key;
        $model->base_url = $request->base_url;
        $model->model_type = $request->model_type;
        $model->max_tokens = $request->max_tokens;
        $model->temperature = $request->temperature;
        $model->is_default = $request->is_default ?? false;
        $model->status = $request->status;
        $model->capabilities = $request->capabilities ?? [];
        $model->save();
        
        return response()->json([
            'success' => true,
            'data' => $model,
            'message' => 'AI model created successfully'
        ], 201);
    }

    /**
     * Update an existing AI model
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, $id): JsonResponse
    {
        $model = AIModel::find($id);
        
        if (!$model) {
            return response()->json([
                'success' => false,
                'error' => 'AI model not found'
            ], 404);
        }
        
        $validator = Validator::make($request->all(), [
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
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => $validator->errors()
            ], 422);
        }
        
        // If this model is being set as default, unset default flag on others
        if ($request->has('is_default') && $request->is_default && !$model->is_default) {
            AIModel::where('is_default', true)->update(['is_default' => false]);
        }
        
        // Update only provided fields
        if ($request->has('name')) $model->name = $request->name;
        if ($request->has('provider')) $model->provider = $request->provider;
        if ($request->has('description')) $model->description = $request->description;
        if ($request->has('api_key')) $model->api_key = $request->api_key;
        if ($request->has('base_url')) $model->base_url = $request->base_url;
        if ($request->has('model_type')) $model->model_type = $request->model_type;
        if ($request->has('max_tokens')) $model->max_tokens = $request->max_tokens;
        if ($request->has('temperature')) $model->temperature = $request->temperature;
        if ($request->has('is_default')) $model->is_default = $request->is_default;
        if ($request->has('status')) $model->status = $request->status;
        if ($request->has('capabilities')) $model->capabilities = $request->capabilities;
        
        $model->save();
        
        return response()->json([
            'success' => true,
            'data' => $model,
            'message' => 'AI model updated successfully'
        ]);
    }

    /**
     * Delete an AI model
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy($id): JsonResponse
    {
        $model = AIModel::find($id);
        
        if (!$model) {
            return response()->json([
                'success' => false,
                'error' => 'AI model not found'
            ], 404);
        }
        
        // Don't allow deletion of default model
        if ($model->is_default) {
            return response()->json([
                'success' => false,
                'error' => 'Cannot delete the default AI model'
            ], 422);
        }
        
        $model->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'AI model deleted successfully'
        ]);
    }

    /**
     * Toggle default status for an AI model
     *
     * @param int $id
     * @return JsonResponse
     */
    public function toggleDefault($id): JsonResponse
    {
        $model = AIModel::find($id);
        
        if (!$model) {
            return response()->json([
                'success' => false,
                'error' => 'AI model not found'
            ], 404);
        }
        
        // If the model is already default, we can't unset it without setting another one
        if ($model->is_default) {
            return response()->json([
                'success' => false,
                'error' => 'Cannot unset default model. Set another model as default first.'
            ], 422);
        }
        
        // Set all models to non-default
        AIModel::where('is_default', true)->update(['is_default' => false]);
        
        // Set this model as default
        $model->is_default = true;
        $model->save();
        
        return response()->json([
            'success' => true,
            'data' => $model,
            'message' => 'Default AI model updated successfully'
        ]);
    }

    /**
     * Toggle status (active/inactive) for an AI model
     *
     * @param int $id
     * @return JsonResponse
     */
    public function toggleStatus($id): JsonResponse
    {
        $model = AIModel::find($id);
        
        if (!$model) {
            return response()->json([
                'success' => false,
                'error' => 'AI model not found'
            ], 404);
        }
        
        // Don't allow deactivating the default model
        if ($model->is_default && $model->status === 'active') {
            return response()->json([
                'success' => false,
                'error' => 'Cannot deactivate the default AI model'
            ], 422);
        }
        
        // Toggle status
        $model->status = $model->status === 'active' ? 'inactive' : 'active';
        $model->save();
        
        return response()->json([
            'success' => true,
            'data' => $model,
            'message' => 'AI model status updated successfully'
        ]);
    }
}
