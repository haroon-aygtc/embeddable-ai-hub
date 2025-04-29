
import { useState } from "react";
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
import { FileText, Plus, Tag, Edit, Trash, Copy } from "lucide-react";

const promptTemplates = [
  {
    id: 1,
    name: "General Customer Support",
    description: "Generic template for answering customer inquiries",
    category: "Customer Support",
    promptText: "You are a helpful customer service agent for {{company_name}}. Answer the following question professionally and concisely: {{user_query}}",
    tags: ["customer service", "general"]
  },
  {
    id: 2,
    name: "Product Recommendation",
    description: "Template for suggesting products based on customer needs",
    category: "Sales",
    promptText: "Based on the customer's needs: {{customer_needs}}, recommend suitable {{product_category}} products from our catalog. Explain key features and benefits of each recommendation.",
    tags: ["sales", "recommendations"]
  },
  {
    id: 3,
    name: "Technical Support",
    description: "Template for technical troubleshooting",
    category: "Tech Support",
    promptText: "You are a technical support specialist. The customer is experiencing the following issue: {{issue_description}}. Provide step-by-step troubleshooting instructions to resolve their problem.",
    tags: ["technical", "troubleshooting"]
  }
];

const PromptTemplates = () => {
  const [showNewTemplateDialog, setShowNewTemplateDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Prompt Templates</h1>
          <p className="text-muted-foreground">
            Create and manage reusable AI prompt templates for consistent responses
          </p>
        </div>
        <Button onClick={() => setShowNewTemplateDialog(true)}>
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
          </TabsList>
          <div className="flex gap-2">
            <Input 
              placeholder="Search templates..." 
              className="max-w-sm" 
            />
          </div>
        </div>

        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle>All Prompt Templates</CardTitle>
              <CardDescription>
                View and manage all your prompt templates in one place
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6">
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
                  {promptTemplates.map((template) => (
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
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customer" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Customer Support Templates
              </p>
              {/* Customer support specific templates would be displayed here */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Sales Templates
              </p>
              {/* Sales specific templates would be displayed here */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technical" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Technical Support Templates
              </p>
              {/* Technical support specific templates would be displayed here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showNewTemplateDialog} onOpenChange={setShowNewTemplateDialog}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Create New Prompt Template</DialogTitle>
            <DialogDescription>
              Design a new prompt template with variables for dynamic content
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium">
                  Template Name
                </label>
                <Input id="name" placeholder="E.g., Product Support Template" />
              </div>
              <div>
                <label htmlFor="category" className="text-sm font-medium">
                  Category
                </label>
                <Input id="category" placeholder="E.g., Support, Sales, Technical" />
              </div>
            </div>
            <div>
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Input id="description" placeholder="Brief description of this prompt template's purpose" />
            </div>
            <div>
              <label htmlFor="tags" className="text-sm font-medium">
                Tags (comma separated)
              </label>
              <Input id="tags" placeholder="E.g., customer-service, technical, onboarding" />
            </div>
            <div>
              <label htmlFor="prompt" className="text-sm font-medium">
                Prompt Template
              </label>
              <Textarea 
                id="prompt" 
                placeholder="Create your prompt with {{variable}} placeholders"
                rows={8}
              />
              <p className="text-xs text-muted-foreground mt-2">
                Use {{variable_name}} syntax for dynamic content insertion
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewTemplateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowNewTemplateDialog(false)}>
              Create Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PromptTemplates;
