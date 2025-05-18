
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { 
  getFollowUps, 
  getFollowUpById, 
  createFollowUp, 
  updateFollowUp, 
  deleteFollowUp,
  addNodeToFlow,
  updateNodeInFlow,
  deleteNodeFromFlow
} from "@/api/follow-ups";
import { FollowUpFlow, FollowUpNode } from "@/api/types";

export function useFollowUps() {
  const queryClient = useQueryClient();

  // Get all follow-up flows
  const { 
    data: followUps, 
    isLoading: isLoadingFollowUps,
    error: followUpsError 
  } = useQuery({
    queryKey: ["followUps"],
    queryFn: getFollowUps
  });

  // Get a single follow-up flow by ID
  const getFollowUp = (id: string) => {
    return useQuery({
      queryKey: ["followUp", id],
      queryFn: () => getFollowUpById(id),
      enabled: !!id,
    });
  };

  // Create a new follow-up flow
  const createFollowUpMutation = useMutation({
    mutationFn: (data: Omit<FollowUpFlow, "id" | "createdAt" | "updatedAt">) => {
      return createFollowUp(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followUps"] });
      toast.success("Follow-up flow created successfully");
    },
    onError: (error) => {
      toast.error(`Failed to create follow-up: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  });

  // Update an existing follow-up flow
  const updateFollowUpMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<FollowUpFlow> }) => {
      return updateFollowUp(id, data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["followUps"] });
      queryClient.invalidateQueries({ queryKey: ["followUp", variables.id] });
      toast.success("Follow-up flow updated successfully");
    },
    onError: (error) => {
      toast.error(`Failed to update follow-up: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  });

  // Delete a follow-up flow
  const deleteFollowUpMutation = useMutation({
    mutationFn: (id: string) => {
      return deleteFollowUp(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followUps"] });
      toast.success("Follow-up flow deleted successfully");
    },
    onError: (error) => {
      toast.error(`Failed to delete follow-up: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  });

  // Add a node to a follow-up flow
  const addNodeMutation = useMutation({
    mutationFn: ({ flowId, node }: { flowId: string; node: Omit<FollowUpNode, "id"> }) => {
      return addNodeToFlow(flowId, node);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["followUp", variables.flowId] });
      toast.success("Node added successfully");
    },
    onError: (error) => {
      toast.error(`Failed to add node: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  });

  // Update a node in a follow-up flow
  const updateNodeMutation = useMutation({
    mutationFn: ({ flowId, nodeId, data }: { flowId: string; nodeId: string; data: Partial<FollowUpNode> }) => {
      return updateNodeInFlow(flowId, nodeId, data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["followUp", variables.flowId] });
      toast.success("Node updated successfully");
    },
    onError: (error) => {
      toast.error(`Failed to update node: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  });

  // Delete a node from a follow-up flow
  const deleteNodeMutation = useMutation({
    mutationFn: ({ flowId, nodeId }: { flowId: string; nodeId: string }) => {
      return deleteNodeFromFlow(flowId, nodeId);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["followUp", variables.flowId] });
      toast.success("Node deleted successfully");
    },
    onError: (error) => {
      toast.error(`Failed to delete node: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  });

  return {
    followUps,
    isLoadingFollowUps,
    followUpsError,
    getFollowUp,
    createFollowUp: createFollowUpMutation.mutate,
    isCreating: createFollowUpMutation.isPending,
    updateFollowUp: updateFollowUpMutation.mutate,
    isUpdating: updateFollowUpMutation.isPending,
    deleteFollowUp: deleteFollowUpMutation.mutate,
    isDeleting: deleteFollowUpMutation.isPending,
    addNode: addNodeMutation.mutate,
    isAddingNode: addNodeMutation.isPending,
    updateNode: updateNodeMutation.mutate,
    isUpdatingNode: updateNodeMutation.isPending,
    deleteNode: deleteNodeMutation.mutate,
    isDeletingNode: deleteNodeMutation.isPending
  };
}
