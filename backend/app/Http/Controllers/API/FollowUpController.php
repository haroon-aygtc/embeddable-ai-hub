
<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\FollowUp;
use App\Models\FollowUpNode;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class FollowUpController extends Controller
{
    /**
     * Get all follow-up flows
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $followUps = FollowUp::with('nodes')->get();
        
        return response()->json([
            'success' => true,
            'data' => $followUps
        ]);
    }

    /**
     * Get a specific follow-up flow by ID
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show($id): JsonResponse
    {
        $followUp = FollowUp::with('nodes')->find($id);
        
        if (!$followUp) {
            return response()->json([
                'success' => false,
                'error' => 'Follow-up flow not found'
            ], 404);
        }
        
        return response()->json([
            'success' => true,
            'data' => $followUp
        ]);
    }

    /**
     * Create a new follow-up flow
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => 'required|in:active,inactive,draft',
            'nodes' => 'array',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => $validator->errors()
            ], 422);
        }
        
        $followUp = new FollowUp();
        $followUp->name = $request->name;
        $followUp->description = $request->description;
        $followUp->status = $request->status;
        $followUp->save();
        
        // Process nodes if provided
        if ($request->has('nodes') && is_array($request->nodes)) {
            foreach ($request->nodes as $nodeData) {
                $node = new FollowUpNode();
                $node->follow_up_id = $followUp->id;
                $node->type = $nodeData['type'];
                $node->content = $nodeData['content'];
                $node->delay = $nodeData['delay'] ?? 0;
                $node->delay_unit = $nodeData['delayUnit'] ?? 'days';
                $node->conditions = $nodeData['conditions'] ?? [];
                $node->save();
            }
        }
        
        // Reload with nodes
        $followUp->load('nodes');
        
        return response()->json([
            'success' => true,
            'data' => $followUp,
            'message' => 'Follow-up flow created successfully'
        ], 201);
    }

    /**
     * Update an existing follow-up flow
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, $id): JsonResponse
    {
        $followUp = FollowUp::find($id);
        
        if (!$followUp) {
            return response()->json([
                'success' => false,
                'error' => 'Follow-up flow not found'
            ], 404);
        }
        
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'status' => 'sometimes|required|in:active,inactive,draft',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => $validator->errors()
            ], 422);
        }
        
        // Update only provided fields
        if ($request->has('name')) $followUp->name = $request->name;
        if ($request->has('description')) $followUp->description = $request->description;
        if ($request->has('status')) $followUp->status = $request->status;
        
        $followUp->save();
        
        // Reload with nodes
        $followUp->load('nodes');
        
        return response()->json([
            'success' => true,
            'data' => $followUp,
            'message' => 'Follow-up flow updated successfully'
        ]);
    }

    /**
     * Delete a follow-up flow
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy($id): JsonResponse
    {
        $followUp = FollowUp::find($id);
        
        if (!$followUp) {
            return response()->json([
                'success' => false,
                'error' => 'Follow-up flow not found'
            ], 404);
        }
        
        // Delete associated nodes first
        $followUp->nodes()->delete();
        
        // Delete the follow-up
        $followUp->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Follow-up flow deleted successfully'
        ]);
    }

    /**
     * Add a node to a follow-up flow
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function addNode(Request $request, $id): JsonResponse
    {
        $followUp = FollowUp::find($id);
        
        if (!$followUp) {
            return response()->json([
                'success' => false,
                'error' => 'Follow-up flow not found'
            ], 404);
        }
        
        $validator = Validator::make($request->all(), [
            'type' => 'required|string|in:email,task,conditional',
            'content' => 'required|string',
            'delay' => 'integer|min:0',
            'delayUnit' => 'string|in:minutes,hours,days',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => $validator->errors()
            ], 422);
        }
        
        $node = new FollowUpNode();
        $node->follow_up_id = $followUp->id;
        $node->type = $request->type;
        $node->content = $request->content;
        $node->delay = $request->delay ?? 0;
        $node->delay_unit = $request->delayUnit ?? 'days';
        $node->conditions = $request->conditions ?? [];
        $node->save();
        
        // Reload the follow-up with nodes
        $followUp->load('nodes');
        
        return response()->json([
            'success' => true,
            'data' => $followUp,
            'message' => 'Node added successfully'
        ], 201);
    }

    /**
     * Update a node in a follow-up flow
     *
     * @param Request $request
     * @param int $id
     * @param int $nodeId
     * @return JsonResponse
     */
    public function updateNode(Request $request, $id, $nodeId): JsonResponse
    {
        $followUp = FollowUp::find($id);
        
        if (!$followUp) {
            return response()->json([
                'success' => false,
                'error' => 'Follow-up flow not found'
            ], 404);
        }
        
        $node = FollowUpNode::where('follow_up_id', $id)
            ->where('id', $nodeId)
            ->first();
        
        if (!$node) {
            return response()->json([
                'success' => false,
                'error' => 'Node not found in this flow'
            ], 404);
        }
        
        // Update node fields if provided
        if ($request->has('type')) $node->type = $request->type;
        if ($request->has('content')) $node->content = $request->content;
        if ($request->has('delay')) $node->delay = $request->delay;
        if ($request->has('delayUnit')) $node->delay_unit = $request->delayUnit;
        if ($request->has('conditions')) $node->conditions = $request->conditions;
        
        $node->save();
        
        // Reload the follow-up with nodes
        $followUp->load('nodes');
        
        return response()->json([
            'success' => true,
            'data' => $followUp,
            'message' => 'Node updated successfully'
        ]);
    }

    /**
     * Delete a node from a follow-up flow
     *
     * @param int $id
     * @param int $nodeId
     * @return JsonResponse
     */
    public function deleteNode($id, $nodeId): JsonResponse
    {
        $followUp = FollowUp::find($id);
        
        if (!$followUp) {
            return response()->json([
                'success' => false,
                'error' => 'Follow-up flow not found'
            ], 404);
        }
        
        $node = FollowUpNode::where('follow_up_id', $id)
            ->where('id', $nodeId)
            ->first();
        
        if (!$node) {
            return response()->json([
                'success' => false,
                'error' => 'Node not found in this flow'
            ], 404);
        }
        
        $node->delete();
        
        // Reload the follow-up with remaining nodes
        $followUp->load('nodes');
        
        return response()->json([
            'success' => true,
            'data' => $followUp,
            'message' => 'Node deleted successfully'
        ]);
    }
}
