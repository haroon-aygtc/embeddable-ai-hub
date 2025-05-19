
/**
 * API service index file
 * 
 * This file exports all API services for use throughout the application.
 */

// Re-export all API services
export * from './follow-ups';
export * from './types';
export * from './prompt-templates';
export * from './ai-models';
export * from './client';
export * from './mappers/ai-model-mapper';

// Export apiClient directly
export { default as apiClient } from './client';

