
# Mock API Layer

This directory contains mock API services to simulate the backend responses during frontend development.

The mock API follows the same structure and response formats that the real Laravel API will use,
making it easy to swap out with the real implementation later.

## Usage

Import the mock API functions in your components and use them as if they were real API calls.

Example:
```typescript
import { login } from '../backend/api/auth';

const handleLogin = async (credentials) => {
  try {
    const response = await login(credentials);
    // Handle successful login
  } catch (error) {
    // Handle error
  }
};
```

When the real backend is implemented, you'll only need to replace the import path to the real API service.
