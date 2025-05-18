
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";

import { FollowUpList } from "@/components/follow-up/FollowUpList";
import { FollowUpForm } from "@/components/follow-up/FollowUpForm";
import { NodeForm } from "@/components/follow-up/NodeForm";
import { NodeList } from "@/components/follow-up/NodeList";
import { useFollowUps } from "@/components/follow-up/hooks/useFollowUps";
import { FollowUpFlow, FollowUpNode } from "@/api/types";

export default function FollowUpManager() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<string>("list");
  
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isNodeFormDialogOpen, setIsNodeFormDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const [selectedFollowUp, setSelectedFollowUp] = useState<FollowUpFlow | null>(null);
  const [selectedNode, setSelectedNode] = useState<FollowUpNode | null>(null);
  const [toDeleteFollowUp, setToDeleteFollowUp] = useState<FollowUpFlow | null>(null);
  
  const { 
    followUps, 
    isLoadingFollowUps,
    getFollowUp, 
    createFollowUp, 
    updateFollowUp, 
    deleteFollowUp, 
    isCreating, 
    isUpdating, 
    isDeleting,
    addNode,
    updateNode,
    deleteNode,
    isAddingNode,
    isUpdatingNode,
    isDeletingNode
  } = useFollowUps();
  
  const { data: currentFollowUp, isLoading: isLoadingCurrentFlow } = getFollowUp(id || "");

  const handleCreateFollowUp = (data: any) => {
    createFollowUp({
      ...data,
      nodes: []
    }, {
      onSuccess: () => {
        setIsFormDialogOpen(false);
        setSelectedFollowUp(null);
      }
    });
  };

  const handleUpdateFollowUp = (data: any) => {
    if (selectedFollowUp) {
      updateFollowUp({
        id: selectedFollowUp.id,
        data
      }, {
        onSuccess: () => {
          setIsFormDialogOpen(false);
          setSelectedFollowUp(null);
        }
      });
    }
  };

  const handleDeleteFollowUp = () => {
    if (toDeleteFollowUp) {
      deleteFollowUp(toDeleteFollowUp.id, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          setToDeleteFollowUp(null);
          if (id === toDeleteFollowUp.id) {
            navigate("/follow-ups");
          }
        }
      });
    }
  };

  const handleAddNode = (data: any) => {
    if (id) {
      addNode({
        flowId: id,
        node: {
          ...data,
          conditions: []
        }
      }, {
        onSuccess: () => {
          setIsNodeFormDialogOpen(false);
          setSelectedNode(null);
        }
      });
    }
  };

  const handleUpdateNode = (data: any) => {
    if (id && selectedNode) {
      updateNode({
        flowId: id,
        nodeId: selectedNode.id,
        data
      }, {
        onSuccess: () => {
          setIsNodeFormDialogOpen(false);
          setSelectedNode(null);
        }
      });
    }
  };

  const handleDeleteNode = (nodeId: string) => {
    if (id) {
      deleteNode({
        flowId: id,
        nodeId
      });
    }
  };

  const openFollowUpForm = (followUp?: FollowUpFlow) => {
    setSelectedFollowUp(followUp || null);
    setIsFormDialogOpen(true);
  };

  const openNodeForm = (node?: FollowUpNode) => {
    setSelectedNode(node || null);
    setIsNodeFormDialogOpen(true);
  };

  const confirmDeleteFollowUp = (followUp: FollowUpFlow) => {
    setToDeleteFollowUp(followUp);
    setIsDeleteDialogOpen(true);
  };

  // Display list view when no specific follow-up is selected
  if (!id) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Follow-Up Manager</h1>
          <p className="text-muted-foreground">
            Create and manage automated follow-up sequences
          </p>
        </div>
        
        <FollowUpList 
          onAdd={() => openFollowUpForm()} 
          onEdit={openFollowUpForm} 
          onDelete={confirmDeleteFollowUp}
          onView={(followUp) => navigate(`/follow-ups/${followUp.id}`)}
        />
        
        <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {selectedFollowUp ? "Edit Follow-Up Flow" : "Create New Follow-Up Flow"}
              </DialogTitle>
              <DialogDescription>
                {selectedFollowUp 
                  ? "Update the details of your follow-up sequence" 
                  : "Create a new follow-up sequence to automate communications"}
              </DialogDescription>
            </DialogHeader>
            <FollowUpForm 
              followUp={selectedFollowUp || undefined} 
              onSubmit={selectedFollowUp ? handleUpdateFollowUp : handleCreateFollowUp}
              onCancel={() => setIsFormDialogOpen(false)}
              isSubmitting={isCreating || isUpdating}
            />
          </DialogContent>
        </Dialog>
        
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the follow-up flow "{toDeleteFollowUp?.name}" and all its nodes.
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDeleteFollowUp}
                className="bg-red-600 hover:bg-red-700"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }
  
  // Display the detail view for a specific follow-up
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/follow-ups")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {isLoadingCurrentFlow ? (
          <Skeleton className="h-8 w-[200px]" />
        ) : (
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {currentFollowUp?.name || "Follow-Up Details"}
            </h1>
            <p className="text-muted-foreground">
              {currentFollowUp?.description || "Loading details..."}
            </p>
          </div>
        )}
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="nodes">Nodes</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-4 space-y-4">
          {isLoadingCurrentFlow ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-10 w-1/3" />
            </div>
          ) : currentFollowUp ? (
            <div className="space-y-4">
              <FollowUpForm
                followUp={currentFollowUp}
                onSubmit={(data) => updateFollowUp({ id, data })}
                onCancel={() => {}}
                isSubmitting={isUpdating}
              />
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">Follow-up not found</p>
              <Button onClick={() => navigate("/follow-ups")} className="mt-4">
                Back to Follow-Ups
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="nodes" className="mt-4">
          {isLoadingCurrentFlow ? (
            <div className="space-y-4">
              <Skeleton className="h-60 w-full" />
            </div>
          ) : currentFollowUp ? (
            <NodeList
              followUp={currentFollowUp}
              onAddNode={() => openNodeForm()}
              onEditNode={(node) => openNodeForm(node)}
              onDeleteNode={handleDeleteNode}
            />
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">Follow-up not found</p>
              <Button onClick={() => navigate("/follow-ups")} className="mt-4">
                Back to Follow-Ups
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <Dialog open={isNodeFormDialogOpen} onOpenChange={setIsNodeFormDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedNode ? "Edit Node" : "Add New Node"}
            </DialogTitle>
            <DialogDescription>
              {selectedNode 
                ? "Update the details of this node in your follow-up sequence" 
                : "Add a new node to your follow-up sequence"}
            </DialogDescription>
          </DialogHeader>
          <NodeForm
            node={selectedNode || undefined}
            onSubmit={selectedNode ? handleUpdateNode : handleAddNode}
            onCancel={() => setIsNodeFormDialogOpen(false)}
            isSubmitting={isAddingNode || isUpdatingNode}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
