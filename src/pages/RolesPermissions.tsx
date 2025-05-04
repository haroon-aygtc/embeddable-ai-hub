
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Search, Plus, Shield, User, Users, Edit, Trash } from "lucide-react";

// Define types for our data
interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

// Mock data for roles
const mockRoles: Role[] = [
  {
    id: "1",
    name: "Administrator",
    description: "Full access to all system features",
    permissions: ["all"],
    userCount: 3
  },
  {
    id: "2",
    name: "Manager",
    description: "Can manage most features but cannot change system settings",
    permissions: ["view_dashboard", "manage_widgets", "manage_knowledge_base", "view_analytics", "manage_users"],
    userCount: 5
  },
  {
    id: "3",
    name: "Content Editor",
    description: "Can manage knowledge base and prompt templates",
    permissions: ["view_dashboard", "manage_knowledge_base", "manage_prompts"],
    userCount: 8
  },
  {
    id: "4",
    name: "Viewer",
    description: "Read-only access to the dashboard and analytics",
    permissions: ["view_dashboard", "view_analytics"],
    userCount: 12
  }
];

// Mock data for permissions
const mockPermissions: Permission[] = [
  { id: "1", name: "view_dashboard", description: "View the main dashboard", category: "General" },
  { id: "2", name: "manage_widgets", description: "Create and modify widgets", category: "Widgets" },
  { id: "3", name: "manage_knowledge_base", description: "Add and edit knowledge base articles", category: "Content" },
  { id: "4", name: "manage_prompts", description: "Create and edit prompt templates", category: "Content" },
  { id: "5", name: "view_analytics", description: "View analytics and reports", category: "Analytics" },
  { id: "6", name: "manage_users", description: "Add, edit, and remove users", category: "Administration" },
  { id: "7", name: "manage_roles", description: "Create and modify roles", category: "Administration" },
  { id: "8", name: "manage_settings", description: "Modify system settings", category: "Administration" },
  { id: "9", name: "manage_ai_models", description: "Configure AI models", category: "AI" },
  { id: "10", name: "all", description: "Full system access", category: "System" },
];

const RolesPermissions = () => {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [permissions, setPermissions] = useState<Permission[]>(mockPermissions);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("roles");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [editMode, setEditMode] = useState(false);
  
  const { toast } = useToast();
  
  // Filter roles based on search term
  const filteredRoles = roles.filter(role => 
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter permissions based on search term
  const filteredPermissions = permissions.filter(permission => 
    permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permission.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permission.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Group permissions by category
  const permissionsByCategory = filteredPermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);
  
  const handleCreateRole = () => {
    setCurrentRole({
      id: "",
      name: "",
      description: "",
      permissions: [],
      userCount: 0
    });
    setEditMode(false);
    setDialogOpen(true);
  };
  
  const handleEditRole = (role: Role) => {
    setCurrentRole(role);
    setEditMode(true);
    setDialogOpen(true);
  };
  
  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter(role => role.id !== roleId));
    toast({
      title: "Role deleted",
      description: "The role has been successfully deleted."
    });
  };
  
  const handleSaveRole = () => {
    if (!currentRole) return;
    
    if (editMode) {
      setRoles(roles.map(role => role.id === currentRole.id ? currentRole : role));
      toast({
        title: "Role updated",
        description: `The ${currentRole.name} role has been updated.`
      });
    } else {
      const newRole = {
        ...currentRole,
        id: Date.now().toString(),
      };
      setRoles([...roles, newRole]);
      toast({
        title: "Role created",
        description: `The ${currentRole.name} role has been created.`
      });
    }
    setDialogOpen(false);
  };
  
  const handlePermissionToggle = (permissionId: string) => {
    if (!currentRole) return;
    
    const updatedPermissions = currentRole.permissions.includes(permissionId)
      ? currentRole.permissions.filter(id => id !== permissionId)
      : [...currentRole.permissions, permissionId];
    
    setCurrentRole({
      ...currentRole,
      permissions: updatedPermissions
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Roles & Permissions</h2>
        <p className="text-muted-foreground">
          Manage roles and assign permissions to control user access.
        </p>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={handleCreateRole}>
          <Plus className="h-4 w-4 mr-2" />
          Create Role
        </Button>
      </div>
      
      <Tabs defaultValue="roles" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="roles">
            <Shield className="h-4 w-4 mr-2" />
            Roles
          </TabsTrigger>
          <TabsTrigger value="permissions">
            <User className="h-4 w-4 mr-2" />
            Permissions
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="roles" className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Users</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>
                    {role.permissions.includes("all") ? (
                      <Badge>All permissions</Badge>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.length > 3 ? (
                          <>
                            {role.permissions.slice(0, 2).map((permId) => (
                              <Badge key={permId} variant="outline">
                                {permId.replace(/_/g, ' ')}
                              </Badge>
                            ))}
                            <Badge variant="outline">+{role.permissions.length - 2} more</Badge>
                          </>
                        ) : (
                          role.permissions.map((permId) => (
                            <Badge key={permId} variant="outline">
                              {permId.replace(/_/g, ' ')}
                            </Badge>
                          ))
                        )}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                      {role.userCount}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" onClick={() => handleEditRole(role)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      {role.name !== "Administrator" && (
                        <Button size="sm" variant="ghost" onClick={() => handleDeleteRole(role.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredRoles.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                    No roles found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabsContent>
        
        <TabsContent value="permissions" className="space-y-6">
          {Object.entries(permissionsByCategory).map(([category, perms]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle>{category}</CardTitle>
                <CardDescription>
                  {category === "System" 
                    ? "System-level permissions with extensive access" 
                    : `Permissions related to ${category.toLowerCase()} features`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {perms.map((permission) => (
                    <div key={permission.id} className="flex items-start space-x-2 bg-muted/50 p-3 rounded-md">
                      <Shield className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">{permission.name.replace(/_/g, ' ')}</p>
                        <p className="text-sm text-muted-foreground">{permission.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
          
          {Object.keys(permissionsByCategory).length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              No permissions found matching your search.
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editMode ? "Edit Role" : "Create New Role"}</DialogTitle>
            <DialogDescription>
              {editMode 
                ? "Update the role details and permission assignments" 
                : "Configure the new role and assign permissions"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Role Name</Label>
              <Input 
                id="name"
                value={currentRole?.name || ""}
                onChange={(e) => currentRole && setCurrentRole({...currentRole, name: e.target.value})}
                placeholder="e.g., Marketing Manager"
              />
            </div>
            
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input 
                id="description"
                value={currentRole?.description || ""}
                onChange={(e) => currentRole && setCurrentRole({...currentRole, description: e.target.value})}
                placeholder="Brief description of this role's purpose"
              />
            </div>
            
            <div>
              <Label className="text-base">Permissions</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Select which permissions to grant to this role
              </p>
              
              <div className="space-y-6">
                {Object.entries(permissionsByCategory).map(([category, perms]) => (
                  <div key={category} className="space-y-3">
                    <h4 className="text-sm font-medium">{category}</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {perms.map((permission) => (
                        <div key={permission.id} className="flex items-start space-x-2">
                          <Checkbox 
                            id={`permission-${permission.id}`}
                            checked={currentRole?.permissions.includes(permission.name)}
                            onCheckedChange={() => handlePermissionToggle(permission.name)}
                          />
                          <div className="grid gap-1.5">
                            <Label 
                              htmlFor={`permission-${permission.id}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {permission.name.replace(/_/g, ' ')}
                            </Label>
                            <p className="text-xs text-muted-foreground">{permission.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveRole} disabled={!currentRole?.name}>
              {editMode ? "Save Changes" : "Create Role"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RolesPermissions;
