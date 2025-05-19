
<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use App\Models\PromptTemplate;

class PromptTemplateController extends Controller
{
    /**
     * Get all prompt templates
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $templates = PromptTemplate::all();
        
        return response()->json([
            'success' => true,
            'data' => $templates
        ]);
    }

    /**
     * Get a specific prompt template by ID
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show($id): JsonResponse
    {
        $template = PromptTemplate::find($id);
        
        if (!$template) {
            return response()->json([
                'success' => false,
                'error' => 'Prompt template not found'
            ], 404);
        }
        
        return response()->json([
            'success' => true,
            'data' => $template
        ]);
    }

    /**
     * Create a new prompt template
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:100',
            'promptText' => 'required|string',
            'tags' => 'array'
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => $validator->errors()
            ], 422);
        }
        
        $template = new PromptTemplate();
        $template->name = $request->name;
        $template->description = $request->description;
        $template->category = $request->category;
        $template->prompt_text = $request->promptText;
        $template->tags = $request->tags ?? [];
        $template->save();
        
        return response()->json([
            'success' => true,
            'data' => $template,
            'message' => 'Prompt template created successfully'
        ], 201);
    }

    /**
     * Update an existing prompt template
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, $id): JsonResponse
    {
        $template = PromptTemplate::find($id);
        
        if (!$template) {
            return response()->json([
                'success' => false,
                'error' => 'Prompt template not found'
            ], 404);
        }
        
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'category' => 'sometimes|required|string|max:100',
            'promptText' => 'sometimes|required|string',
            'tags' => 'sometimes|array'
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => $validator->errors()
            ], 422);
        }
        
        // Update only provided fields
        if ($request->has('name')) $template->name = $request->name;
        if ($request->has('description')) $template->description = $request->description;
        if ($request->has('category')) $template->category = $request->category;
        if ($request->has('promptText')) $template->prompt_text = $request->promptText;
        if ($request->has('tags')) $template->tags = $request->tags;
        
        $template->save();
        
        return response()->json([
            'success' => true,
            'data' => $template,
            'message' => 'Prompt template updated successfully'
        ]);
    }

    /**
     * Delete a prompt template
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy($id): JsonResponse
    {
        $template = PromptTemplate::find($id);
        
        if (!$template) {
            return response()->json([
                'success' => false,
                'error' => 'Prompt template not found'
            ], 404);
        }
        
        $template->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Prompt template deleted successfully'
        ]);
    }

    /**
     * Get templates by category
     *
     * @param string $category
     * @return JsonResponse
     */
    public function getByCategory($category): JsonResponse
    {
        $templates = PromptTemplate::where('category', $category)->get();
        
        return response()->json([
            'success' => true,
            'data' => $templates
        ]);
    }
}
