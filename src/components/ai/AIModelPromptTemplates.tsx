
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { FileText, Plus, Tag, Edit, Trash, Copy } from "lucide-react";
import { PromptTemplate, fetchPromptTemplates, createPromptTemplate, updatePromptTemplate, deletePromptTemplate } from "@/api/prompt-templates";

export const AIModelPromptTemplates = () => {
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<PromptTemplate | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "AI Model",
    promptText: "",
    tags: ""
  });

  const queryClient = useQueryClient();
  
  const { data: templates = [], isLoading } = useQuery({
    queryKey: ['promptTemplates', 'aiModels'],
    queryFn: () => fetchPromptTemplates().then(templates => 
      templates.filter(t => t.category === 'AI Model')
    )
  });

  const createMutation = useMutation({
    mutationFn: createPromptTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['promptTemplates'] });
      toast.success("Prompt template created successfully");
      setShowTemplateDialog(false);
      resetForm();
    },
    onError: (error) => {
      toast.error("Failed to create template");
      console.error(error);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number, payload: any }) => 
      updatePromptTemplate(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['promptTemplates'] });
      toast.success("Prompt template updated successfully");
      setShowTemplateDialog(false);
      setEditingTemplate(null);
      resetForm();
    },
    onError: (error) => {
      toast.error("Failed to update template");
      console.error(error);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deletePromptTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['promptTemplates'] });
      toast.success("Prompt template deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete template");
      console.error(error);
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      promptText: formData.promptText,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };

    if (editingTemplate) {
      updateMutation.mutate({ id: editingTemplate.id, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleEdit = (template: PromptTemplate) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      description: template.description,
      category: template.category,
      promptText: template.prompt_text,
      tags: template.tags.join(', ')
    });
    setShowTemplateDialog(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this template?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleCopy = (template: PromptTemplate) => {
    navigator.clipboard.writeText(template.prompt_text);
    toast.success("Template copied to clipboard");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "AI Model",
      promptText: "",
      tags: ""
    });
  };

  const handleOpenDialog = () => {
    resetForm();
    setEditingTemplate(null);
    setShowTemplateDialog(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Prompt Templates</h3>
        <Button onClick={handleOpenDialog} size="sm">
          <Plus className="mr-2 h-4 w-4" /> New Template
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-4">
          <p>Loading templates...</p>
        </div>
      ) : templates.length === 0 ? (
        <Card className="bg-muted/50">
          <CardContent className="py-6 flex flex-col items-center text-center">
            <FileText className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="font-medium">No templates found</p>
            <p className="text-sm text-muted-foreground mb-4">
              Create templates to help standardize AI model prompts
            </p>
            <Button onClick={handleOpenDialog} variant="secondary" size="sm">
              <Plus className="mr-2 h-4 w-4" /> Create Template
            </Button>
          </CardContent>
        </Card>
      ) : (
        <ScrollArea className="h-[300px]">
          <div className="space-y-2">
            {templates.map((template) => (
              <Card key={template.id} className="border">
                <CardHeader className="py-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{template.name}</CardTitle>
                    <div className="flex gap-1">
                      <Button onClick={() => handleEdit(template)} variant="ghost" size="icon" className="h-7 w-7">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button onClick={() => handleCopy(template)} variant="ghost" size="icon" className="h-7 w-7">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button onClick={() => handleDelete(template.id)} variant="ghost" size="icon" className="h-7 w-7">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="text-sm text-muted-foreground bg-muted p-2 rounded max-h-24 overflow-y-auto">
                    {template.prompt_text}
                  </div>
                </CardContent>
                <CardFooter className="py-2 flex gap-1 flex-wrap">
                  {template.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      <Tag className="h-3 w-3 mr-1" /> {tag}
                    </Badge>
                  ))}
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}

      <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingTemplate ? "Edit Prompt Template" : "Create Prompt Template"}</DialogTitle>
            <DialogDescription>
              {editingTemplate 
                ? "Modify your existing AI prompt template"
                : "Create a new AI prompt template for consistent responses"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Template Name</Label>
                  <Input 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input 
                    id="category" 
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    readOnly
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input 
                  id="description" 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input 
                  id="tags" 
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="E.g., gpt-4, summarization, knowledge-base"
                />
              </div>
              <div>
                <Label htmlFor="promptText">Prompt Template</Label>
                <Textarea 
                  id="promptText" 
                  name="promptText"
                  value={formData.promptText}
                  onChange={handleInputChange}
                  placeholder="Create your prompt with {{variable}} placeholders"
                  rows={6}
                  required
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Use {'{{variable_name}}'} syntax for dynamic content insertion
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setShowTemplateDialog(false)}>Cancel</Button>
              <Button type="submit">{editingTemplate ? "Update" : "Create"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
