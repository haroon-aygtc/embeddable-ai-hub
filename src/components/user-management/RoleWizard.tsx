
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Save, FileText, Shield, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import VisualPermissions from "./VisualPermissions";

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

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

const RoleWizard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  
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

  const steps = [
    { number: 1, title: "Basic Info", icon: FileText },
    { number: 2, title: "Permissions", icon: Shield },
    { number: 3, title: "Review", icon: CheckCircle }
  ];

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSave = () => {
    if (!role.name.trim()) {
      toast({
        title: "Missing Information",
        description: "Role name is required",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Success!",
      description: `Role "${role.name}" has been ${isEditMode ? 'updated' : 'created'} successfully.`
    });
    
    navigate("/roles");
  };

  const handlePermissionChange = (permissions: string[]) => {
    setRole({ ...role, permissions });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate("/roles")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditMode ? "Update Role" : "Create New Role"}
          </h1>
          <p className="text-muted-foreground">
            {isEditMode ? "Modify role settings and permissions" : "Set up a new role with specific permissions"}
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= step.number 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.number ? "text-primary" : "text-muted-foreground"
                  }`}>
                    Step {step.number}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.title}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-20 h-px mx-4 ${
                    currentStep > step.number ? "bg-primary" : "bg-muted"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardContent className="pt-6">
          {currentStep === 1 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div>
                <h3 className="text-lg font-semibold mb-2">Role Details</h3>
                <p className="text-muted-foreground mb-4">Give your role a clear name and description</p>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Role Name *</Label>
                  <Input
                    id="name"
                    value={role.name}
                    onChange={(e) => setRole({ ...role, name: e.target.value })}
                    placeholder="e.g., Content Manager, Support Agent"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={role.description}
                    onChange={(e) => setRole({ ...role, description: e.target.value })}
                    placeholder="Brief description of what this role can do"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <VisualPermissions 
              rolePermissions={role.permissions}
              onPermissionChange={handlePermissionChange}
            />
          )}

          {currentStep === 3 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div>
                <h3 className="text-lg font-semibold mb-2">Review Role</h3>
                <p className="text-muted-foreground mb-4">Please review the role details before saving</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Role Name</Label>
                  <p className="text-lg font-medium">{role.name}</p>
                </div>
                {role.description && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                    <p className="text-base">{role.description}</p>
                  </div>
                )}
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Permissions</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {role.permissions.length > 0 ? (
                      role.permissions.map((permission) => (
                        <Badge key={permission} variant="outline">
                          {permission.replace(/_/g, ' ')}
                        </Badge>
                      ))
                    ) : (
                      <Badge variant="secondary">No permissions selected</Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/roles")}>
            Cancel
          </Button>
          {currentStep < 3 ? (
            <Button onClick={nextStep}>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              {isEditMode ? "Save Changes" : "Create Role"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleWizard;
