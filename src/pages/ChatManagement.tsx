
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  MessageSquare, 
  User,
  Users, 
  Clock,
  Check, 
  X,
  Filter,
  SortAsc,
  RefreshCw 
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ChatManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock chat data
  const chatSessions = [
    { 
      id: "chat-1", 
      user: "Sarah Johnson", 
      lastMessage: "Thanks for the help with my order!", 
      time: "2 minutes ago",
      status: "active",
      messages: 8,
      email: "sarah@example.com"
    },
    { 
      id: "chat-2", 
      user: "Michael Brown", 
      lastMessage: "Do you ship to international addresses?", 
      time: "15 minutes ago",
      status: "active",
      messages: 3,
      email: "michael@example.com"
    },
    { 
      id: "chat-3", 
      user: "Emma Wilson", 
      lastMessage: "I need to return an item from order #45678", 
      time: "1 hour ago",
      status: "pending",
      messages: 5,
      email: "emma@example.com"
    },
    { 
      id: "chat-4", 
      user: "James Lee", 
      lastMessage: "When will my order be delivered?", 
      time: "3 hours ago",
      status: "closed",
      messages: 12,
      email: "james@example.com"
    },
    { 
      id: "chat-5", 
      user: "Anna Garcia", 
      lastMessage: "The payment was declined, but I've been charged", 
      time: "Yesterday",
      status: "pending",
      messages: 7,
      email: "anna@example.com"
    }
  ];

  const filteredChats = chatSessions.filter(chat => {
    // Status filter
    if (statusFilter !== "all" && chat.status !== statusFilter) {
      return false;
    }
    
    // Search filter
    if (searchQuery && !chat.user.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const statusStyles = {
    active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    closed: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
  };
  
  const getStatusBadge = (status: string) => {
    const style = statusStyles[status as keyof typeof statusStyles];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${style}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Chat Management</h2>
        <p className="text-muted-foreground">
          View and manage all chat conversations with your users.
        </p>
      </div>
      
      <Tabs defaultValue="live" className="w-full">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <TabsList>
            <TabsTrigger value="live">
              <MessageSquare className="h-4 w-4 mr-2" />
              Live Chats
            </TabsTrigger>
            <TabsTrigger value="archived">
              <Clock className="h-4 w-4 mr-2" />
              Archived
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <Users className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search conversations..."
                className="pl-8 w-[200px] sm:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select 
              value={statusFilter} 
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[120px]">
                <Filter className="h-4 w-4 mr-2" />
                <span>Filter</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <SortAsc className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <TabsContent value="live" className="space-y-4">
          {filteredChats.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No chats found</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  There are no chat sessions matching your current filters. Try adjusting your search or filters.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredChats.map(chat => (
                <Card key={chat.id} className="hover:bg-accent/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{chat.user}</h4>
                            {getStatusBadge(chat.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">{chat.email}</p>
                          <p className="text-sm">{chat.lastMessage}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{chat.time}</span>
                            <span>{chat.messages} messages</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="default">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Reply
                        </Button>
                        {chat.status !== 'closed' && (
                          <Button size="sm" variant="outline">
                            <Check className="h-4 w-4 mr-2" />
                            Resolve
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive/10">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="archived">
          <Card>
            <CardHeader>
              <CardTitle>Archived Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <p>View and manage archived chat sessions.</p>
              <div className="flex justify-center py-8">
                <p className="text-muted-foreground">No archived chats available</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Chat Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p>View chat performance metrics and user engagement statistics.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold">87%</div>
                    <p className="text-muted-foreground text-sm">Satisfaction Rate</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold">1m 47s</div>
                    <p className="text-muted-foreground text-sm">Avg. Response Time</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold">342</div>
                    <p className="text-muted-foreground text-sm">Conversations This Week</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatManagement;
