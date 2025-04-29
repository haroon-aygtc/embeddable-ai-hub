
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Plus, Zap, Settings2 } from "lucide-react";

const ModelCard = ({ 
  name, 
  provider, 
  status, 
  description, 
  capabilities 
}: {
  name: string;
  provider: string;
  status: "active" | "inactive";
  description: string;
  capabilities: string[];
}) => {
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
          <Button variant="outline" size="sm">
            <Settings2 className="mr-2 h-4 w-4" />
            Configure
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const AIModels = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI Models</h2>
        <p className="text-muted-foreground">
          Configure and manage AI models used in your chat system.
        </p>
      </div>
      
      <div className="flex justify-between items-center">
        <Tabs defaultValue="all" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="all">All Models</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Model
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ModelCard
          name="Gemini Pro"
          provider="Google AI"
          status="active"
          description="High-performance general-purpose model with excellent reasoning capabilities."
          capabilities={["Text Generation", "Reasoning", "RAG Ready"]}
        />
        
        <ModelCard
          name="Hugging Face Chat"
          provider="Hugging Face"
          status="active"
          description="Open-source model optimized for conversational AI and knowledge retrieval."
          capabilities={["Chat", "Knowledge Base", "Embeddings"]}
        />
        
        <ModelCard
          name="Grok-1"
          provider="xAI"
          status="active"
          description="Advanced model with specialized data analysis and pattern recognition capabilities."
          capabilities={["Data Analysis", "Logic", "Creative Writing"]}
        />
        
        <ModelCard
          name="Falcon-40B"
          provider="TII"
          status="inactive"
          description="Large language model with strong general capabilities and multilingual support."
          capabilities={["Multilingual", "Code Generation", "Long Context"]}
        />
        
        <ModelCard
          name="Custom Embedding Model"
          provider="Internal"
          status="active"
          description="Fine-tuned embedding model specialized for your knowledge domain."
          capabilities={["Embeddings", "Semantic Search", "Custom Trained"]}
        />
        
        <div className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6 text-center h-full">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-1">Add New AI Model</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Connect additional AI models to enhance your chat capabilities
          </p>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Model
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIModels;
