import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { AIModelFormValues, AIModelStatus } from "./types/aiTypes";
import { providerOptions, modelTypeOptions, capabilityOptions, getDefaultModelFormValues } from "./utils/aiModelDefaults";
import { CheckIcon, PlusCircle, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Model name is required" }),
  provider: z.string().min(2, { message: "Provider name is required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  apiKey: z.string().optional(),
  baseUrl: z.string().optional(),
  maxTokens: z.coerce.number().int().positive().optional(),
  temperature: z.coerce.number().min(0).max(1).optional(),
  modelType: z.string(),
  isDefault: z.boolean().optional(),
  status: z.enum(["active", "inactive", "testing"]).optional()
});

interface AIModelFormProps {
  initialValues?: Partial<AIModelFormValues>;
  onSubmit: (data: AIModelFormValues & { capabilities: string[] }) => void;
  onCancel: () => void;
  isEditing: boolean;
}

export const AIModelForm = ({ 
  initialValues,
  onSubmit, 
  onCancel,
  isEditing
}: AIModelFormProps) => {
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>(
    initialValues?.capabilities || []
  );
  const [capabilityInput, setCapabilityInput] = useState("");

  const defaultValues = {
    ...getDefaultModelFormValues(),
    ...initialValues
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit({
      ...data,
      capabilities: selectedCapabilities
    });
  };

  const addCapability = () => {
    if (capabilityInput && !selectedCapabilities.includes(capabilityInput)) {
      setSelectedCapabilities([...selectedCapabilities, capabilityInput]);
      setCapabilityInput("");
    }
  };

  const removeCapability = (capability: string) => {
    setSelectedCapabilities(selectedCapabilities.filter(c => c !== capability));
  };

  const toggleCapability = (capability: string) => {
    if (selectedCapabilities.includes(capability)) {
      removeCapability(capability);
    } else {
      setSelectedCapabilities([...selectedCapabilities, capability]);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a provider" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {providerOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  {modelTypeOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
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

        <div className="space-y-4">
          <div>
            <FormLabel>Model Capabilities</FormLabel>
            <FormDescription className="mb-2">
              Select capabilities or add custom ones
            </FormDescription>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedCapabilities.map(capability => (
                <Badge 
                  key={capability} 
                  variant="secondary"
                  className="pl-2 pr-1 py-1 flex items-center gap-1"
                >
                  {capability}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0 ml-1"
                    onClick={() => removeCapability(capability)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input 
                value={capabilityInput}
                onChange={(e) => setCapabilityInput(e.target.value)}
                placeholder="Enter custom capability..." 
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCapability();
                  }
                }}
              />
              <Button 
                variant="outline" 
                type="button" 
                onClick={addCapability} 
                disabled={!capabilityInput}
              >
                <PlusCircle className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>
          
          <div>
            <FormLabel>Common Capabilities</FormLabel>
            <div className="flex flex-wrap gap-2 mt-2">
              {capabilityOptions.map(capability => (
                <Badge 
                  key={capability}
                  variant={selectedCapabilities.includes(capability) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleCapability(capability)}
                >
                  {selectedCapabilities.includes(capability) && (
                    <CheckIcon className="h-3 w-3 mr-1" />
                  )}
                  {capability}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Model Status</FormLabel>
                  <FormDescription>
                    Set as active to make available for use
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value === "active"}
                    onCheckedChange={(checked) => 
                      field.onChange(checked ? "active" : "inactive")
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="isDefault"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Default Model</FormLabel>
                  <FormDescription>
                    Set as default model for the system
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <DialogFooter className="pt-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? "Save Changes" : "Add Model"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
