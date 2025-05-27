
export type AIModelProvider = 
  | "OpenAI" 
  | "Google" 
  | "Anthropic" 
  | "Meta" 
  | "Hugging Face" 
  | "Perplexity" 
  | "Mistral AI" 
  | "Custom";

export type AIModelType = 
  | "text-generation" 
  | "embedding" 
  | "image-generation" 
  | "text-to-speech" 
  | "speech-to-text"
  | "multimodal";

export type AIModelStatus = "active" | "inactive" | "testing";

export interface AIModel {
  id: string;
  name: string;
  provider: AIModelProvider | string;
  description: string;
  apiKey?: string;
  baseUrl?: string;
  status: AIModelStatus;
  isDefault: boolean;
  modelType: AIModelType;
  maxTokens?: number;
  temperature?: number;
  capabilities: string[];
  createdAt: Date;
  updatedAt: Date;
  // New advanced fields
  priority?: number;
  costPerToken?: number;
  responseTime?: number;
  accuracy?: number;
  rateLimits?: {
    requestsPerMinute?: number;
    tokensPerMinute?: number;
  };
  healthStatus?: "healthy" | "degraded" | "down";
  lastHealthCheck?: Date;
  tags?: string[];
  customSettings?: Record<string, any>;
}

export interface AIModelFormValues {
  name: string;
  provider: string;
  description: string;
  apiKey?: string;
  baseUrl?: string;
  maxTokens?: number;
  temperature?: number;
  modelType: string;
  isDefault?: boolean;
  status?: AIModelStatus;
  capabilities?: string[];
  // New fields
  priority?: number;
  costPerToken?: number;
  rateLimits?: {
    requestsPerMinute?: number;
    tokensPerMinute?: number;
  };
  tags?: string[];
}

export interface AIModelStats {
  totalQueries: number;
  avgResponseTime: number;
  errorRate: number;
  tokenUsage: number;
  lastUsed?: Date;
  // New metrics
  successRate: number;
  averageCost: number;
  totalCost: number;
  peakUsageTime?: string;
}

export interface AIModelTestResult {
  responseText: string;
  duration: number;
  tokenCount: number;
  success: boolean;
  error?: string;
  // Enhanced test results
  cost?: number;
  quality?: number;
  relevance?: number;
}

export interface AIModelBenchmark {
  id: string;
  modelId: string;
  testName: string;
  score: number;
  maxScore: number;
  runDate: Date;
  details?: Record<string, any>;
}

export interface AIModelUsageMetrics {
  modelId: string;
  date: string;
  requests: number;
  tokens: number;
  cost: number;
  averageResponseTime: number;
  errorRate: number;
}
