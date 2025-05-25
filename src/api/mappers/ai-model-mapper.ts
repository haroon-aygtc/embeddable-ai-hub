
import { AIModel, AIModelFormValues, AIModelType, AIModelStatus } from "@/components/ai/types/aiTypes";

export interface BackendAIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  api_key?: string;
  base_url?: string;
  model_type: string;
  max_tokens?: number;
  temperature?: number;
  is_default: boolean;
  status: string;
  capabilities: string[];
  created_at: string;
  updated_at: string;
}

export const mapBackendToFrontend = (backendModel: BackendAIModel): AIModel => {
  return {
    id: backendModel.id,
    name: backendModel.name,
    provider: backendModel.provider,
    description: backendModel.description,
    apiKey: backendModel.api_key || '',
    baseUrl: backendModel.base_url || '',
    modelType: backendModel.model_type as AIModelType,
    maxTokens: backendModel.max_tokens || 4096,
    temperature: backendModel.temperature || 0.7,
    isDefault: backendModel.is_default,
    status: backendModel.status as AIModelStatus,
    capabilities: backendModel.capabilities,
    createdAt: new Date(backendModel.created_at),
    updatedAt: new Date(backendModel.updated_at)
  };
};

export const mapFrontendToBackend = (frontendModel: Partial<AIModel | AIModelFormValues>): Partial<BackendAIModel> => {
  // Handle both AIModel (with id) and AIModelFormValues (without id)
  const hasId = 'id' in frontendModel && frontendModel.id;
  
  const baseMapping: Partial<BackendAIModel> = {
    name: frontendModel.name,
    provider: frontendModel.provider,
    description: frontendModel.description,
    api_key: frontendModel.apiKey,
    base_url: frontendModel.baseUrl,
    model_type: frontendModel.modelType,
    max_tokens: frontendModel.maxTokens,
    temperature: frontendModel.temperature,
    is_default: frontendModel.isDefault || false,
    status: frontendModel.status,
    capabilities: frontendModel.capabilities || []
  };

  if (hasId) {
    return {
      ...baseMapping,
      id: (frontendModel as AIModel).id
    };
  }

  return baseMapping;
};

// Export with the expected names for backward compatibility
export const mapApiToUiModel = mapBackendToFrontend;
export const mapUiToApiModel = mapFrontendToBackend;
