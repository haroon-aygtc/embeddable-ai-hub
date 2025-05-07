
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
  | "speech-to-text";

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
}

export interface AIModelStats {
  totalQueries: number;
  avgResponseTime: number;
  errorRate: number;
  tokenUsage: number;
  lastUsed?: Date;
}

export interface AIModelTestResult {
  responseText: string;
  duration: number;
  tokenCount: number;
  success: boolean;
  error?: string;
}
