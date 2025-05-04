
/**
 * Mock authentication API service
 */

// Define types for authentication
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegistrationData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  avatar?: string;
  permissions: string[];
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Mock user database
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: '/avatars/admin.png',
    permissions: ['view_dashboard', 'manage_users', 'manage_settings', 'manage_widgets', 'manage_ai_models', 'manage_knowledge_base'],
  },
  {
    id: '2',
    name: 'Manager User',
    email: 'manager@example.com',
    role: 'manager',
    avatar: '/avatars/manager.png',
    permissions: ['view_dashboard', 'manage_widgets', 'manage_knowledge_base'],
  },
  {
    id: '3',
    name: 'Regular User',
    email: 'user@example.com',
    role: 'user',
    permissions: ['view_dashboard'],
  },
];

// Simulated delay to mimic network request
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock login function
 */
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // Simulate network delay
  await delay(800);
  
  const user = mockUsers.find(user => user.email === credentials.email);
  
  if (!user || credentials.password !== 'password') {
    throw new Error('Invalid email or password');
  }
  
  // Return mock auth response
  return {
    user,
    token: 'mock-jwt-token-' + Math.random().toString(36).substring(2),
  };
};

/**
 * Mock registration function
 */
export const register = async (data: RegistrationData): Promise<AuthResponse> => {
  // Simulate network delay
  await delay(800);
  
  // Check if user already exists
  if (mockUsers.some(user => user.email === data.email)) {
    throw new Error('User with this email already exists');
  }
  
  // Check if passwords match
  if (data.password !== data.passwordConfirmation) {
    throw new Error('Passwords do not match');
  }
  
  // Create new user
  const newUser: User = {
    id: (mockUsers.length + 1).toString(),
    name: data.name,
    email: data.email,
    role: 'user',
    permissions: ['view_dashboard'],
  };
  
  // In a real implementation, we would save the user to the database
  // mockUsers.push(newUser);
  
  // Return mock auth response
  return {
    user: newUser,
    token: 'mock-jwt-token-' + Math.random().toString(36).substring(2),
  };
};

/**
 * Mock logout function
 */
export const logout = async (): Promise<void> => {
  // Simulate network delay
  await delay(300);
  
  // In a real implementation, we would invalidate the token
  return;
};

/**
 * Mock function to get the current user
 */
export const getCurrentUser = async (): Promise<User | null> => {
  // Simulate network delay
  await delay(300);
  
  // In a real implementation, we would validate the token and return the user
  // For mock purposes, let's return the admin user
  return mockUsers[0];
};
