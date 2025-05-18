
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

/**
 * Follow-Up Flow interface
 */
export interface FollowUpFlow {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive" | "draft";
  nodes: FollowUpNode[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Follow-Up Node interface
 */
export interface FollowUpNode {
  id: string;
  type: "email" | "task" | "conditional";
  content: string;
  delay: number;
  delayUnit: "minutes" | "hours" | "days";
  conditions: any[];
}
