
import apiClient from './client';
import { mapApiToUiModel, mapUiToApiModel } from './mappers/ai-model-mapper';
import { AIModel as UIAIModel, AIModelFormValues } from '@/components/ai/types/aiTypes';

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  api_key?: string;
  base_url?: string;
  model_type: 'chat' | 'completion' | 'image' | 'embedding';
  max_tokens?: number;
  temperature?: number;
  is_default: boolean;
  status: 'active' | 'inactive' | 'testing';
  capabilities: string[];
  created_at?: string;
  updated_at?: string;
}

export interface CreateAIModelPayload {
  name: string;
  provider: string;
  description: string;
  api_key?: string;
  base_url?: string;
  model_type: string;
  max_tokens?: number;
  temperature?: number;
  is_default?: boolean;
  status: string;
  capabilities?: string[];
}

export interface UpdateAIModelPayload {
  name?: string;
  provider?: string;
  description?: string;
  api_key?: string;
  base_url?: string;
  model_type?: string;
  max_tokens?: number;
  temperature?: number;
  is_default?: boolean;
  status?: string;
  capabilities?: string[];
}

export const fetchAIModels = async (): Promise<UIAIModel[]> => {
  const response = await apiClient.get('/models');
  return response.data.data.map(mapApiToUiModel);
};

export const fetchAIModel = async (id: string): Promise<UIAIModel> => {
  const response = await apiClient.get(`/models/${id}`);
  return mapApiToUiModel(response.data.data);
};

export const createAIModel = async (payload: AIModelFormValues & { capabilities: string[] }): Promise<UIAIModel> => {
  const apiPayload = mapUiToApiModel(payload);
  
  const response = await apiClient.post('/models', apiPayload);
  return mapApiToUiModel(response.data.data);
};

export const updateAIModel = async (id: string, payload: Partial<AIModelFormValues & { capabilities: string[] }>): Promise<UIAIModel> => {
  const apiPayload = mapUiToApiModel(payload);
  const response = await apiClient.put(`/models/${id}`, apiPayload);
  return mapApiToUiModel(response.data.data);
};

export const deleteAIModel = async (id: string): Promise<void> => {
  await apiClient.delete(`/models/${id}`);
};

export const toggleAIModelDefault = async (id: string): Promise<UIAIModel> => {
  const response = await apiClient.put(`/models/${id}/toggle-default`);
  return mapApiToUiModel(response.data.data);
};

export const toggleAIModelStatus = async (id: string): Promise<UIAIModel> => {
  const response = await apiClient.put(`/models/${id}/toggle-status`);
  return mapApiToUiModel(response.data.data);
};
