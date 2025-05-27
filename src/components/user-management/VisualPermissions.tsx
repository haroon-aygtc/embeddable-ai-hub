
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  FileText, 
  BarChart3, 
  Bot, 
  Shield,
  Globe,
  Palette
} from "lucide-react";

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any;
  enabled: boolean;
}

const VisualPermissions = ({ rolePermissions = [], onPermissionChange }: {
  rolePermissions: string[];
  onPermissionChange: (permissions: string[]) => void;
}) => {
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: "view_dashboard",
      name: "Dashboard Access",
      description: "View main dashboard and analytics overview",
      category: "General",
      icon: LayoutDashboard,
      enabled: rolePermissions.includes("view_dashboard")
    },
    {
      id: "manage_users",
      name: "User Management",
      description: "Add, edit, and remove user accounts",
      category: "Administration",
      icon: Users,
      enabled: rolePermissions.includes("manage_users")
    },
    {
      id: "manage_knowledge_base",
      name: "Knowledge Base",
      description: "Create and edit knowledge base articles",
      category: "Content",
      icon: FileText,
      enabled: rolePermissions.includes("manage_knowledge_base")
    },
    {
      id: "view_analytics",
      name: "Analytics & Reports",
      description: "Access to detailed analytics and reporting",
      category: "Analytics",
      icon: BarChart3,
      enabled: rolePermissions.includes("view_analytics")
    },
    {
      id: "manage_ai_models",
      name: "AI Configuration",
      description: "Configure AI models and settings",
      category: "AI",
      icon: Bot,
      enabled: rolePermissions.includes("manage_ai_models")
    },
    {
      id: "manage_settings",
      name: "System Settings",
      description: "Modify system-wide settings and configuration",
      category: "Administration",
      icon: Settings,
      enabled: rolePermissions.includes("manage_settings")
    },
    {
      id: "manage_widgets",
      name: "Widget Builder",
      description: "Create and customize chat widgets",
      category: "Widgets",
      icon: Palette,
      enabled: rolePermissions.includes("manage_widgets")
    },
    {
      id: "all",
      name: "Super Admin",
      description: "Complete system access - use with caution",
      category: "System",
      icon: Shield,
      enabled: rolePermissions.includes("all")
    }
  ]);

  const categoryColors = {
    "General": "bg-blue-100 text-blue-800",
    "Administration": "bg-red-100 text-red-800",
    "Content": "bg-green-100 text-green-800",
    "Analytics": "bg-purple-100 text-purple-800",
    "AI": "bg-orange-100 text-orange-800",
    "Widgets": "bg-pink-100 text-pink-800",
    "System": "bg-gray-100 text-gray-800"
  };

  const togglePermission = (permissionId: string) => {
    const updatedPermissions = permissions.map(p => 
      p.id === permissionId ? { ...p, enabled: !p.enabled } : p
    );
    setPermissions(updatedPermissions);
    
    const enabledPermissions = updatedPermissions
      .filter(p => p.enabled)
      .map(p => p.id);
    
    onPermissionChange(enabledPermissions);
  };

  const categorizedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Permission Settings</h3>
        <p className="text-muted-foreground">
          Toggle permissions on or off to control what this role can access
        </p>
      </div>

      {Object.entries(categorizedPermissions).map(([category, perms]) => (
        <Card key={category}>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{category}</CardTitle>
              <Badge className={categoryColors[category as keyof typeof categoryColors]} variant="secondary">
                {perms.filter(p => p.enabled).length} of {perms.length} enabled
              </Badge>
            </div>
            <CardDescription>
              {category === "System" 
                ? "High-level permissions with extensive access" 
                : `Permissions for ${category.toLowerCase()} features`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {perms.map((permission) => (
                <div key={permission.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <permission.icon className="h-5 w-5 text-primary mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{permission.name}</h4>
                        {permission.id === "all" && (
                          <Badge variant="destructive" className="text-xs">
                            High Risk
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {permission.description}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={permission.enabled}
                    onCheckedChange={() => togglePermission(permission.id)}
                    className="ml-4"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VisualPermissions;
