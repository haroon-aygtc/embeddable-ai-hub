
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Database, FolderPlus, Search, File, Edit, Trash, Eye, Upload } from "lucide-react";

const knowledgeSources = [
  {
    id: 1,
    title: "Product Features Overview",
    type: "Document",
    format: "PDF",
    size: "2.4 MB",
    uploadedAt: "2025-04-15",
    status: "Indexed",
    categories: ["Products", "Features"]
  },
  {
    id: 2,
    title: "Frequently Asked Questions",
    type: "Text",
    format: "Markdown",
    size: "56 KB",
    uploadedAt: "2025-04-20",
    status: "Indexed",
    categories: ["Support", "FAQ"]
  },
  {
    id: 3,
    title: "Technical Specifications",
    type: "Document",
    format: "HTML",
    size: "128 KB",
    uploadedAt: "2025-04-22",
    status: "Indexing",
    categories: ["Technical", "Specifications"]
  },
  {
    id: 4,
    title: "User Manual",
    type: "Document",
    format: "PDF",
    size: "5.7 MB",
    uploadedAt: "2025-04-10",
    status: "Indexed",
    categories: ["Documentation", "User Guide"]
  }
];

const KnowledgeBase = () => {
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Knowledge Base</h1>
          <p className="text-muted-foreground">
            Manage AI knowledge sources for context-aware responses
          </p>
        </div>
        <Button onClick={() => setShowUploadDialog(true)}>
          <Upload className="mr-2 h-4 w-4" /> Upload Knowledge
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Sources</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="websites">Websites</TabsTrigger>
            <TabsTrigger value="text">Text Content</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Input 
              placeholder="Search knowledge base..." 
              className="max-w-sm" 
            />
          </div>
        </div>

        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle>Knowledge Sources</CardTitle>
              <CardDescription>
                Uploaded documents, websites, and text content for AI context
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Uploaded</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Categories</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {knowledgeSources.map((source) => (
                    <TableRow key={source.id}>
                      <TableCell className="font-medium flex items-center">
                        <File className="h-4 w-4 mr-2 text-primary" />
                        {source.title}
                      </TableCell>
                      <TableCell>{source.type}</TableCell>
                      <TableCell>{source.format}</TableCell>
                      <TableCell>{source.size}</TableCell>
                      <TableCell>{source.uploadedAt}</TableCell>
                      <TableCell>
                        <div className={`px-2 py-1 rounded-full text-xs inline-flex items-center ${
                          source.status === "Indexed" 
                            ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400" 
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400"
                        }`}>
                          {source.status}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {source.categories.map((category, i) => (
                            <span key={i} className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                              {category}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
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

        <TabsContent value="documents" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Document Sources
              </p>
              {/* Document specific sources would be displayed here */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="websites" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Website Sources
              </p>
              {/* Website specific sources would be displayed here */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="text" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Text Content Sources
              </p>
              {/* Text content specific sources would be displayed here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Upload Knowledge Source</DialogTitle>
            <DialogDescription>
              Add documents, websites, or text content to your AI knowledge base
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <label htmlFor="type" className="text-sm font-medium">
                Source Type
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select source type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="document">Document (PDF, Word, etc.)</SelectItem>
                  <SelectItem value="website">Website URL</SelectItem>
                  <SelectItem value="text">Text Content</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input id="title" placeholder="Enter a descriptive title" />
            </div>
            <div>
              <label htmlFor="categories" className="text-sm font-medium">
                Categories (comma separated)
              </label>
              <Input id="categories" placeholder="E.g., Documentation, Support, Products" />
            </div>
            <div>
              <label htmlFor="fileUpload" className="text-sm font-medium">
                Upload File
              </label>
              <div className="mt-2 border-2 border-dashed border-input rounded-lg p-6 text-center cursor-pointer hover:bg-accent">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Drag and drop your file here, or click to browse
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Supports PDF, Word, Excel, Markdown, HTML, and text files (max 20MB)
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowUploadDialog(false)}>
              Upload & Index
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KnowledgeBase;
