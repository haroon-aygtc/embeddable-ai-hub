
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  fetchAIModels, 
  createAIModel, 
  updateAIModel, 
  deleteAIModel,
  toggleAIModelDefault,
  toggleAIModelStatus
} from "@/api/ai-models";
import { AIModel, AIModelFormValues } from "@/components/ai/types/aiTypes";

export const useAIModels = () => {
  const [editingModel, setEditingModel] = useState<AIModel | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const queryClient = useQueryClient();
  
  // Fetch AI models
  const { data: models = [], isLoading, error } = useQuery({
    queryKey: ['aiModels'],
    queryFn: fetchAIModels
  });
  
  // Create AI model mutation
  const createMutation = useMutation({
    mutationFn: (payload: AIModelFormValues & { capabilities: string[] }) => createAIModel(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aiModels'] });
      toast.success("AI model created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create AI model");
      console.error(error);
    }
  });
  
  // Update AI model mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string, payload: Partial<AIModelFormValues & { capabilities: string[] }> }) => 
      updateAIModel(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aiModels'] });
      toast.success("AI model updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update AI model");
      console.error(error);
    }
  });
  
  // Delete AI model mutation
  const deleteMutation = useMutation({
    mutationFn: deleteAIModel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aiModels'] });
      toast.success("AI model deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete AI model");
      console.error(error);
    }
  });
  
  // Toggle default status mutation
  const toggleDefaultMutation = useMutation({
    mutationFn: toggleAIModelDefault,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aiModels'] });
      toast.success("Default AI model updated");
    },
    onError: (error) => {
      toast.error("Failed to update default status");
      console.error(error);
    }
  });
  
  // Toggle active status mutation
  const toggleStatusMutation = useMutation({
    mutationFn: toggleAIModelStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aiModels'] });
      toast.success("AI model status updated");
    },
    onError: (error) => {
      toast.error("Failed to update model status");
      console.error(error);
    }
  });
  
  // Filter models based on the active tab and search query
  const filteredModels = models.filter(model => {
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "active" && model.status === "active") ||
      (activeTab === "inactive" && model.status === "inactive");
      
    const matchesSearch = 
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    return matchesTab && matchesSearch;
  });
  
  const handleAddModel = (data: AIModelFormValues & { capabilities: string[] }) => {
    if (editingModel) {
      // Update existing model
      updateMutation.mutate({ id: editingModel.id, payload: data });
    } else {
      // Create new model
      createMutation.mutate(data);
    }
    
    setEditingModel(null);
  };

  const handleDelete = (modelId: string) => {
    deleteMutation.mutate(modelId);
  };

  const handleDuplicate = (modelId: string) => {
    const modelToDuplicate = models.find(model => model.id === modelId);
    if (!modelToDuplicate) return;
    
    const newModelData: AIModelFormValues & { capabilities: string[] } = {
      name: `${modelToDuplicate.name} (Copy)`,
      provider: modelToDuplicate.provider,
      description: modelToDuplicate.description,
      apiKey: modelToDuplicate.apiKey,
      baseUrl: modelToDuplicate.baseUrl,
      modelType: modelToDuplicate.modelType,
      maxTokens: modelToDuplicate.maxTokens,
      temperature: modelToDuplicate.temperature,
      status: 'testing',
      capabilities: [...modelToDuplicate.capabilities]
    };
    
    createMutation.mutate(newModelData);
  };

  const handleToggleDefault = (modelId: string) => {
    toggleDefaultMutation.mutate(modelId);
  };

  const handleToggleStatus = (modelId: string) => {
    toggleStatusMutation.mutate(modelId);
  };
  
  const handleConfigure = (modelId: string) => {
    const modelToEdit = models.find(model => model.id === modelId);
    if (modelToEdit) {
      setEditingModel(modelToEdit);
    }
  };

  return {
    models,
    filteredModels,
    isLoading,
    error,
    editingModel,
    setEditingModel,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    handleAddModel,
    handleDelete,
    handleDuplicate,
    handleToggleDefault,
    handleToggleStatus,
    handleConfigure
  };
};
