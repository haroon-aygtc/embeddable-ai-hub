
/**
 * Mock API service for AI models
 */

import { AIModel, AIModelFormValues, AIModelStatus, AIModelType } from "@/components/ai/types/aiTypes";

// Mock data for AI models
const mockModels: AIModel[] = [
  {
    id: "1",
    name: "GPT-4",
    provider: "OpenAI",
    description: "Advanced language model with strong reasoning capabilities",
    apiKey: "",
    baseUrl: "https://api.openai.com/v1/chat/completions",
    modelType: "chat" as AIModelType,
    maxTokens: 8000,
    temperature: 0.7,
    isDefault: true,
    status: "active" as AIModelStatus,
    capabilities: ["chat", "completion", "summarization"],
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-05-20"),
  },
  {
    id: "2",
    name: "Claude 2",
    provider: "Anthropic",
    description: "Helpful, harmless, and honest AI assistant",
    apiKey: "",
    baseUrl: "https://api.anthropic.com/v1/messages",
    modelType: "chat" as AIModelType,
    maxTokens: 100000,
    temperature: 0.5,
    isDefault: false,
    status: "active" as AIModelStatus,
    capabilities: ["chat", "completion", "summarization"],
    createdAt: new Date("2023-03-10"),
    updatedAt: new Date("2023-06-15"),
  },
  {
    id: "3",
    name: "Llama 2",
    provider: "Meta",
    description: "Open source large language model",
    apiKey: "",
    baseUrl: "https://api.example.com/llama",
    modelType: "chat" as AIModelType,
    maxTokens: 4000,
    temperature: 0.8,
    isDefault: false,
    status: "active" as AIModelStatus,
    capabilities: ["chat", "completion"],
    createdAt: new Date("2023-07-18"),
    updatedAt: new Date("2023-07-20"),
  },
  {
    id: "4",
    name: "Mistral 7B",
    provider: "Mistral AI",
    description: "Efficient language model with good performance",
    apiKey: "",
    baseUrl: "https://api.mistral.ai/v1",
    modelType: "completion" as AIModelType,
    maxTokens: 8000,
    temperature: 0.6,
    isDefault: false,
    status: "inactive" as AIModelStatus,
    capabilities: ["completion"],
    createdAt: new Date("2023-09-15"),
    updatedAt: new Date("2023-09-18"),
  },
];

/**
 * Get all AI models
 */
export const getModels = async (): Promise<AIModel[]> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulated delay
  return [...mockModels];
};

/**
 * Get a specific AI model by ID
 */
export const getModelById = async (id: string): Promise<AIModel | null> => {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulated delay
  return mockModels.find(model => model.id === id) || null;
};

/**
 * Create a new AI model
 */
export const createModel = async (modelData: AIModelFormValues & { capabilities: string[] }): Promise<AIModel> => {
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulated delay
  
  const newModel: AIModel = {
    id: Date.now().toString(),
    ...modelData,
    status: modelData.status as AIModelStatus || "testing",
    modelType: modelData.modelType as AIModelType,
    isDefault: modelData.isDefault || false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  // In a real implementation, we'd add this to the database
  // mockModels.push(newModel);
  
  return newModel;
};

/**
 * Update an existing AI model
 */
export const updateModel = async (id: string, modelData: Partial<AIModelFormValues & { capabilities: string[] }>): Promise<AIModel> => {
  await new Promise(resolve => setTimeout(resolve, 700)); // Simulated delay
  
  const modelIndex = mockModels.findIndex(model => model.id === id);
  if (modelIndex === -1) {
    throw new Error(`Model with ID ${id} not found`);
  }
  
  const updatedModel: AIModel = {
    ...mockModels[modelIndex],
    ...modelData,
    status: (modelData.status as AIModelStatus) || mockModels[modelIndex].status,
    modelType: (modelData.modelType as AIModelType) || mockModels[modelIndex].modelType,
    updatedAt: new Date(),
  };
  
  // In a real implementation, we'd update the database
  // mockModels[modelIndex] = updatedModel;
  
  return updatedModel;
};

/**
 * Delete an AI model
 */
export const deleteModel = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulated delay
  
  const modelIndex = mockModels.findIndex(model => model.id === id);
  if (modelIndex === -1) {
    throw new Error(`Model with ID ${id} not found`);
  }
  
  // In a real implementation, we'd remove from the database
  // mockModels.splice(modelIndex, 1);
};

/**
 * Toggle model default status
 */
export const toggleModelDefault = async (id: string): Promise<AIModel> => {
  await new Promise(resolve => setTimeout(resolve, 400)); // Simulated delay
  
  const modelIndex = mockModels.findIndex(model => model.id === id);
  if (modelIndex === -1) {
    throw new Error(`Model with ID ${id} not found`);
  }
  
  const updatedModel = {
    ...mockModels[modelIndex],
    isDefault: !mockModels[modelIndex].isDefault,
    updatedAt: new Date()
  };
  
  // In a real implementation, we'd update the database and handle setting other models to non-default
  
  return updatedModel;
};

/**
 * Toggle model status (active/inactive)
 */
export const toggleModelStatus = async (id: string): Promise<AIModel> => {
  await new Promise(resolve => setTimeout(resolve, 400)); // Simulated delay
  
  const modelIndex = mockModels.findIndex(model => model.id === id);
  if (modelIndex === -1) {
    throw new Error(`Model with ID ${id} not found`);
  }
  
  const currentStatus = mockModels[modelIndex].status;
  const newStatus: AIModelStatus = currentStatus === "active" ? "inactive" : "active";
  
  const updatedModel = {
    ...mockModels[modelIndex],
    status: newStatus,
    updatedAt: new Date()
  };
  
  // In a real implementation, we'd update the database
  
  return updatedModel;
};
