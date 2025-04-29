
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
import { Radio } from "lucide-react";
import { MessageSquare, Plus, FileKey, Edit, Trash, Copy, ArrowRight } from "lucide-react";

const followUps = [
  {
    id: 1,
    name: "General Support Follow-Up",
    content: "Was this helpful? Do you need help with anything else?",
    position: "End",
    options: ["Yes, this was helpful", "No, I need more help"],
    useCase: "General",
    enabled: true
  },
  {
    id: 2,
    name: "Product Purchase Intent",
    content: "Would you like to learn more about our pricing options?",
    position: "Inline",
    options: ["Yes, show me pricing", "No thanks"],
    useCase: "Sales",
    enabled: true
  },
  {
    id: 3,
    name: "Technical Satisfaction",
    content: "Did this solution resolve your technical issue?",
    position: "End",
    options: ["Issue resolved", "Still having problems"],
    useCase: "Tech Support",
    enabled: false
  },
  {
    id: 4,
    name: "Documentation Request",
    content: "Would you like me to provide documentation on this topic?",
    position: "Inline",
    options: ["Yes, show documentation", "No need"],
    useCase: "Support",
    enabled: true
  }
];

const FollowUpBuilder = () => {
  const [showNewFollowUpDialog, setShowNewFollowUpDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Follow-Up Builder</h1>
          <p className="text-muted-foreground">
            Create interactive follow-up prompts to guide conversations
          </p>
        </div>
        <Button onClick={() => setShowNewFollowUpDialog(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Follow-Up
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Follow-Ups</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Input 
              placeholder="Search follow-ups..." 
              className="max-w-sm" 
            />
          </div>
        </div>

        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle>All Follow-Up Prompts</CardTitle>
              <CardDescription>
                Interactive follow-up suggestions to enhance conversations
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Options</TableHead>
                    <TableHead>Use Case</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {followUps.map((followUp) => (
                    <TableRow key={followUp.id}>
                      <TableCell className="font-medium flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2 text-primary" />
                        {followUp.name}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{followUp.content}</TableCell>
                      <TableCell>
                        <div className={`px-2 py-1 rounded-full text-xs inline-flex items-center ${
                          followUp.position === "End" 
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400" 
                            : "bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-400"
                        }`}>
                          {followUp.position}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[150px]">
                        <div className="flex flex-col gap-1">
                          {followUp.options.map((option, i) => (
                            <div key={i} className="text-xs flex items-center gap-1">
                              <ArrowRight className="h-3 w-3" />
                              <span className="truncate">{option}</span>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{followUp.useCase}</TableCell>
                      <TableCell>
                        <div className={`px-2 py-1 rounded-full text-xs inline-flex items-center ${
                          followUp.enabled 
                            ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400" 
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400"
                        }`}>
                          {followUp.enabled ? "Enabled" : "Disabled"}
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

        <TabsContent value="active" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Active Follow-Up Prompts
              </p>
              {/* Active follow-ups would be displayed here */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Inactive Follow-Up Prompts
              </p>
              {/* Inactive follow-ups would be displayed here */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Sales Follow-Up Prompts
              </p>
              {/* Sales follow-ups would be displayed here */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Support Follow-Up Prompts
              </p>
              {/* Support follow-ups would be displayed here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showNewFollowUpDialog} onOpenChange={setShowNewFollowUpDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Follow-Up Prompt</DialogTitle>
            <DialogDescription>
              Design interactive follow-up prompts for more engaging conversations
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium">
                Follow-Up Name
              </label>
              <Input id="name" placeholder="E.g., Customer Satisfaction Check" />
            </div>
            <div>
              <label htmlFor="content" className="text-sm font-medium">
                Follow-Up Message
              </label>
              <Textarea id="content" placeholder="E.g., How would you rate your experience today?" rows={3} />
            </div>
            <div>
              <label htmlFor="position" className="text-sm font-medium">
                Position in Response
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="start">Start of Response</SelectItem>
                  <SelectItem value="inline">Inline (Middle)</SelectItem>
                  <SelectItem value="end">End of Response</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="useCase" className="text-sm font-medium">
                Use Case
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select use case" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                  <SelectItem value="tech">Technical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">
                Follow-Up Options
              </label>
              <div className="space-y-2 mt-2">
                <Input placeholder="Option 1: E.g., Yes, that was helpful" />
                <Input placeholder="Option 2: E.g., I need more information" />
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    <Plus className="h-3 w-3 mr-1" /> Add Option
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewFollowUpDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowNewFollowUpDialog(false)}>
              Create Follow-Up
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FollowUpBuilder;
