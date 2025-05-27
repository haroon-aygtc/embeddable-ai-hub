
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Save, User, Shield, Building, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  tenant: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2025-04-28 14:23",
    tenant: "Main Organization"
  }
];

const roles = [
  { id: "Admin", name: "Administrator", description: "Full system access", color: "bg-red-100 text-red-800" },
  { id: "Editor", name: "Content Editor", description: "Manage content and knowledge base", color: "bg-blue-100 text-blue-800" },
  { id: "Support", name: "Support Agent", description: "Handle customer support", color: "bg-green-100 text-green-800" },
  { id: "Viewer", name: "Viewer", description: "Read-only access", color: "bg-gray-100 text-gray-800" }
];

const tenants = [
  { id: "Main Organization", name: "Main Organization", users: 15 },
  { id: "Client XYZ", name: "Client XYZ", users: 8 },
  { id: "Client ABC", name: "Client ABC", users: 12 }
];

const UserRoleWizard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    tenant: "",
    status: "Active"
  });
  
  const isEditMode = !!id;
  
  useEffect(() => {
    if (isEditMode && id) {
      const existingUser = mockUsers.find(u => u.id === parseInt(id));
      if (existingUser) {
        const [firstName, lastName] = existingUser.name.split(" ");
        setUser({
          firstName: firstName || "",
          lastName: lastName || "",
          email: existingUser.email,
          role: existingUser.role,
          tenant: existingUser.tenant,
          status: existingUser.status
        });
      }
    }
  }, [id, isEditMode]);

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Role & Access", icon: Shield },
    { number: 3, title: "Organization", icon: Building },
    { number: 4, title: "Review", icon: CheckCircle }
  ];

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSave = () => {
    if (!user.firstName.trim() || !user.lastName.trim() || !user.email.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Success!",
      description: `User ${user.firstName} ${user.lastName} has been ${isEditMode ? 'updated' : 'created'} successfully.`
    });
    
    navigate("/users");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate("/users")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditMode ? "Update User" : "Add New User"}
          </h1>
          <p className="text-muted-foreground">
            {isEditMode ? "Make changes to user details" : "Create a new user account step by step"}
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
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
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                <p className="text-muted-foreground mb-4">Enter the user's basic details</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={user.firstName}
                    onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                    placeholder="John"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={user.lastName}
                    onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                    placeholder="Smith"
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="john.smith@example.com"
                  className="mt-1"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Role & Permissions</h3>
                <p className="text-muted-foreground mb-4">Choose what this user can do</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {roles.map((role) => (
                  <Card 
                    key={role.id} 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      user.role === role.id ? "ring-2 ring-primary shadow-md" : ""
                    }`}
                    onClick={() => setUser({ ...user, role: role.id })}
                  >
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 mt-1 text-primary" />
                        <div className="flex-1">
                          <h4 className="font-medium">{role.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
                          <Badge className={`mt-2 ${role.color}`} variant="secondary">
                            {role.id}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Organization Access</h3>
                <p className="text-muted-foreground mb-4">Select which organization this user belongs to</p>
              </div>
              <div className="space-y-3">
                {tenants.map((tenant) => (
                  <Card 
                    key={tenant.id} 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      user.tenant === tenant.id ? "ring-2 ring-primary shadow-md" : ""
                    }`}
                    onClick={() => setUser({ ...user, tenant: tenant.id })}
                  >
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Building className="h-5 w-5 text-primary" />
                          <div>
                            <h4 className="font-medium">{tenant.name}</h4>
                            <p className="text-sm text-muted-foreground">{tenant.users} active users</p>
                          </div>
                        </div>
                        {user.tenant === tenant.id && (
                          <CheckCircle className="h-5 w-5 text-primary" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Review & Confirm</h3>
                <p className="text-muted-foreground mb-4">Please review the information before saving</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                    <p className="text-lg font-medium">{user.firstName} {user.lastName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                    <p className="text-lg font-medium">{user.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Role</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Shield className="h-4 w-4" />
                      <span className="font-medium">{user.role}</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Organization</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Building className="h-4 w-4" />
                      <span className="font-medium">{user.tenant}</span>
                    </div>
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
          <Button variant="outline" onClick={() => navigate("/users")}>
            Cancel
          </Button>
          {currentStep < 4 ? (
            <Button onClick={nextStep}>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              {isEditMode ? "Save Changes" : "Create User"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserRoleWizard;
