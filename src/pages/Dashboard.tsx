
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/dashboard/StatCard";
import { 
  MessageSquare, 
  Users, 
  Zap, 
  BarChart3, 
  Globe,
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome to your AI Chat Hub dashboard.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Conversations"
          value="2,853"
          icon={<MessageSquare className="h-4 w-4" />}
          trend={{ value: "12%", positive: true }}
        />
        <StatCard
          title="Active Users"
          value="1,234"
          icon={<Users className="h-4 w-4" />}
          trend={{ value: "8%", positive: true }}
        />
        <StatCard
          title="AI Response Time"
          value="0.82s"
          icon={<Zap className="h-4 w-4" />}
          trend={{ value: "21%", positive: true }}
        />
        <StatCard
          title="Completion Rate"
          value="94.2%"
          icon={<BarChart3 className="h-4 w-4" />}
          trend={{ value: "3%", positive: false }}
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Conversations Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center bg-zinc-50 rounded-md">
            <p className="text-muted-foreground">Chart will appear here</p>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Top User Queries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-8 bg-indigo-600 rounded-full"></div>
                  <span className="font-medium">Account setup questions</span>
                </div>
                <span className="text-muted-foreground">24%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-8 bg-brand-500 rounded-full"></div>
                  <span className="font-medium">Product features</span>
                </div>
                <span className="text-muted-foreground">21%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-8 bg-green-500 rounded-full"></div>
                  <span className="font-medium">Pricing information</span>
                </div>
                <span className="text-muted-foreground">18%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-8 bg-orange-500 rounded-full"></div>
                  <span className="font-medium">Technical support</span>
                </div>
                <span className="text-muted-foreground">15%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-8 bg-purple-500 rounded-full"></div>
                  <span className="font-medium">Integration help</span>
                </div>
                <span className="text-muted-foreground">12%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>AI Model Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px] flex items-center justify-center bg-zinc-50 rounded-md">
            <p className="text-muted-foreground">Chart will appear here</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Active Websites</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <div>
                  <p className="font-medium">example.com</p>
                  <p className="text-sm text-muted-foreground">Main website</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm">Active</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-b border-border pb-2">
                <div>
                  <p className="font-medium">app.example.com</p>
                  <p className="text-sm text-muted-foreground">Web application</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm">Active</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-b border-border pb-2">
                <div>
                  <p className="font-medium">docs.example.com</p>
                  <p className="text-sm text-muted-foreground">Documentation</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  <span className="text-sm">Pending</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">blog.example.com</p>
                  <p className="text-sm text-muted-foreground">Blog</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm">Active</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
