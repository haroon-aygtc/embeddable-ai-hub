
import { AIModel as ApiAIModel } from '@/api/ai-models';
import { AIModel as UIAIModel, AIModelStatus, AIModelType, AIModelFormValues } from '@/components/ai/types/aiTypes';

/**
 * Maps API AI model data to UI format
 */
export function mapApiToUiModel(apiModel: ApiAIModel): UIAIModel {
  return {
    id: apiModel.id,
    name: apiModel.name,
    provider: apiModel.provider,
    description: apiModel.description,
    apiKey: apiModel.api_key,
    baseUrl: apiModel.base_url,
    modelType: mapModelType(apiModel.model_type),
    maxTokens: apiModel.max_tokens,
    temperature: apiModel.temperature,
    isDefault: apiModel.is_default,
    status: mapStatus(apiModel.status),
    capabilities: apiModel.capabilities || [],
    createdAt: apiModel.created_at ? new Date(apiModel.created_at) : new Date(),
    updatedAt: apiModel.updated_at ? new Date(apiModel.updated_at) : new Date(),
  };
}

/**
 * Maps UI AI model data to API format
 */
export function mapUiToApiModel(uiModel: Partial<UIAIModel | AIModelFormValues>): Partial<ApiAIModel> {
  const result: Partial<ApiAIModel> = {};
  
  if (uiModel.id) result.id = uiModel.id;
  if (uiModel.name) result.name = uiModel.name;
  if (uiModel.provider) result.provider = uiModel.provider;
  if (uiModel.description) result.description = uiModel.description;
  if (uiModel.apiKey !== undefined) result.api_key = uiModel.apiKey;
  if (uiModel.baseUrl !== undefined) result.base_url = uiModel.baseUrl;
  if (uiModel.modelType) result.model_type = reverseMapModelType(uiModel.modelType);
  if (uiModel.maxTokens !== undefined) result.max_tokens = uiModel.maxTokens;
  if (uiModel.temperature !== undefined) result.temperature = uiModel.temperature;
  if (uiModel.isDefault !== undefined) result.is_default = uiModel.isDefault;
  if (uiModel.status) result.status = reverseMapStatus(uiModel.status as AIModelStatus);
  if ('capabilities' in uiModel && uiModel.capabilities) result.capabilities = uiModel.capabilities;
  
  return result;
}

/**
 * Maps API model type to UI model type
 */
function mapModelType(apiType: string): AIModelType {
  switch (apiType) {
    case 'chat':
      return 'text-generation';
    case 'completion':
      return 'text-generation';
    case 'image':
      return 'image-generation';
    case 'embedding':
      return 'embedding';
    default:
      return 'text-generation';
  }
}

/**
 * Maps UI model type to API model type
 */
function reverseMapModelType(uiType: AIModelType): 'chat' | 'completion' | 'image' | 'embedding' {
  switch (uiType) {
    case 'text-generation':
      return 'chat';
    case 'image-generation':
      return 'image';
    case 'embedding':
      return 'embedding';
    case 'text-to-speech':
      return 'chat'; // Default to chat
    case 'speech-to-text':
      return 'chat'; // Default to chat
    default:
      return 'chat';
  }
}

/**
 * Maps API status to UI status
 */
function mapStatus(status: string): AIModelStatus {
  if (status === 'active') return 'active';
  if (status === 'inactive') return 'inactive';
  return 'testing';
}

/**
 * Maps UI status to API status
 */
function reverseMapStatus(status: AIModelStatus): string {
  return status;
}
