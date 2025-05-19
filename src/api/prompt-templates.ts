
import apiClient from './client';

export interface PromptTemplate {
  id: number;
  name: string;
  description: string;
  category: string;
  prompt_text: string;
  tags: string[];
  created_at?: string;
  updated_at?: string;
}

export interface CreatePromptTemplatePayload {
  name: string;
  description: string;
  category: string;
  promptText: string;
  tags?: string[];
}

export interface UpdatePromptTemplatePayload {
  name?: string;
  description?: string;
  category?: string;
  promptText?: string;
  tags?: string[];
}

export const fetchPromptTemplates = async (): Promise<PromptTemplate[]> => {
  const response = await apiClient.get('/prompt-templates');
  return response.data.data;
};

export const fetchPromptTemplate = async (id: number): Promise<PromptTemplate> => {
  const response = await apiClient.get(`/prompt-templates/${id}`);
  return response.data.data;
};

export const createPromptTemplate = async (payload: CreatePromptTemplatePayload): Promise<PromptTemplate> => {
  const response = await apiClient.post('/prompt-templates', payload);
  return response.data.data;
};

export const updatePromptTemplate = async (id: number, payload: UpdatePromptTemplatePayload): Promise<PromptTemplate> => {
  const response = await apiClient.put(`/prompt-templates/${id}`, payload);
  return response.data.data;
};

export const deletePromptTemplate = async (id: number): Promise<void> => {
  await apiClient.delete(`/prompt-templates/${id}`);
};

export const fetchPromptTemplatesByCategory = async (category: string): Promise<PromptTemplate[]> => {
  const response = await apiClient.get(`/prompt-templates/category/${category}`);
  return response.data.data;
};
