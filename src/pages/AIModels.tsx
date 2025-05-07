
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Brain, Plus, Zap, Settings2, Sliders } from "lucide-react";
import { AIModel, AIModelFormValues } from "@/components/ai/types/aiTypes";
import { defaultModels } from "@/components/ai/utils/aiModelDefaults";
import { AIModelCard } from "@/components/ai/AIModelCard";
import { AIModelForm } from "@/components/ai/AIModelForm";

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
        status: data.status || "inactive",
        isDefault: data.isDefault || false,
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
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI Models</h2>
        <p className="text-muted-foreground">
          Configure and manage AI models used in your chat system.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="all">All Models</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <Input 
            placeholder="Search models..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-auto max-w-[300px]"
          />
          <Button onClick={() => {
            setEditingModel(null);
            setOpenConfigDialog(true);
          }}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Model
          </Button>
        </div>
      </div>
      
      {filteredModels.length === 0 ? (
        <div className="text-center p-8 border rounded-lg bg-background">
          <Brain className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No AI models found</h3>
          <p className="mt-2 text-muted-foreground">
            {searchQuery 
              ? "Try adjusting your search query"
              : activeTab !== "all"
                ? `No ${activeTab} models found. Try switching tabs or add a new model.`
                : "Get started by adding your first AI model."}
          </p>
          <Button 
            className="mt-4"
            onClick={() => {
              setEditingModel(null);
              setOpenConfigDialog(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Model
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map(model => (
            <AIModelCard
              key={model.id}
              model={model}
              onConfigure={handleConfigure}
              onDelete={handleDelete}
              onDuplicate={handleDuplicate}
              onToggleDefault={handleToggleDefault}
              onToggleStatus={handleToggleStatus}
            />
          ))}
          
          <div className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6 text-center h-full">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-1">Add New AI Model</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Connect additional AI models to enhance your chat capabilities
            </p>
            <Button onClick={() => {
              setEditingModel(null);
              setOpenConfigDialog(true);
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Add Model
            </Button>
          </div>
        </div>
      )}
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">AI Model Configuration</h3>
        <Card>
          <CardHeader>
            <CardTitle>Advanced Configuration</CardTitle>
            <CardDescription>
              Fine-tune how AI models are used in your chat system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Model Routing</h4>
                <div className="border rounded-md p-4 space-y-2">
                  <Label>Default AI Model</Label>
                  <Select defaultValue={models.find(m => m.isDefault)?.id || ""}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      {models.filter(m => m.status === 'active').map(model => (
                        <SelectItem key={model.id} value={model.id}>{model.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="border rounded-md p-4 space-y-2">
                  <Label>Fallback Model</Label>
                  <Select defaultValue="">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a fallback model" />
                    </SelectTrigger>
                    <SelectContent>
                      {models.filter(m => m.status === 'active' && !m.isDefault).map(model => (
                        <SelectItem key={model.id} value={model.id}>{model.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Response Enhancement</h4>
                <div className="border rounded-md p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Format responses with headings and bullet points</Label>
                    <Input type="checkbox" className="w-4 h-4" defaultChecked />
                  </div>
                </div>
                
                <div className="border rounded-md p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Add follow-up suggestions after responses</Label>
                    <Input type="checkbox" className="w-4 h-4" defaultChecked />
                  </div>
                </div>
                
                <div className="border rounded-md p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Apply brand personality to responses</Label>
                    <Input type="checkbox" className="w-4 h-4" defaultChecked />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">System Prompt</h4>
              <Textarea 
                className="min-h-[150px]"
                placeholder="Enter a system prompt that will guide the AI's behavior and responses"
                defaultValue="You are a helpful assistant for our company. Respond in a friendly, professional manner. Always be concise and helpful. If you don't know something, just say you don't know instead of making up information."
              />
              
              <div className="flex justify-end">
                <Button onClick={() => toast.success("Configuration saved successfully")}>
                  <Sliders className="mr-2 h-4 w-4" />
                  Save Configuration
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
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
