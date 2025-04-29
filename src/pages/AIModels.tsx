
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Brain, Plus, Zap, Settings2, Sliders } from "lucide-react";

const modelFormSchema = z.object({
  name: z.string().min(2, { message: "Model name is required" }),
  provider: z.string().min(2, { message: "Provider name is required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  apiKey: z.string().optional(),
  baseUrl: z.string().optional(),
  maxTokens: z.coerce.number().int().positive().optional(),
  temperature: z.coerce.number().min(0).max(1).optional(),
  modelType: z.string(),
});

type ModelFormValues = z.infer<typeof modelFormSchema>;

const defaultValues: Partial<ModelFormValues> = {
  modelType: "text-generation",
  temperature: 0.7,
  maxTokens: 1000,
};

interface ModelCardProps { 
  name: string;
  provider: string;
  status: "active" | "inactive";
  description: string;
  capabilities: string[];
  onConfigure: () => void;
}

const ModelCard = ({ 
  name, 
  provider, 
  status, 
  description, 
  capabilities,
  onConfigure
}: ModelCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <CardTitle>{name}</CardTitle>
          </div>
          <Badge variant={status === "active" ? "default" : "outline"}>
            {status === "active" ? "Active" : "Inactive"}
          </Badge>
        </div>
        <CardDescription>{provider}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">{description}</p>
        <div className="flex flex-wrap gap-2">
          {capabilities.map((capability) => (
            <Badge key={capability} variant="secondary">
              {capability}
            </Badge>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={onConfigure}>
            <Settings2 className="mr-2 h-4 w-4" />
            Configure
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const AIModels = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [openConfigDialog, setOpenConfigDialog] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  
  const form = useForm<ModelFormValues>({
    resolver: zodResolver(modelFormSchema),
    defaultValues,
  });

  const handleAddModel = (data: ModelFormValues) => {
    console.log("Form submitted:", data);
    toast.success("AI model added successfully!");
    setOpenConfigDialog(false);
    form.reset();
  };

  const handleConfigureModel = (modelName: string) => {
    setSelectedModel(modelName);
    // In a real app, we would fetch the model config here
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
      
      <div className="flex justify-between items-center">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
          <TabsList>
            <TabsTrigger value="all">All Models</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Dialog open={openConfigDialog} onOpenChange={setOpenConfigDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Model
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedModel ? `Configure ${selectedModel}` : "Add New AI Model"}</DialogTitle>
              <DialogDescription>
                {selectedModel 
                  ? "Adjust the settings for this AI model to optimize its performance."
                  : "Add a new AI model to your system by providing the required information."}
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddModel)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., GPT-4, Gemini Pro" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="provider"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Provider</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., OpenAI, Google" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the model's capabilities and use cases" 
                          className="h-24"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="modelType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select model type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="text-generation">Text Generation</SelectItem>
                          <SelectItem value="embedding">Embedding</SelectItem>
                          <SelectItem value="image-generation">Image Generation</SelectItem>
                          <SelectItem value="text-to-speech">Text to Speech</SelectItem>
                          <SelectItem value="speech-to-text">Speech to Text</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="apiKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>API Key</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter your API key" {...field} />
                        </FormControl>
                        <FormDescription>
                          This will be stored securely.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="baseUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Base URL (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://api.example.com" {...field} />
                        </FormControl>
                        <FormDescription>
                          For custom endpoints or self-hosted models.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="temperature"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Temperature (0-1)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.1" 
                            min="0" 
                            max="1" 
                            placeholder="0.7" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Lower values are more deterministic, higher values more creative.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="maxTokens"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Tokens</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="1"
                            placeholder="1000" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Maximum number of tokens to generate.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <DialogFooter className="pt-4">
                  <Button variant="outline" type="button" onClick={() => setOpenConfigDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {selectedModel ? "Save Changes" : "Add Model"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ModelCard
          name="Gemini Pro"
          provider="Google AI"
          status="active"
          description="High-performance general-purpose model with excellent reasoning capabilities."
          capabilities={["Text Generation", "Reasoning", "RAG Ready"]}
          onConfigure={() => handleConfigureModel("Gemini Pro")}
        />
        
        <ModelCard
          name="Hugging Face Chat"
          provider="Hugging Face"
          status="active"
          description="Open-source model optimized for conversational AI and knowledge retrieval."
          capabilities={["Chat", "Knowledge Base", "Embeddings"]}
          onConfigure={() => handleConfigureModel("Hugging Face Chat")}
        />
        
        <ModelCard
          name="Grok-1"
          provider="xAI"
          status="active"
          description="Advanced model with specialized data analysis and pattern recognition capabilities."
          capabilities={["Data Analysis", "Logic", "Creative Writing"]}
          onConfigure={() => handleConfigureModel("Grok-1")}
        />
        
        <ModelCard
          name="Falcon-40B"
          provider="TII"
          status="inactive"
          description="Large language model with strong general capabilities and multilingual support."
          capabilities={["Multilingual", "Code Generation", "Long Context"]}
          onConfigure={() => handleConfigureModel("Falcon-40B")}
        />
        
        <ModelCard
          name="Custom Embedding Model"
          provider="Internal"
          status="active"
          description="Fine-tuned embedding model specialized for your knowledge domain."
          capabilities={["Embeddings", "Semantic Search", "Custom Trained"]}
          onConfigure={() => handleConfigureModel("Custom Embedding Model")}
        />
        
        <div className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6 text-center h-full">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-1">Add New AI Model</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Connect additional AI models to enhance your chat capabilities
          </p>
          <Button onClick={() => setOpenConfigDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Model
          </Button>
        </div>
      </div>
      
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
                  <Select defaultValue="gemini-pro">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                      <SelectItem value="huggingface-chat">Hugging Face Chat</SelectItem>
                      <SelectItem value="grok-1">Grok-1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="border rounded-md p-4 space-y-2">
                  <Label>Fallback Model</Label>
                  <Select defaultValue="huggingface-chat">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a fallback model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                      <SelectItem value="huggingface-chat">Hugging Face Chat</SelectItem>
                      <SelectItem value="grok-1">Grok-1</SelectItem>
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
                <Button>
                  <Sliders className="mr-2 h-4 w-4" />
                  Save Configuration
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIModels;
