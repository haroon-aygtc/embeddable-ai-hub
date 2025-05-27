
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

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
  }
];

const CreateEditRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [role, setRole] = useState<Role>({
    id: "",
    name: "",
    description: "",
    permissions: [],
    userCount: 0
  });
  
  const isEditMode = !!id;
  
  useEffect(() => {
    if (isEditMode && id) {
      const existingRole = mockRoles.find(r => r.id === id);
      if (existingRole) {
        setRole(existingRole);
      }
    }
  }, [id, isEditMode]);
  
  const handlePermissionToggle = (permissionName: string) => {
    const updatedPermissions = role.permissions.includes(permissionName)
      ? role.permissions.filter(p => p !== permissionName)
      : [...role.permissions, permissionName];
    
    setRole({ ...role, permissions: updatedPermissions });
  };
  
  const handleSave = () => {
    if (!role.name.trim()) {
      toast({
        title: "Error",
        description: "Role name is required",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: isEditMode ? "Role updated" : "Role created",
      description: `The ${role.name} role has been ${isEditMode ? 'updated' : 'created'}.`
    });
    
    navigate("/roles");
  };
  
  const permissionsByCategory = mockPermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate("/roles")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditMode ? "Edit Role" : "Create Role"}
          </h1>
          <p className="text-muted-foreground">
            {isEditMode ? "Update role details and permissions" : "Configure a new role and assign permissions"}
          </p>
        </div>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList>
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Role Details</CardTitle>
              <CardDescription>
                Configure the basic information for this role
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <Label htmlFor="name">Role Name</Label>
                <Input
                  id="name"
                  value={role.name}
                  onChange={(e) => setRole({ ...role, name: e.target.value })}
                  placeholder="e.g., Marketing Manager"
                />
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={role.description}
                  onChange={(e) => setRole({ ...role, description: e.target.value })}
                  placeholder="Brief description of this role's purpose"
                />
              </div>
            </CardContent>
          </Card>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {perms.map((permission) => (
                    <div key={permission.id} className="flex items-start space-x-2">
                      <Checkbox 
                        id={`permission-${permission.id}`}
                        checked={role.permissions.includes(permission.name)}
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
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => navigate("/roles")}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          {isEditMode ? "Save Changes" : "Create Role"}
        </Button>
      </div>
    </div>
  );
};

export default CreateEditRole;
