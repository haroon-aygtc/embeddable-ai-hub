
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  CheckSquare, 
  GitBranchPlus, 
  Clock, 
  Plus, 
  Edit, 
  Trash,
  ChevronRight 
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FollowUpFlow, FollowUpNode } from "@/api/types";

interface NodeListProps {
  followUp: FollowUpFlow;
  onAddNode: () => void;
  onEditNode: (node: FollowUpNode) => void;
  onDeleteNode: (nodeId: string) => void;
}

export function NodeList({ followUp, onAddNode, onEditNode, onDeleteNode }: NodeListProps) {
  const [deleteNodeId, setDeleteNodeId] = useState<string | null>(null);

  const getNodeIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />;
      case "task":
        return <CheckSquare className="h-4 w-4" />;
      case "conditional":
        return <GitBranchPlus className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case "email":
        return "text-blue-600";
      case "task":
        return "text-green-600";
      case "conditional":
        return "text-purple-600";
      default:
        return "";
    }
  };

  const formatDelay = (delay: number, unit: string) => {
    if (delay === 0) return "No delay";
    return `${delay} ${unit}${delay === 1 ? "" : "s"}`;
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Follow-Up Nodes</CardTitle>
            <CardDescription>
              Steps in this follow-up sequence
            </CardDescription>
          </div>
          <Button onClick={onAddNode}>
            <Plus className="mr-2 h-4 w-4" /> Add Node
          </Button>
        </CardHeader>
        <CardContent>
          {followUp.nodes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="rounded-full bg-muted p-4">
                <GitBranchPlus className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-medium">No nodes added yet</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                Start building your follow-up sequence by adding your first node. 
                Nodes represent actions like sending emails or creating tasks.
              </p>
              <Button onClick={onAddNode} className="mt-6">
                <Plus className="mr-2 h-4 w-4" /> Add First Node
              </Button>
            </div>
          ) : (
            <div className="flow-diagram">
              {followUp.nodes.map((node, index) => (
                <div key={node.id}>
                  <div className="flow-node flex items-start gap-4 py-3">
                    <div className="flow-node-connector relative">
                      <div className={`p-2 rounded-full bg-muted ${getNodeColor(node.type)} bg-opacity-20`}>
                        {getNodeIcon(node.type)}
                      </div>
                      {index < followUp.nodes.length - 1 && (
                        <div className="absolute top-10 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-muted" />
                      )}
                    </div>
                    <div className="flow-node-content flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getNodeColor(node.type)}>
                            {node.type.charAt(0).toUpperCase() + node.type.slice(1)}
                          </Badge>
                          {node.delay > 0 && (
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="mr-1 h-3 w-3" />
                              {formatDelay(node.delay, node.delayUnit)}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => onEditNode(node)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => setDeleteNodeId(node.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="mt-2 text-sm">{node.content}</p>

                      {node.type === "conditional" && node.conditions.length > 0 && (
                        <div className="mt-2 space-y-2">
                          <p className="text-xs font-medium text-muted-foreground">Conditions:</p>
                          {node.conditions.map((condition, i) => (
                            <div key={i} className="flex items-center text-xs bg-muted/40 px-2 py-1 rounded">
                              <ChevronRight className="h-3 w-3 mr-1" />
                              {condition.type}: {condition.value} → {condition.target}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {index < followUp.nodes.length - 1 && (
                    <Separator className="my-1 ml-6" />
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteNodeId} onOpenChange={() => setDeleteNodeId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this node from the follow-up flow. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteNodeId) {
                  onDeleteNode(deleteNodeId);
                  setDeleteNodeId(null);
                }
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
