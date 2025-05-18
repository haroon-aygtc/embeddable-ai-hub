/**
 * API service for follow-up flows
 */
import { API_BASE_URL, ApiResponse } from './index';
import { FollowUpFlow, FollowUpNode } from "@/components/follow-up/types/followUpTypes";

/**
 * Get all follow-up flows
 */
export const getFollowUps = async (): Promise<FollowUpFlow[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/follow-ups`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching follow-ups: ${response.status}`);
    }
    
    const data: ApiResponse<FollowUpFlow[]> = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch follow-ups');
    }
    
    return data.data || [];
  } catch (error) {
    console.error('Error fetching follow-ups:', error);
    // For development, return mock data
    if (process.env.NODE_ENV !== 'production') {
      return getMockFollowUps();
    }
    throw error;
  }
};

/**
 * Get a specific follow-up flow by ID
 */
export const getFollowUpById = async (id: string): Promise<FollowUpFlow | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/follow-ups/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching follow-up: ${response.status}`);
    }
    
    const data: ApiResponse<FollowUpFlow> = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || `Failed to fetch follow-up with ID ${id}`);
    }
    
    return data.data || null;
  } catch (error) {
    console.error(`Error fetching follow-up with ID ${id}:`, error);
    // For development, return mock data
    if (process.env.NODE_ENV !== 'production') {
      const mockData = getMockFollowUps();
      return mockData.find(flow => flow.id === id) || null;
    }
    throw error;
  }
};

/**
 * Create a new follow-up flow
 */
export const createFollowUp = async (flowData: Omit<FollowUpFlow, 'id' | 'createdAt' | 'updatedAt'>): Promise<FollowUpFlow> => {
  try {
    const response = await fetch(`${API_BASE_URL}/follow-ups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(flowData)
    });
    
    if (!response.ok) {
      throw new Error(`Error creating follow-up: ${response.status}`);
    }
    
    const data: ApiResponse<FollowUpFlow> = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to create follow-up');
    }
    
    return data.data as FollowUpFlow;
  } catch (error) {
    console.error('Error creating follow-up:', error);
    // For development, return mock data
    if (process.env.NODE_ENV !== 'production') {
      return {
        id: Date.now().toString(),
        ...flowData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }
    throw error;
  }
};

/**
 * Update an existing follow-up flow
 */
export const updateFollowUp = async (id: string, flowData: Partial<FollowUpFlow>): Promise<FollowUpFlow> => {
  try {
    const response = await fetch(`${API_BASE_URL}/follow-ups/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(flowData)
    });
    
    if (!response.ok) {
      throw new Error(`Error updating follow-up: ${response.status}`);
    }
    
    const data: ApiResponse<FollowUpFlow> = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || `Failed to update follow-up with ID ${id}`);
    }
    
    return data.data as FollowUpFlow;
  } catch (error) {
    console.error(`Error updating follow-up with ID ${id}:`, error);
    // For development, return mock data
    if (process.env.NODE_ENV !== 'production') {
      // Get mock data
      const mockData = getMockFollowUps();
      const flowIndex = mockData.findIndex(flow => flow.id === id);
      if (flowIndex === -1) {
        throw new Error(`Flow with ID ${id} not found`);
      }
      
      const updatedFlow = {
        ...mockData[flowIndex],
        ...flowData,
        updatedAt: new Date()
      };
      
      return updatedFlow;
    }
    throw error;
  }
};

/**
 * Delete a follow-up flow
 */
export const deleteFollowUp = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/follow-ups/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error deleting follow-up: ${response.status}`);
    }
    
    const data: ApiResponse<null> = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || `Failed to delete follow-up with ID ${id}`);
    }
    
    return;
  } catch (error) {
    console.error(`Error deleting follow-up with ID ${id}:`, error);
    // For development, just return
    if (process.env.NODE_ENV !== 'production') {
      return;
    }
    throw error;
  }
};

/**
 * Add a node to a follow-up flow
 */
export const addNodeToFlow = async (flowId: string, node: Omit<FollowUpNode, 'id'>): Promise<FollowUpFlow> => {
  try {
    const response = await fetch(`${API_BASE_URL}/follow-ups/${flowId}/nodes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(node)
    });
    
    if (!response.ok) {
      throw new Error(`Error adding node: ${response.status}`);
    }
    
    const data: ApiResponse<FollowUpFlow> = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || `Failed to add node to flow with ID ${flowId}`);
    }
    
    return data.data as FollowUpFlow;
  } catch (error) {
    console.error(`Error adding node to flow with ID ${flowId}:`, error);
    // For development, return mock data
    if (process.env.NODE_ENV !== 'production') {
      // Get mock data
      const mockData = getMockFollowUps();
      const flowIndex = mockData.findIndex(flow => flow.id === flowId);
      if (flowIndex === -1) {
        throw new Error(`Flow with ID ${flowId} not found`);
      }
      
      const newNode: FollowUpNode = {
        id: `node${Date.now()}`,
        ...node
      };
      
      const updatedFlow = {
        ...mockData[flowIndex],
        nodes: [...mockData[flowIndex].nodes, newNode],
        updatedAt: new Date()
      };
      
      return updatedFlow;
    }
    throw error;
  }
};

/**
 * Update a node in a follow-up flow
 */
export const updateNodeInFlow = async (flowId: string, nodeId: string, nodeData: Partial<FollowUpNode>): Promise<FollowUpFlow> => {
  try {
    const response = await fetch(`${API_BASE_URL}/follow-ups/${flowId}/nodes/${nodeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(nodeData)
    });
    
    if (!response.ok) {
      throw new Error(`Error updating node: ${response.status}`);
    }
    
    const data: ApiResponse<FollowUpFlow> = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || `Failed to update node ${nodeId} in flow ${flowId}`);
    }
    
    return data.data as FollowUpFlow;
  } catch (error) {
    console.error(`Error updating node ${nodeId} in flow ${flowId}:`, error);
    // For development, return mock data
    if (process.env.NODE_ENV !== 'production') {
      // Get mock data
      const mockData = getMockFollowUps();
      const flowIndex = mockData.findIndex(flow => flow.id === flowId);
      if (flowIndex === -1) {
        throw new Error(`Flow with ID ${flowId} not found`);
      }
      
      const nodeIndex = mockData[flowIndex].nodes.findIndex(node => node.id === nodeId);
      if (nodeIndex === -1) {
        throw new Error(`Node with ID ${nodeId} not found in flow ${flowId}`);
      }
      
      const updatedNodes = [...mockData[flowIndex].nodes];
      updatedNodes[nodeIndex] = {
        ...updatedNodes[nodeIndex],
        ...nodeData
      };
      
      const updatedFlow = {
        ...mockData[flowIndex],
        nodes: updatedNodes,
        updatedAt: new Date()
      };
      
      return updatedFlow;
    }
    throw error;
  }
};

/**
 * Delete a node from a follow-up flow
 */
export const deleteNodeFromFlow = async (flowId: string, nodeId: string): Promise<FollowUpFlow> => {
  try {
    const response = await fetch(`${API_BASE_URL}/follow-ups/${flowId}/nodes/${nodeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Error deleting node: ${response.status}`);
    }
    
    const data: ApiResponse<FollowUpFlow> = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || `Failed to delete node ${nodeId} from flow ${flowId}`);
    }
    
    return data.data as FollowUpFlow;
  } catch (error) {
    console.error(`Error deleting node ${nodeId} from flow ${flowId}:`, error);
    // For development, return mock data
    if (process.env.NODE_ENV !== 'production') {
      // Get mock data
      const mockData = getMockFollowUps();
      const flowIndex = mockData.findIndex(flow => flow.id === flowId);
      if (flowIndex === -1) {
        throw new Error(`Flow with ID ${flowId} not found`);
      }
      
      const updatedNodes = mockData[flowIndex].nodes.filter(node => node.id !== nodeId);
      
      const updatedFlow = {
        ...mockData[flowIndex],
        nodes: updatedNodes,
        updatedAt: new Date()
      };
      
      return updatedFlow;
    }
    throw error;
  }
};

/**
 * Mock data for development use
 */
const getMockFollowUps = (): FollowUpFlow[] => {
  return [
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
    }
  ];
};
