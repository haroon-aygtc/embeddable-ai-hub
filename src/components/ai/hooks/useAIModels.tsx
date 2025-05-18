
import { useState } from "react";
import { toast } from "sonner";
import { AIModel, AIModelFormValues, AIModelType, AIModelStatus } from "../types/aiTypes";
import { defaultModels } from "../utils/aiModelDefaults";

export const useAIModels = () => {
  const [models, setModels] = useState<AIModel[]>(defaultModels);
  const [editingModel, setEditingModel] = useState<AIModel | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
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
      const updatedModels = models.map(model => 
        model.id === editingModel.id 
          ? { 
              ...model, 
              ...data,
              // Ensure correct type casting
              modelType: data.modelType as AIModelType,
              status: data.status as AIModelStatus,
              updatedAt: new Date()
            } 
          : model
      );
      
      // If setting this model as default, unset others
      if (data.isDefault) {
        for (let i = 0; i < updatedModels.length; i++) {
          if (updatedModels[i].id !== editingModel.id) {
            updatedModels[i].isDefault = false;
          }
        }
      }
      
      setModels(updatedModels);
      toast.success(`Model "${data.name}" updated successfully`);
    } else {
      // Create new model
      const newModel: AIModel = {
        id: Date.now().toString(),
        ...data,
        // Ensure correct type casting 
        modelType: data.modelType as AIModelType,
        status: (data.status || "inactive") as AIModelStatus,
        isDefault: data.isDefault || false,
        capabilities: data.capabilities,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      // If setting this model as default, unset others
      let updatedModels = [...models];
      if (newModel.isDefault) {
        updatedModels = updatedModels.map(model => ({
          ...model,
          isDefault: false
        }));
      }
      
      setModels([...updatedModels, newModel]);
      toast.success(`Model "${data.name}" added successfully`);
    }
    
    setEditingModel(null);
  };

  const handleDelete = (modelId: string) => {
    const modelToDelete = models.find(model => model.id === modelId);
    if (modelToDelete?.isDefault) {
      toast.error("Cannot delete the default model. Set another model as default first.");
      return;
    }
    
    setModels(models.filter(model => model.id !== modelId));
    toast.success("Model deleted successfully");
  };

  const handleDuplicate = (modelId: string) => {
    const modelToDuplicate = models.find(model => model.id === modelId);
    if (!modelToDuplicate) return;
    
    const newModel: AIModel = {
      ...modelToDuplicate,
      id: Date.now().toString(),
      name: `${modelToDuplicate.name} (Copy)`,
      isDefault: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setModels([...models, newModel]);
    toast.success("Model duplicated successfully");
  };

  const handleToggleDefault = (modelId: string) => {
    const updatedModels = models.map(model => ({
      ...model,
      isDefault: model.id === modelId
    }));
    
    setModels(updatedModels);
    toast.success("Default model updated");
  };

  const handleToggleStatus = (modelId: string) => {
    const updatedModels = models.map(model => 
      model.id === modelId 
        ? { 
            ...model, 
            // Fix the type error by properly casting to AIModelStatus
            status: model.status === 'active' ? ('inactive' as AIModelStatus) : ('active' as AIModelStatus)
          } 
        : model
    );
    
    setModels(updatedModels);
    
    const modelStatus = updatedModels.find(m => m.id === modelId)?.status;
    toast.success(`Model ${modelStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
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
