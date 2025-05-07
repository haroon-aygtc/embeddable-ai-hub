
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Sliders } from "lucide-react";
import { AIModel } from "./types/aiTypes";

interface AIAdvancedConfigProps {
  models: AIModel[];
}

export const AIAdvancedConfig = ({ models }: AIAdvancedConfigProps) => {
  return (
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
  );
};
