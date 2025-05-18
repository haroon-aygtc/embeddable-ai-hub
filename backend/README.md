
# AI Chat Hub Backend

This directory contains the Laravel backend code for the AI Chat Hub application.

## Directory Structure

- `app/` - Main application code
  - `Models/` - Laravel Eloquent models
  - `Controllers/` - API Controllers
  - `Services/` - Business logic services
  - `Repositories/` - Data access layer
  - `Middleware/` - Request middleware
- `routes/` - API routes
- `database/` - Migrations and seeders
- `config/` - Configuration files

## API Documentation

The backend provides RESTful API endpoints for the following features:
- Authentication & User Management
- Widget Configuration
- AI Models Management
- Chat Management
- Knowledge Base
- Prompt Templates
- Analytics & Reporting

## Mock API (Development Only)

During frontend development, mock API services are available in the `backend/api` directory:

```typescript
// Import the mock API functions
import { login, register, getCurrentUser } from '../backend/api';

// Use them as if they were real API calls
const handleLogin = async (credentials) => {
  try {
    const response = await login(credentials);
    // Handle successful login
  } catch (error) {
    // Handle error
  }
};
```

When the real Laravel backend is implemented, you'll only need to update the import paths to point to the real API service.

## Installation

To set up the Laravel backend (when implemented):

1. Clone the repository
2. Navigate to the backend directory
3. Run `composer install`
4. Copy `.env.example` to `.env` and configure your database settings
5. Run `php artisan key:generate`
6. Run database migrations with `php artisan migrate`
7. Seed the database with `php artisan db:seed`
8. Start the development server with `php artisan serve`

## Available API Endpoints

See `structure.md` for a complete list of planned API endpoints.
