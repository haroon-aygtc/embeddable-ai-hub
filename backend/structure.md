
# Backend Structure for AI Chat Hub

This document outlines the planned directory structure and components for the Laravel backend.

## Application Structure

```
backend/
├── app/
│   ├── Console/             # Console commands
│   ├── Exceptions/          # Exception handling
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── API/         # API Controllers
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── AIModelController.php
│   │   │   │   ├── ChatController.php
│   │   │   │   ├── KnowledgeBaseController.php
│   │   │   │   ├── PromptTemplateController.php
│   │   │   │   ├── UserController.php
│   │   │   │   ├── FollowUpController.php
│   │   │   │   ├── WidgetController.php
│   │   │   │   └── AnalyticsController.php
│   │   │   └── Controller.php
│   │   ├── Middleware/      # Request middleware
│   │   └── Requests/        # Form validation requests
│   ├── Models/              # Eloquent models
│   │   ├── User.php
│   │   ├── AIModel.php
│   │   ├── Chat.php
│   │   ├── ChatMessage.php
│   │   ├── KnowledgeBase.php
│   │   ├── KnowledgeDocument.php
│   │   ├── PromptTemplate.php
│   │   ├── FollowUp.php
│   │   ├── FollowUpNode.php
│   │   ├── Widget.php
│   │   └── Tenant.php
│   ├── Services/            # Business logic services
│   │   ├── AIService.php
│   │   ├── ChatService.php
│   │   ├── KnowledgeService.php
│   │   ├── FollowUpService.php
│   │   └── AnalyticsService.php
│   └── Repositories/        # Data access layer
│       ├── AIModelRepository.php
│       ├── ChatRepository.php
│       ├── KnowledgeRepository.php
│       ├── PromptTemplateRepository.php
│       └── FollowUpRepository.php
├── config/                  # Configuration files
├── database/                # Database migrations and seeders
│   ├── migrations/
│   │   ├── 2014_10_12_000000_create_users_table.php
│   │   ├── 2023_01_01_000001_create_ai_models_table.php
│   │   ├── 2023_01_01_000002_create_chats_table.php
│   │   ├── 2023_01_01_000003_create_chat_messages_table.php
│   │   ├── 2023_01_01_000004_create_knowledge_bases_table.php
│   │   ├── 2023_01_01_000005_create_knowledge_documents_table.php
│   │   ├── 2023_01_01_000006_create_prompt_templates_table.php
│   │   ├── 2023_01_01_000007_create_follow_ups_table.php
│   │   ├── 2023_01_01_000008_create_follow_up_nodes_table.php
│   │   ├── 2023_01_01_000009_create_widgets_table.php
│   │   └── 2023_01_01_000010_create_tenants_table.php
│   └── seeders/
│       ├── DatabaseSeeder.php
│       ├── UserSeeder.php
│       ├── AIModelSeeder.php
│       └── PromptTemplateSeeder.php
├── routes/                 # API routes
│   ├── api.php
│   └── channels.php
├── storage/                # Storage for logs, cache, etc.
└── tests/                  # Application tests
```

## API Endpoints

The following API endpoints will be implemented:

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/user` - Get authenticated user
- `PUT /api/auth/user` - Update user profile

### AI Models
- `GET /api/models` - List all AI models
- `GET /api/models/{id}` - Get specific AI model
- `POST /api/models` - Create new AI model
- `PUT /api/models/{id}` - Update AI model
- `DELETE /api/models/{id}` - Delete AI model
- `PUT /api/models/{id}/toggle-default` - Toggle default status
- `PUT /api/models/{id}/toggle-status` - Toggle active status

### Chat Management
- `GET /api/chats` - List all chats
- `GET /api/chats/{id}` - Get specific chat
- `POST /api/chats` - Create new chat
- `PUT /api/chats/{id}` - Update chat
- `DELETE /api/chats/{id}` - Delete chat
- `GET /api/chats/{id}/messages` - Get chat messages
- `POST /api/chats/{id}/messages` - Send new message

### Knowledge Base
- `GET /api/knowledge-bases` - List all knowledge bases
- `GET /api/knowledge-bases/{id}` - Get specific knowledge base
- `POST /api/knowledge-bases` - Create new knowledge base
- `PUT /api/knowledge-bases/{id}` - Update knowledge base
- `DELETE /api/knowledge-bases/{id}` - Delete knowledge base
- `GET /api/knowledge-bases/{id}/documents` - Get knowledge base documents
- `POST /api/knowledge-bases/{id}/documents` - Add document to knowledge base
- `DELETE /api/knowledge-bases/{id}/documents/{documentId}` - Remove document

### Prompt Templates
- `GET /api/prompts` - List all prompt templates
- `GET /api/prompts/{id}` - Get specific prompt template
- `POST /api/prompts` - Create new prompt template
- `PUT /api/prompts/{id}` - Update prompt template
- `DELETE /api/prompts/{id}` - Delete prompt template

### Follow-ups
- `GET /api/follow-ups` - List all follow-up flows
- `GET /api/follow-ups/{id}` - Get specific follow-up flow
- `POST /api/follow-ups` - Create new follow-up flow
- `PUT /api/follow-ups/{id}` - Update follow-up flow
- `DELETE /api/follow-ups/{id}` - Delete follow-up flow
- `POST /api/follow-ups/{id}/nodes` - Add node to follow-up flow
- `PUT /api/follow-ups/{id}/nodes/{nodeId}` - Update node
- `DELETE /api/follow-ups/{id}/nodes/{nodeId}` - Delete node

### Widgets
- `GET /api/widgets` - List all widgets
- `GET /api/widgets/{id}` - Get specific widget
- `POST /api/widgets` - Create new widget
- `PUT /api/widgets/{id}` - Update widget
- `DELETE /api/widgets/{id}` - Delete widget
- `GET /api/widgets/{id}/embed-code` - Get widget embed code

### Analytics
- `GET /api/analytics/chat-usage` - Get chat usage statistics
- `GET /api/analytics/user-engagement` - Get user engagement metrics
- `GET /api/analytics/model-performance` - Get AI model performance stats

## Database Schema

Brief overview of key database tables:

### Users Table
- id (primary key)
- name
- email
- password
- role (enum: admin, manager, user)
- tenant_id (foreign key, for multi-tenant setup)
- created_at
- updated_at

### AI Models Table
- id (primary key)
- name
- provider
- description
- api_key (encrypted)
- base_url
- model_type (enum: chat, completion, etc.)
- max_tokens
- temperature
- is_default (boolean)
- status (enum: active, inactive, testing)
- capabilities (json)
- tenant_id (foreign key)
- created_at
- updated_at

### Follow-ups Table
- id (primary key)
- name
- description
- status (enum: active, inactive, draft)
- tenant_id (foreign key)
- created_at
- updated_at

### Follow-up Nodes Table
- id (primary key)
- follow_up_id (foreign key)
- type (enum: email, task, conditional, etc.)
- content
- delay
- delay_unit (enum: minutes, hours, days)
- conditions (json)
- sequence_order
- created_at
- updated_at
