
import { useState } from "react";
import { AIModelList } from "@/components/ai/AIModelList";
import { AIModelListHeader } from "@/components/ai/AIModelListHeader";
import { AIAdvancedConfig } from "@/components/ai/AIAdvancedConfig";
import { AIModelDialog } from "@/components/ai/AIModelDialog";
import { useAIModels } from "@/components/ai/hooks/useAIModels";
import { AIModelPromptTemplates } from "@/components/ai/AIModelPromptTemplates";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Brain, FileText } from "lucide-react";

const AIModels = () => {
  const [openConfigDialog, setOpenConfigDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("models");
  const {
    models,
    filteredModels,
    editingModel,
    setEditingModel,
    searchQuery,
    setSearchQuery,
    activeTab: modelsTab,
    setActiveTab: setModelsTab,
    handleAddModel,
    handleDelete,
    handleDuplicate,
    handleToggleDefault,
    handleToggleStatus,
    handleConfigure
  } = useAIModels();
  
  const handleOpenAddDialog = () => {
    setEditingModel(null);
    setOpenConfigDialog(true);
  };

  const handleOpenConfigDialog = (modelId: string) => {
    handleConfigure(modelId);
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="models">
            <Brain className="mr-2 h-4 w-4" />
            Models
          </TabsTrigger>
          <TabsTrigger value="templates">
            <FileText className="mr-2 h-4 w-4" />
            Prompt Templates
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="models" className="mt-6 space-y-6">
          <AIModelListHeader
            activeTab={modelsTab}
            onTabChange={setModelsTab}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onAddNewModel={handleOpenAddDialog}
          />
          
          <AIModelList
            models={filteredModels}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onAddNewModel={handleOpenAddDialog}
            onConfigure={handleOpenConfigDialog}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
            onToggleDefault={handleToggleDefault}
            onToggleStatus={handleToggleStatus}
          />
          
          <AIAdvancedConfig models={models} />
        </TabsContent>
        
        <TabsContent value="templates" className="mt-6">
          <AIModelPromptTemplates />
        </TabsContent>
      </Tabs>
      
      <AIModelDialog
        open={openConfigDialog}
        onOpenChange={setOpenConfigDialog}
        editingModel={editingModel}
        onSubmit={handleAddModel}
      />
    </div>
  );
};

export default AIModels;
