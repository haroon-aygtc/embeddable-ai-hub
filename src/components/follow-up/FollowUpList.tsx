
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MoreHorizontal, 
  Plus, 
  Search, 
  Edit, 
  Trash, 
  FileText 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useFollowUps } from "./hooks/useFollowUps";
import { FollowUpFlow } from "@/api/types";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface FollowUpListProps {
  onEdit: (followUp: FollowUpFlow) => void;
  onDelete: (followUp: FollowUpFlow) => void;
  onView: (followUp: FollowUpFlow) => void;
  onAdd: () => void;
}

export function FollowUpList({ onEdit, onDelete, onView, onAdd }: FollowUpListProps) {
  const { followUps, isLoadingFollowUps } = useFollowUps();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter follow-ups based on search query
  const filteredFollowUps = followUps?.filter(followUp => 
    followUp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    followUp.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400";
      case "draft":
        return "bg-amber-100 text-amber-800 dark:bg-amber-800/20 dark:text-amber-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Follow-Up Flows</CardTitle>
          <CardDescription>
            Manage your automated follow-up sequences
          </CardDescription>
        </div>
        <Button onClick={onAdd}>
          <Plus className="mr-2 h-4 w-4" /> Create New
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search follow-ups..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {isLoadingFollowUps ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-2">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Nodes</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFollowUps.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    {followUps?.length === 0 ? 
                      "No follow-up flows found. Create your first one!" : 
                      "No follow-ups match your search."}
                  </TableCell>
                </TableRow>
              ) : (
                filteredFollowUps.map((followUp) => (
                  <TableRow key={followUp.id}>
                    <TableCell className="font-medium">{followUp.name}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {followUp.description}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeStyle(followUp.status)}>
                        {followUp.status.charAt(0).toUpperCase() + followUp.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{followUp.nodes.length}</TableCell>
                    <TableCell>
                      {format(new Date(followUp.updatedAt), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onView(followUp)}>
                            <FileText className="mr-2 h-4 w-4" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onEdit(followUp)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onDelete(followUp)} className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
