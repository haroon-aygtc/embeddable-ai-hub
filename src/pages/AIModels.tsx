
import { useState } from "react";
import { AIModelList } from "@/components/ai/AIModelList";
import { AIModelListHeader } from "@/components/ai/AIModelListHeader";
import { AIAdvancedConfig } from "@/components/ai/AIAdvancedConfig";
import { AIModelDialog } from "@/components/ai/AIModelDialog";
import { useAIModels } from "@/components/ai/hooks/useAIModels";
import { AIModelPromptTemplates } from "@/components/ai/AIModelPromptTemplates";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Brain, FileText, Settings, BarChart3, Zap } from "lucide-react";
import { AIModelAnalytics } from "@/components/ai/AIModelAnalytics";
import { AIModelBulkActions } from "@/components/ai/AIModelBulkActions";

const AIModels = () => {
  const [openConfigDialog, setOpenConfigDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
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
    <div className="space-y-6 p-6">
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-xl border">
        <h2 className="text-3xl font-bold tracking-tight mb-2">AI Model Management</h2>
        <p className="text-muted-foreground">
          Configure, manage, and monitor your AI models with our intuitive interface designed for everyone.
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-muted/30">
          <TabsTrigger value="overview" className="gap-2">
            <Brain className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="models" className="gap-2">
            <Zap className="h-4 w-4" />
            Models
          </TabsTrigger>
          <TabsTrigger value="templates" className="gap-2">
            <FileText className="h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="h-4 w-4" />
            Advanced
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-lg p-6 border shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Total Models</h3>
                  <p className="text-2xl font-bold text-primary">{models.length}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Active AI models in your system
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 border shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Active Models</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {models.filter(m => m.status === 'active').length}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Currently active and ready to use
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 border shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Settings className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Default Model</h3>
                  <p className="text-sm font-medium text-blue-600">
                    {models.find(m => m.isDefault)?.name || 'None set'}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Primary model for new conversations
              </p>
            </div>
          </div>
          
          <AIModelBulkActions 
            models={models}
            onBulkStatusChange={() => {}}
            onBulkDelete={() => {}}
          />
        </TabsContent>
        
        <TabsContent value="models" className="space-y-6">
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
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-6">
          <AIModelPromptTemplates />
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <AIModelAnalytics models={models} />
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6">
          <AIAdvancedConfig models={models} />
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
