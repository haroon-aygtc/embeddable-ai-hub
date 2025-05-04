
import React from "react";
import { Button } from "@/components/ui/button";

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
    <div className="flex flex-wrap gap-3">
      {templates.map((template) => (
        <Button
          key={template.id}
          variant="outline"
          onClick={() => onSelect(template)}
          className="flex flex-col items-center p-4 h-auto"
        >
          <div
            className="h-8 w-8 rounded-full mb-2"
            style={{ backgroundColor: template.color }}
          ></div>
          <span>{template.name}</span>
        </Button>
      ))}
    </div>
  );
};

export default TemplateSelector;
