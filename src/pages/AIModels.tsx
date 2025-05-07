
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { AIModel, AIModelFormValues } from "@/components/ai/types/aiTypes";
import { defaultModels } from "@/components/ai/utils/aiModelDefaults";
import { AIModelForm } from "@/components/ai/AIModelForm";
import { AIModelList } from "@/components/ai/AIModelList";
import { AIModelListHeader } from "@/components/ai/AIModelListHeader";
import { AIAdvancedConfig } from "@/components/ai/AIAdvancedConfig";

const AIModels = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [openConfigDialog, setOpenConfigDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [models, setModels] = useState<AIModel[]>(defaultModels);
  const [editingModel, setEditingModel] = useState<AIModel | null>(null);
  
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
        modelType: data.modelType as AIModel["modelType"],
        status: data.status || "inactive",
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
    
    setOpenConfigDialog(false);
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
            status: model.status === 'active' ? 'inactive' : 'active' 
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
      setOpenConfigDialog(true);
    }
  };

  const handleOpenAddDialog = () => {
    setEditingModel(null);
    setOpenConfigDialog(true);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI Models</h2>
        <p className="text-muted-foreground">
          Configure and manage AI models used in your chat system.
        </p>
      </div>
      
      <AIModelListHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddNewModel={handleOpenAddDialog}
      />
      
      <AIModelList
        models={filteredModels}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddNewModel={handleOpenAddDialog}
        onConfigure={handleConfigure}
        onDelete={handleDelete}
        onDuplicate={handleDuplicate}
        onToggleDefault={handleToggleDefault}
        onToggleStatus={handleToggleStatus}
      />
      
      <AIAdvancedConfig models={models} />
      
      <Dialog open={openConfigDialog} onOpenChange={setOpenConfigDialog}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingModel ? `Configure ${editingModel.name}` : "Add New AI Model"}</DialogTitle>
            <DialogDescription>
              {editingModel 
                ? "Adjust the settings for this AI model to optimize its performance."
                : "Add a new AI model to your system by providing the required information."}
            </DialogDescription>
          </DialogHeader>
          
          <AIModelForm
            initialValues={editingModel || undefined}
            onSubmit={handleAddModel}
            onCancel={() => setOpenConfigDialog(false)}
            isEditing={!!editingModel}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIModels;
