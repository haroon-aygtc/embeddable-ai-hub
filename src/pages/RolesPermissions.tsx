
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Shield, Plus, Pencil, Trash, Check, UserPlus, Users } from "lucide-react";

// Types for roles and permissions
interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

const RolesPermissions = () => {
  // Sample data for roles
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "admin",
      name: "Administrator",
      description: "Full access to all systems",
      permissions: ["all_access", "user_manage", "chat_manage", "settings_manage", "ai_manage", "widget_manage", "analytics_view"],
      userCount: 3,
    },
    {
      id: "manager",
      name: "Manager",
      description: "Can manage teams and view analytics",
      permissions: ["chat_manage", "user_view", "analytics_view", "widget_manage"],
      userCount: 8,
    },
    {
      id: "agent",
      name: "Support Agent",
      description: "Can handle chats and basic configurations",
      permissions: ["chat_manage", "widget_view"],
      userCount: 15,
    },
    {
      id: "viewer",
      name: "Viewer",
      description: "Read-only access to analytics",
      permissions: ["analytics_view"],
      userCount: 6,
    },
  ]);

  // Sample data for permissions
  const [permissions] = useState<Permission[]>([
    {
      id: "all_access",
      name: "All Access",
      description: "Full system access - grants all permissions",
      module: "System",
    },
    {
      id: "user_manage",
      name: "Manage Users",
      description: "Create, update, and delete user accounts",
      module: "User Management",
    },
    {
      id: "user_view",
      name: "View Users",
      description: "View user accounts and profiles",
      module: "User Management",
    },
    {
      id: "chat_manage",
      name: "Manage Chats",
      description: "Access and respond to customer chats",
      module: "Chat Management",
    },
    {
      id: "settings_manage",
      name: "Manage Settings",
      description: "Configure system settings",
      module: "Settings",
    },
    {
      id: "ai_manage",
      name: "Manage AI Models",
      description: "Configure and train AI models",
      module: "AI Configuration",
    },
    {
      id: "widget_manage",
      name: "Manage Widget",
      description: "Configure and customize the chat widget",
      module: "Widget",
    },
    {
      id: "widget_view",
      name: "View Widget",
      description: "View widget settings and configurations",
      module: "Widget",
    },
    {
      id: "analytics_view",
      name: "View Analytics",
      description: "Access analytics and reports",
      module: "Analytics",
    },
  ]);

  // State for role being edited
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [isCreatingRole, setIsCreatingRole] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Group permissions by module
  const permissionsByModule = permissions.reduce((acc, permission) => {
    if (!acc[permission.module]) {
      acc[permission.module] = [];
    }
    acc[permission.module].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  const handleCreateRole = () => {
    setEditingRole({
      id: "",
      name: "",
      description: "",
      permissions: [],
      userCount: 0,
    });
    setIsCreatingRole(true);
    setIsDialogOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole({ ...role });
    setIsCreatingRole(false);
    setIsDialogOpen(true);
  };

  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter(role => role.id !== roleId));
  };

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (!editingRole) return;
    
    setEditingRole(prev => {
      if (!prev) return prev;
      
      if (checked) {
        return { ...prev, permissions: [...prev.permissions, permissionId] };
      } else {
        return { ...prev, permissions: prev.permissions.filter(id => id !== permissionId) };
      }
    });
  };

  const handleSaveRole = () => {
    if (!editingRole) return;
    
    if (isCreatingRole) {
      // Generate a simple ID for new role
      const newId = editingRole.name.toLowerCase().replace(/\s+/g, '_');
      setRoles([...roles, { ...editingRole, id: newId }]);
    } else {
      setRoles(roles.map(role => (role.id === editingRole.id ? editingRole : role)));
    }
    
    setIsDialogOpen(false);
    setEditingRole(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Roles & Permissions</h2>
          <p className="text-muted-foreground">
            Manage user roles and their access permissions across the platform.
          </p>
        </div>
        <Button onClick={handleCreateRole}>
          <Plus className="h-4 w-4 mr-2" /> Create Role
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-7">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5" /> Role Management
            </CardTitle>
            <CardDescription>
              Configure roles and assign permissions to control user access levels.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">{role.name}</TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        {role.userCount}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.length > 3 ? (
                          <>
                            {role.permissions.slice(0, 2).map((permId) => (
                              <span key={permId} className="bg-secondary/30 text-xs px-2 py-1 rounded-md">
                                {permissions.find(p => p.id === permId)?.name || permId}
                              </span>
                            ))}
                            <span className="bg-secondary/30 text-xs px-2 py-1 rounded-md">
                              +{role.permissions.length - 2} more
                            </span>
                          </>
                        ) : (
                          role.permissions.map((permId) => (
                            <span key={permId} className="bg-secondary/30 text-xs px-2 py-1 rounded-md">
                              {permissions.find(p => p.id === permId)?.name || permId}
                            </span>
                          ))
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditRole(role)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        {role.id !== 'admin' && (
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteRole(role.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon">
                          <UserPlus className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isCreatingRole ? "Create New Role" : `Edit Role: ${editingRole?.name}`}
            </DialogTitle>
            <DialogDescription>
              {isCreatingRole
                ? "Define a new role and assign permissions."
                : "Modify role details and permission assignments."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role-name">Role Name</Label>
                <Input
                  id="role-name"
                  placeholder="Enter role name"
                  value={editingRole?.name || ""}
                  onChange={(e) => setEditingRole(prev => prev ? { ...prev, name: e.target.value } : null)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role-description">Description</Label>
                <Textarea
                  id="role-description"
                  placeholder="Enter role description"
                  value={editingRole?.description || ""}
                  onChange={(e) => setEditingRole(prev => prev ? { ...prev, description: e.target.value } : null)}
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Permissions</h4>
              
              {Object.entries(permissionsByModule).map(([module, modulePermissions]) => (
                <div key={module} className="space-y-2">
                  <h5 className="text-sm font-medium">{module}</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {modulePermissions.map((permission) => (
                      <div key={permission.id} className="flex items-start space-x-2">
                        <Checkbox
                          id={`perm-${permission.id}`}
                          checked={editingRole?.permissions.includes(permission.id)}
                          onCheckedChange={(checked) => handlePermissionChange(permission.id, !!checked)}
                        />
                        <div className="grid gap-1.5">
                          <Label htmlFor={`perm-${permission.id}`} className="font-medium">
                            {permission.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {permission.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveRole} disabled={!editingRole?.name}>
              <Check className="mr-2 h-4 w-4" />
              {isCreatingRole ? "Create Role" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RolesPermissions;
