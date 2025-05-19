
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { FileText, Plus, Tag, Edit, Trash, Copy, Search } from "lucide-react";
import {
  PromptTemplate,
  fetchPromptTemplates,
  createPromptTemplate,
  updatePromptTemplate,
  deletePromptTemplate
} from "@/api/prompt-templates";

const PromptTemplates = () => {
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingTemplate, setEditingTemplate] = useState<PromptTemplate | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    promptText: "",
    tags: ""
  });

  const queryClient = useQueryClient();

  const { data: templates = [], isLoading } = useQuery({
    queryKey: ['promptTemplates'],
    queryFn: fetchPromptTemplates
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      category: "Customer Support",
      promptText: "",
      tags: ""
    });
  };

  const handleOpenDialog = () => {
    resetForm();
    setEditingTemplate(null);
    setShowTemplateDialog(true);
  };

  // Filter templates based on active tab and search query
  const filteredTemplates = templates.filter(template => {
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "customer" && template.category === "Customer Support") ||
      (activeTab === "sales" && template.category === "Sales") ||
      (activeTab === "technical" && template.category === "Tech Support") ||
      (activeTab === "ai" && template.category === "AI Model") ||
      (activeTab === "widget" && template.category === "Widget");
      
    const matchesSearch = 
      searchQuery === "" ||
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Prompt Templates</h1>
          <p className="text-muted-foreground">
            Create and manage reusable AI prompt templates for consistent responses
          </p>
        </div>
        <Button onClick={handleOpenDialog}>
          <Plus className="mr-2 h-4 w-4" /> New Template
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Templates</TabsTrigger>
            <TabsTrigger value="customer">Customer Support</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="ai">AI Models</TabsTrigger>
            <TabsTrigger value="widget">Widgets</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search templates..." 
                className="w-64 pl-8" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle>{getTabTitle(activeTab)} Templates</CardTitle>
              <CardDescription>
                {getTabDescription(activeTab)}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6">
              {isLoading ? (
                <div className="flex justify-center p-4">
                  <p>Loading templates...</p>
                </div>
              ) : filteredTemplates.length === 0 ? (
                <div className="text-center p-8">
                  <FileText className="mx-auto h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No templates found</h3>
                  <p className="mt-2 text-muted-foreground">
                    {searchQuery 
                      ? "Try adjusting your search query"
                      : `Get started by creating your first ${activeTab !== "all" ? activeTab : ""} template.`}
                  </p>
                  <Button onClick={handleOpenDialog} variant="outline" className="mt-4">
                    <Plus className="mr-2 h-4 w-4" /> Create Template
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Tags</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTemplates.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell className="font-medium flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-primary" />
                          {template.name}
                        </TableCell>
                        <TableCell>{template.category}</TableCell>
                        <TableCell>{template.description}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {template.tags.map((tag, i) => (
                              <div key={i} className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full flex items-center">
                                <Tag className="h-3 w-3 mr-1" />
                                {tag}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(template)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleCopy(template)}>
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(template.id)}>
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{editingTemplate ? "Edit Prompt Template" : "Create New Prompt Template"}</DialogTitle>
            <DialogDescription>
              Design a {editingTemplate ? "new version of this" : "new"} prompt template with variables for dynamic content
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
                    placeholder="E.g., Product Support Template" 
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    name="category"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Customer Support">Customer Support</option>
                    <option value="Sales">Sales</option>
                    <option value="Tech Support">Tech Support</option>
                    <option value="AI Model">AI Model</option>
                    <option value="Widget">Widget</option>
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input 
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of this prompt template's purpose" 
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
                  placeholder="E.g., customer-service, technical, onboarding" 
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
                  rows={8}
                  required
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Use {'{{variable_name}}'} syntax for dynamic content insertion
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setShowTemplateDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingTemplate ? "Update Template" : "Create Template"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Helper functions for tab descriptions
const getTabTitle = (tab: string) => {
  switch (tab) {
    case "all": return "All";
    case "customer": return "Customer Support";
    case "sales": return "Sales";
    case "technical": return "Technical Support";
    case "ai": return "AI Model";
    case "widget": return "Widget";
    default: return "All";
  }
};

const getTabDescription = (tab: string) => {
  switch (tab) {
    case "all": 
      return "View and manage all your prompt templates in one place";
    case "customer": 
      return "Templates for handling customer inquiries and support requests";
    case "sales": 
      return "Templates optimized for sales conversations and product recommendations";
    case "technical": 
      return "Templates for technical troubleshooting and support";
    case "ai": 
      return "Templates for AI model prompt engineering";
    case "widget": 
      return "Templates for chat widget responses";
    default: 
      return "View and manage all your prompt templates in one place";
  }
};

export default PromptTemplates;
