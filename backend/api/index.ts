
/**
 * API service index file
 * 
 * This file exports all API services for use throughout the application.
 */

// Re-export all API services
export * from './auth';
export * from './models';
export * from './follow-ups';

/**
 * API base URL
 */
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.aichathub.com/api/v1'
  : 'http://localhost:8000/api/v1';

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
