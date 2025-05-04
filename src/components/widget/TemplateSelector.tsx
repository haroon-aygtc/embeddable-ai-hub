
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface TemplateOption {
  id: string;
  name: string;
  color: string;
  primaryColor: string;
  secondaryColor: string;
}

interface TemplateSelectorProps {
  templates: TemplateOption[];
  onSelect: (template: TemplateOption) => void;
}

const TemplateSelector = ({ templates, onSelect }: TemplateSelectorProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {templates.map((template) => (
        <Button
          key={template.id}
          variant="outline"
          onClick={() => onSelect(template)}
          className={cn(
            "flex flex-col items-center p-4 h-auto transition-all hover:scale-105 hover:shadow-md",
            "border-2 hover:border-primary"
          )}
        >
          <div
            className="h-12 w-12 rounded-full mb-3 shadow-inner"
            style={{ 
              background: `linear-gradient(135deg, ${template.primaryColor}, ${template.secondaryColor})` 
            }}
          ></div>
          <span className="text-sm font-medium">{template.name}</span>
        </Button>
      ))}
    </div>
  );
};

export default TemplateSelector;
