
import { AIModel, AIModelStatus } from "../types/aiTypes";

export const defaultModels: AIModel[] = [
  {
    id: "1",
    name: "Gemini Pro",
    provider: "Google",
    description: "High-performance general-purpose model with excellent reasoning capabilities.",
    status: "active",
    isDefault: true,
    modelType: "text-generation",
    maxTokens: 4000,
    temperature: 0.7,
    capabilities: ["Text Generation", "Reasoning", "RAG Ready"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    name: "Hugging Face Chat",
    provider: "Hugging Face",
    description: "Open-source model optimized for conversational AI and knowledge retrieval.",
    status: "active",
    isDefault: false,
    modelType: "text-generation",
    maxTokens: 2048,
    temperature: 0.8,
    capabilities: ["Chat", "Knowledge Base", "Embeddings"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    name: "Grok-1",
    provider: "xAI",
    description: "Advanced model with specialized data analysis and pattern recognition capabilities.",
    status: "active",
    isDefault: false,
    modelType: "text-generation",
    maxTokens: 8192,
    temperature: 0.5,
    capabilities: ["Data Analysis", "Logic", "Creative Writing"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "4",
    name: "Falcon-40B",
    provider: "TII",
    description: "Large language model with strong general capabilities and multilingual support.",
    status: "inactive",
    isDefault: false,
    modelType: "text-generation",
    maxTokens: 2048,
    temperature: 0.7,
    capabilities: ["Multilingual", "Code Generation", "Long Context"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "5",
    name: "Custom Embedding Model",
    provider: "Internal",
    description: "Fine-tuned embedding model specialized for your knowledge domain.",
    status: "active",
    isDefault: false,
    modelType: "embedding",
    capabilities: ["Embeddings", "Semantic Search", "Custom Trained"],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const getDefaultModelFormValues = () => ({
  name: "",
  provider: "",
  description: "",
  apiKey: "",
  baseUrl: "",
  modelType: "text-generation",
  temperature: 0.7,
  maxTokens: 1000,
  isDefault: false,
  status: "inactive" as AIModelStatus,
  capabilities: []
});

export const providerOptions = [
  { label: "OpenAI", value: "OpenAI" },
  { label: "Google AI", value: "Google" },
  { label: "Anthropic", value: "Anthropic" },
  { label: "Meta AI", value: "Meta" },
  { label: "Hugging Face", value: "Hugging Face" },
  { label: "Perplexity", value: "Perplexity" },
  { label: "Mistral AI", value: "Mistral AI" },
  { label: "Custom/Other", value: "Custom" }
];

export const modelTypeOptions = [
  { label: "Text Generation", value: "text-generation" },
  { label: "Embedding", value: "embedding" },
  { label: "Image Generation", value: "image-generation" },
  { label: "Text to Speech", value: "text-to-speech" },
  { label: "Speech to Text", value: "speech-to-text" }
];

export const capabilityOptions = [
  "Text Generation",
  "Reasoning",
  "RAG Ready",
  "Chat",
  "Knowledge Base",
  "Embeddings",
  "Data Analysis",
  "Logic",
  "Creative Writing",
  "Multilingual",
  "Code Generation",
  "Long Context",
  "Semantic Search", 
  "Custom Trained",
  "Image Understanding",
  "Voice Generation"
];
