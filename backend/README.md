
# AI Chat Hub Backend

This directory contains the Laravel backend code for the AI Chat Hub application.

## Directory Structure

- `app/` - Main application code
  - `Models/` - Laravel Eloquent models
  - `Http/Controllers/API/` - API Controllers
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

## Installation

To set up the Laravel backend:

1. Clone the repository
2. Navigate to the backend directory
3. Run `composer install`
4. Copy `.env.example` to `.env` and configure your database settings
5. Run `php artisan key:generate`
6. Run database migrations with `php artisan migrate`
7. Seed the database with `php artisan db:seed`
8. Start the development server with `php artisan serve`

## Available API Endpoints

### Follow-ups
- `GET /api/follow-ups` - List all follow-up flows
- `GET /api/follow-ups/{id}` - Get specific follow-up flow
- `POST /api/follow-ups` - Create new follow-up flow
- `PUT /api/follow-ups/{id}` - Update follow-up flow
- `DELETE /api/follow-ups/{id}` - Delete follow-up flow
- `POST /api/follow-ups/{id}/nodes` - Add node to follow-up flow
- `PUT /api/follow-ups/{id}/nodes/{nodeId}` - Update node
- `DELETE /api/follow-ups/{id}/nodes/{nodeId}` - Delete node
