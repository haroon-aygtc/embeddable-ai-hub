
import { useState } from "react";
import { Brain, Settings2, Trash, Copy, Zap, Play, Activity } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AIModel, AIModelTestResult } from "./types/aiTypes";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface ModelCardProps {
  model: AIModel;
  onConfigure: (modelId: string) => void;
  onDelete: (modelId: string) => void;
  onDuplicate: (modelId: string) => void;
  onToggleDefault: (modelId: string) => void;
  onToggleStatus: (modelId: string) => void;
}

export const AIModelCard = ({
  model,
  onConfigure,
  onDelete,
  onDuplicate,
  onToggleDefault,
  onToggleStatus,
}: ModelCardProps) => {
  const [showTestDialog, setShowTestDialog] = useState(false);
  const [testPrompt, setTestPrompt] = useState("Explain what this AI model can do in one paragraph.");
  const [testResult, setTestResult] = useState<AIModelTestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTest = async () => {
    if (!testPrompt.trim()) {
      toast.error("Please enter a test prompt");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate test API call
      await new Promise(r => setTimeout(r, 1500));
      
      const result: AIModelTestResult = {
        responseText: `This is a simulated response from the ${model.name} model. In a real implementation, this would call the actual model API using the configured parameters.`,
        duration: 1243, // milliseconds
        tokenCount: 37,
        success: true
      };
      
      setTestResult(result);
      toast.success("Test completed successfully");
    } catch (error) {
      setTestResult({
        responseText: "",
        duration: 0,
        tokenCount: 0,
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      });
      toast.error("Test failed");
    } finally {
      setIsLoading(false);
    }
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'inactive':
        return 'outline';
      case 'testing':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <CardTitle>{model.name}</CardTitle>
            </div>
            <div className="flex gap-1">
              {model.isDefault && (
                <Badge variant="secondary" className="mr-1">
                  Default
                </Badge>
              )}
              <Badge variant={getBadgeVariant(model.status)}>
                {model.status.charAt(0).toUpperCase() + model.status.slice(1)}
              </Badge>
            </div>
          </div>
          <CardDescription>{model.provider}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">{model.description}</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
            <div className="text-muted-foreground">Type:</div>
            <div>{model.modelType.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</div>
            
            {model.temperature !== undefined && (
              <>
                <div className="text-muted-foreground">Temperature:</div>
                <div>{model.temperature}</div>
              </>
            )}
            
            {model.maxTokens !== undefined && (
              <>
                <div className="text-muted-foreground">Max Tokens:</div>
                <div>{model.maxTokens.toLocaleString()}</div>
              </>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {model.capabilities.map((capability) => (
              <Badge key={capability} variant="secondary">
                {capability}
              </Badge>
            ))}
          </div>
          
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowTestDialog(true)}
              className="gap-1"
            >
              <Play className="h-3.5 w-3.5" />
              Test
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onConfigure(model.id)}
              className="gap-1"
            >
              <Settings2 className="h-3.5 w-3.5" />
              Configure
            </Button>
          </div>
          
          <div className="flex justify-between pt-2 border-t">
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onToggleStatus(model.id)}
              >
                {model.status === "active" ? "Disable" : "Enable"}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onToggleDefault(model.id)}
                disabled={model.isDefault}
              >
                {model.isDefault ? "Default" : "Set Default"}
              </Button>
            </div>
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onDuplicate(model.id)}
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onDelete(model.id)}
                disabled={model.isDefault}
              >
                <Trash className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showTestDialog} onOpenChange={setShowTestDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Test {model.name}</DialogTitle>
            <DialogDescription>
              Send a test prompt to see how this model responds
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium">Test Prompt</label>
              <Textarea
                value={testPrompt}
                onChange={(e) => setTestPrompt(e.target.value)}
                placeholder="Enter a prompt to test the model..."
                rows={3}
              />
            </div>
            
            {testResult && (
              <div className="space-y-4 pt-2">
                <div>
                  <label className="text-sm font-medium flex items-center gap-2">
                    Response 
                    {testResult.success ? (
                      <Badge variant="default" className="bg-green-500">Success</Badge>
                    ) : (
                      <Badge variant="destructive">Failed</Badge>
                    )}
                  </label>
                  <div className="mt-2 p-4 bg-muted/50 rounded-md text-sm">
                    {testResult.success ? (
                      testResult.responseText
                    ) : (
                      <span className="text-red-500">{testResult.error}</span>
                    )}
                  </div>
                </div>
                
                {testResult.success && (
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                      <span>{testResult.duration}ms response time</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="h-4 w-4 text-muted-foreground" />
                      <span>{testResult.tokenCount} tokens used</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowTestDialog(false)}
            >
              Close
            </Button>
            <Button 
              onClick={handleTest}
              disabled={isLoading || !testPrompt.trim()}
            >
              {isLoading ? "Testing..." : "Run Test"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
