
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, Plus, Zap } from "lucide-react";
import { AIModel } from "./types/aiTypes";
import { AIModelCard } from "./AIModelCard";

interface AIModelListProps {
  models: AIModel[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddNewModel: () => void;
  onConfigure: (modelId: string) => void;
  onDelete: (modelId: string) => void;
  onDuplicate: (modelId: string) => void;
  onToggleDefault: (modelId: string) => void;
  onToggleStatus: (modelId: string) => void;
}

export const AIModelList = ({ 
  models,
  searchQuery,
  onSearchChange,
  onAddNewModel,
  onConfigure,
  onDelete,
  onDuplicate,
  onToggleDefault,
  onToggleStatus
}: AIModelListProps) => {
  return (
    <>
      {models.length === 0 ? (
        <div className="text-center p-8 border rounded-lg bg-background">
          <Brain className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No AI models found</h3>
          <p className="mt-2 text-muted-foreground">
            {searchQuery 
              ? "Try adjusting your search query"
              : "Get started by adding your first AI model."}
          </p>
          <Button 
            className="mt-4"
            onClick={onAddNewModel}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Model
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map(model => (
            <AIModelCard
              key={model.id}
              model={model}
              onConfigure={onConfigure}
              onDelete={onDelete}
              onDuplicate={onDuplicate}
              onToggleDefault={onToggleDefault}
              onToggleStatus={onToggleStatus}
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
            <Button onClick={onAddNewModel}>
              <Plus className="mr-2 h-4 w-4" />
              Add Model
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
