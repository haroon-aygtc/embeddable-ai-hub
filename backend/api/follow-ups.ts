
/**
 * Mock API service for follow-up flows
 */
import { FollowUpFlow, FollowUpNode } from "@/components/follow-up/types/followUpTypes";

// Mock data for follow-up flows
const mockFollowUps: FollowUpFlow[] = [
  {
    id: "1",
    name: "Customer Onboarding",
    description: "Guide new customers through product setup and initial usage",
    status: "active",
    nodes: [
      {
        id: "node1",
        type: "email",
        content: "Welcome to our product! Here's how to get started...",
        delay: 1,
        delayUnit: "days",
        conditions: [],
      },
      {
        id: "node2",
        type: "email",
        content: "Have you had a chance to try these features?",
        delay: 3,
        delayUnit: "days",
        conditions: [],
      },
      {
        id: "node3",
        type: "task",
        content: "Schedule a check-in call with customer",
        delay: 7,
        delayUnit: "days",
        conditions: [],
      }
    ],
    createdAt: new Date("2023-05-10"),
    updatedAt: new Date("2023-06-15"),
  },
  {
    id: "2",
    name: "Support Follow-up",
    description: "Follow up with customers after support tickets are resolved",
    status: "active",
    nodes: [
      {
        id: "node1",
        type: "email",
        content: "How would you rate your recent support experience?",
        delay: 1,
        delayUnit: "days",
        conditions: [],
      },
      {
        id: "node2",
        type: "conditional",
        content: "Check if customer responded",
        delay: 2,
        delayUnit: "days",
        conditions: [
          {
            id: "cond1",
            type: "response",
            value: "true",
            target: "node3",
          },
          {
            id: "cond2",
            type: "response",
            value: "false",
            target: "node4",
          }
        ],
      },
      {
        id: "node3",
        type: "email",
        content: "Thank you for your feedback!",
        delay: 0,
        delayUnit: "days",
        conditions: [],
      },
      {
        id: "node4",
        type: "email",
        content: "We haven't heard back from you. Could you please share your feedback?",
        delay: 0,
        delayUnit: "days",
        conditions: [],
      }
    ],
    createdAt: new Date("2023-07-20"),
    updatedAt: new Date("2023-08-05"),
  },
];

/**
 * Get all follow-up flows
 */
export const getFollowUps = async (): Promise<FollowUpFlow[]> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulated delay
  return [...mockFollowUps];
};

/**
 * Get a specific follow-up flow by ID
 */
export const getFollowUpById = async (id: string): Promise<FollowUpFlow | null> => {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulated delay
  return mockFollowUps.find(flow => flow.id === id) || null;
};

/**
 * Create a new follow-up flow
 */
export const createFollowUp = async (flowData: Omit<FollowUpFlow, 'id' | 'createdAt' | 'updatedAt'>): Promise<FollowUpFlow> => {
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulated delay
  
  const newFlow: FollowUpFlow = {
    id: Date.now().toString(),
    ...flowData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  // In a real implementation, we'd add this to the database
  // mockFollowUps.push(newFlow);
  
  return newFlow;
};

/**
 * Update an existing follow-up flow
 */
export const updateFollowUp = async (id: string, flowData: Partial<FollowUpFlow>): Promise<FollowUpFlow> => {
  await new Promise(resolve => setTimeout(resolve, 700)); // Simulated delay
  
  const flowIndex = mockFollowUps.findIndex(flow => flow.id === id);
  if (flowIndex === -1) {
    throw new Error(`Flow with ID ${id} not found`);
  }
  
  const updatedFlow: FollowUpFlow = {
    ...mockFollowUps[flowIndex],
    ...flowData,
    updatedAt: new Date(),
  };
  
  // In a real implementation, we'd update the database
  // mockFollowUps[flowIndex] = updatedFlow;
  
  return updatedFlow;
};

/**
 * Delete a follow-up flow
 */
export const deleteFollowUp = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulated delay
  
  const flowIndex = mockFollowUps.findIndex(flow => flow.id === id);
  if (flowIndex === -1) {
    throw new Error(`Flow with ID ${id} not found`);
  }
  
  // In a real implementation, we'd remove from the database
  // mockFollowUps.splice(flowIndex, 1);
};

/**
 * Add a node to a follow-up flow
 */
export const addNodeToFlow = async (flowId: string, node: Omit<FollowUpNode, 'id'>): Promise<FollowUpFlow> => {
  await new Promise(resolve => setTimeout(resolve, 600)); // Simulated delay
  
  const flowIndex = mockFollowUps.findIndex(flow => flow.id === flowId);
  if (flowIndex === -1) {
    throw new Error(`Flow with ID ${flowId} not found`);
  }
  
  const newNode: FollowUpNode = {
    id: `node${Date.now()}`,
    ...node
  };
  
  const updatedFlow = {
    ...mockFollowUps[flowIndex],
    nodes: [...mockFollowUps[flowIndex].nodes, newNode],
    updatedAt: new Date()
  };
  
  // In a real implementation, we'd update the database
  // mockFollowUps[flowIndex] = updatedFlow;
  
  return updatedFlow;
};

/**
 * Update a node in a follow-up flow
 */
export const updateNodeInFlow = async (flowId: string, nodeId: string, nodeData: Partial<FollowUpNode>): Promise<FollowUpFlow> => {
  await new Promise(resolve => setTimeout(resolve, 600)); // Simulated delay
  
  const flowIndex = mockFollowUps.findIndex(flow => flow.id === flowId);
  if (flowIndex === -1) {
    throw new Error(`Flow with ID ${flowId} not found`);
  }
  
  const nodeIndex = mockFollowUps[flowIndex].nodes.findIndex(node => node.id === nodeId);
  if (nodeIndex === -1) {
    throw new Error(`Node with ID ${nodeId} not found in flow ${flowId}`);
  }
  
  const updatedNodes = [...mockFollowUps[flowIndex].nodes];
  updatedNodes[nodeIndex] = {
    ...updatedNodes[nodeIndex],
    ...nodeData
  };
  
  const updatedFlow = {
    ...mockFollowUps[flowIndex],
    nodes: updatedNodes,
    updatedAt: new Date()
  };
  
  // In a real implementation, we'd update the database
  
  return updatedFlow;
};

/**
 * Delete a node from a follow-up flow
 */
export const deleteNodeFromFlow = async (flowId: string, nodeId: string): Promise<FollowUpFlow> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulated delay
  
  const flowIndex = mockFollowUps.findIndex(flow => flow.id === flowId);
  if (flowIndex === -1) {
    throw new Error(`Flow with ID ${flowId} not found`);
  }
  
  const nodeIndex = mockFollowUps[flowIndex].nodes.findIndex(node => node.id === nodeId);
  if (nodeIndex === -1) {
    throw new Error(`Node with ID ${nodeId} not found in flow ${flowId}`);
  }
  
  const updatedNodes = mockFollowUps[flowIndex].nodes.filter(node => node.id !== nodeId);
  
  const updatedFlow = {
    ...mockFollowUps[flowIndex],
    nodes: updatedNodes,
    updatedAt: new Date()
  };
  
  // In a real implementation, we'd update the database
  
  return updatedFlow;
};
