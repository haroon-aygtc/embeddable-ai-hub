
import { AIModel as ApiAIModel } from '@/api/ai-models';
import { AIModel as UIAIModel, AIModelStatus, AIModelType } from '@/components/ai/types/aiTypes';

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
export function mapUiToApiModel(uiModel: Partial<UIAIModel>): Partial<ApiAIModel> {
  return {
    ...(uiModel.id && { id: uiModel.id }),
    ...(uiModel.name && { name: uiModel.name }),
    ...(uiModel.provider && { provider: uiModel.provider }),
    ...(uiModel.description && { description: uiModel.description }),
    ...(uiModel.apiKey !== undefined && { api_key: uiModel.apiKey }),
    ...(uiModel.baseUrl !== undefined && { base_url: uiModel.baseUrl }),
    ...(uiModel.modelType && { model_type: reverseMapModelType(uiModel.modelType) }),
    ...(uiModel.maxTokens !== undefined && { max_tokens: uiModel.maxTokens }),
    ...(uiModel.temperature !== undefined && { temperature: uiModel.temperature }),
    ...(uiModel.isDefault !== undefined && { is_default: uiModel.isDefault }),
    ...(uiModel.status && { status: reverseMapStatus(uiModel.status) }),
    ...(uiModel.capabilities && { capabilities: uiModel.capabilities }),
  };
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
function reverseMapModelType(uiType: AIModelType): string {
  switch (uiType) {
    case 'text-generation':
      return 'chat';
    case 'image-generation':
      return 'image';
    case 'embedding':
      return 'embedding';
    case 'text-to-speech':
      return 'tts';
    case 'speech-to-text':
      return 'stt';
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
