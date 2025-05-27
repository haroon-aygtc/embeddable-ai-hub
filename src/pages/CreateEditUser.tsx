
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save } from "lucide-react";
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
  },
  {
    id: 2,
    name: "Emily Johnson",
    email: "emily.j@example.com",
    role: "Editor",
    status: "Active",
    lastLogin: "2025-04-27 09:15",
    tenant: "Main Organization"
  }
];

const CreateEditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
  
  const handleSave = () => {
    if (!user.firstName.trim() || !user.lastName.trim() || !user.email.trim()) {
      toast({
        title: "Error",
        description: "All fields are required",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: isEditMode ? "User updated" : "User created",
      description: `User ${user.firstName} ${user.lastName} has been ${isEditMode ? 'updated' : 'created'}.`
    });
    
    navigate("/users");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate("/users")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditMode ? "Edit User" : "Create User"}
          </h1>
          <p className="text-muted-foreground">
            {isEditMode ? "Update user details and permissions" : "Create a new user account with specific permissions"}
          </p>
        </div>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList>
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="access">Access & Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Configure the user's basic information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={user.firstName}
                    onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                    placeholder="John"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={user.lastName}
                    onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                    placeholder="Smith"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="john.smith@example.com"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Access Control</CardTitle>
              <CardDescription>
                Configure the user's role and organizational access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="role">User Role</Label>
                  <Select value={user.role} onValueChange={(value) => setUser({ ...user, role: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Administrator</SelectItem>
                      <SelectItem value="Editor">Editor</SelectItem>
                      <SelectItem value="Support">Support</SelectItem>
                      <SelectItem value="Viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tenant">Tenant/Organization</Label>
                  <Select value={user.tenant} onValueChange={(value) => setUser({ ...user, tenant: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tenant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Main Organization">Main Organization</SelectItem>
                      <SelectItem value="Client XYZ">Client XYZ</SelectItem>
                      <SelectItem value="Client ABC">Client ABC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="status">Account Status</Label>
                <Select value={user.status} onValueChange={(value) => setUser({ ...user, status: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => navigate("/users")}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          {isEditMode ? "Save Changes" : "Create User"}
        </Button>
      </div>
    </div>
  );
};

export default CreateEditUser;
