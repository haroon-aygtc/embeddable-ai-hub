
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

// Export apiClient directly
export { default as apiClient } from './client';

/**
 * Common API response structure
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Pagination metadata structure
 */
export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

/**
 * Paginated API response
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}
