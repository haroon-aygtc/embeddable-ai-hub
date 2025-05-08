
import { useState } from "react";
import { FormLabel, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, PlusCircle, X } from "lucide-react";
import { capabilityOptions } from "../utils/aiModelDefaults";

interface AIModelCapabilitiesProps {
  selectedCapabilities: string[];
  setSelectedCapabilities: (capabilities: string[]) => void;
}

export const AIModelCapabilities = ({ 
  selectedCapabilities, 
  setSelectedCapabilities 
}: AIModelCapabilitiesProps) => {
  const [capabilityInput, setCapabilityInput] = useState("");

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
  );
};
