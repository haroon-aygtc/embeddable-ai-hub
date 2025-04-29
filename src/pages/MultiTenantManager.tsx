
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
import { Badge } from "@/components/ui/badge";
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
import { Plus, Building, Search, Edit, Trash, Users, Database, FileText, Settings, Globe } from "lucide-react";

const tenants = [
  {
    id: 1,
    name: "Acme Corporation",
    domain: "acme.com",
    plan: "Enterprise",
    status: "Active",
    users: 25,
    storage: "50 GB",
    created: "2025-01-15"
  },
  {
    id: 2,
    name: "Globex Inc.",
    domain: "globex.net",
    plan: "Professional",
    status: "Active",
    users: 12,
    storage: "25 GB",
    created: "2025-02-20"
  },
  {
    id: 3,
    name: "Initech LLC",
    domain: "initech.org",
    plan: "Standard",
    status: "Inactive",
    users: 5,
    storage: "10 GB",
    created: "2025-03-10"
  },
  {
    id: 4,
    name: "Umbrella Corp",
    domain: "umbrella-corp.com",
    plan: "Enterprise",
    status: "Active",
    users: 30,
    storage: "100 GB",
    created: "2025-01-05"
  }
];

const MultiTenantManager = () => {
  const [showAddTenantDialog, setShowAddTenantDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Multi-Tenant Manager</h1>
          <p className="text-muted-foreground">
            Manage organizations and client tenants in your system
          </p>
        </div>
        <Button onClick={() => setShowAddTenantDialog(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Tenant
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Tenants</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Input 
              placeholder="Search tenants..." 
              className="max-w-sm" 
            />
          </div>
        </div>

        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle>System Tenants</CardTitle>
              <CardDescription>
                Organizations and clients with isolated environments
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Organization</TableHead>
                    <TableHead>Domain</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Storage</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tenants.map((tenant) => (
                    <TableRow key={tenant.id}>
                      <TableCell className="font-medium flex items-center">
                        <Building className="h-4 w-4 mr-2 text-primary" />
                        {tenant.name}
                      </TableCell>
                      <TableCell>{tenant.domain}</TableCell>
                      <TableCell>
                        <Badge variant={
                          tenant.plan === "Enterprise" ? "default" : 
                          tenant.plan === "Professional" ? "secondary" : 
                          "outline"
                        }>
                          {tenant.plan}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className={`px-2 py-1 rounded-full text-xs inline-flex items-center ${
                          tenant.status === "Active" 
                            ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400" 
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400"
                        }`}>
                          {tenant.status}
                        </div>
                      </TableCell>
                      <TableCell>{tenant.users}</TableCell>
                      <TableCell>{tenant.storage}</TableCell>
                      <TableCell>{tenant.created}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4" />
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
                Active Tenants
              </p>
              {/* Active specific tenants would be displayed here */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Inactive Tenants
              </p>
              {/* Inactive specific tenants would be displayed here */}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="enterprise" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Enterprise Tenants
              </p>
              {/* Enterprise specific tenants would be displayed here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showAddTenantDialog} onOpenChange={setShowAddTenantDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Tenant</DialogTitle>
            <DialogDescription>
              Create a new organization with isolated data and users
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium">
                  Organization Name
                </label>
                <Input id="name" placeholder="E.g., Acme Corporation" />
              </div>
              <div>
                <label htmlFor="domain" className="text-sm font-medium">
                  Domain
                </label>
                <Input id="domain" placeholder="E.g., acme.com" />
              </div>
            </div>
            <div>
              <label htmlFor="plan" className="text-sm font-medium">
                Subscription Plan
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="users" className="text-sm font-medium">
                  User Limit
                </label>
                <Input id="users" type="number" placeholder="E.g., 10" />
              </div>
              <div>
                <label htmlFor="storage" className="text-sm font-medium">
                  Storage Limit (GB)
                </label>
                <Input id="storage" type="number" placeholder="E.g., 50" />
              </div>
            </div>
            <div>
              <label htmlFor="adminEmail" className="text-sm font-medium">
                Admin Email
              </label>
              <Input id="adminEmail" type="email" placeholder="E.g., admin@acme.com" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddTenantDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowAddTenantDialog(false)}>
              Create Tenant
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MultiTenantManager;
