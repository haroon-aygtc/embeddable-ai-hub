
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\AIModelController;
use App\Http\Controllers\API\FollowUpController;
use App\Http\Controllers\API\PromptTemplateController;
use App\Http\Controllers\API\WidgetController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Authentication routes
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/user', [AuthController::class, 'getCurrentUser']);
    Route::put('/auth/user', [AuthController::class, 'updateUser']);

    // AI Models routes
    Route::apiResource('models', AIModelController::class);
    Route::put('/models/{id}/toggle-default', [AIModelController::class, 'toggleDefault']);
    Route::put('/models/{id}/toggle-status', [AIModelController::class, 'toggleStatus']);

    // Follow-up flows routes
    Route::apiResource('follow-ups', FollowUpController::class);
    Route::post('/follow-ups/{id}/nodes', [FollowUpController::class, 'addNode']);
    Route::put('/follow-ups/{id}/nodes/{nodeId}', [FollowUpController::class, 'updateNode']);
    Route::delete('/follow-ups/{id}/nodes/{nodeId}', [FollowUpController::class, 'deleteNode']);
    
    // Prompt templates routes
    Route::apiResource('prompt-templates', PromptTemplateController::class);
    Route::get('/prompt-templates/category/{category}', [PromptTemplateController::class, 'getByCategory']);
});

// Public API endpoint for widget embed code
Route::get('/widgets/{id}/embed-code', [WidgetController::class, 'getEmbedCode']);
