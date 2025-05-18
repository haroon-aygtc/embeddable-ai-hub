
/**
 * API service index file
 * 
 * This file exports all API services for use throughout the application.
 */

// Re-export all API services
export * from './follow-ups';
export * from './types';

// Add more API services exports here as they are created

/**
 * API base URL
 */
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.aichathub.com/api/v1'
  : 'http://localhost:8000/api';
