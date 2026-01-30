# VirtuVerse Platform API Documentation

Complete API reference for VirtuVerse Studio, VirtuSpace, and VirtuSphere backend services.

## Base URLs

When deployed to Azure:
- **VirtuVerse Studio**: `https://virtuverse-studio.azurewebsites.net`
- **VirtuSpace**: `https://virtuspace.azurewebsites.net`
- **VirtuSphere V-Analyzer**: `https://virtusphere-analyzer.azurewebsites.net`
- **VirtuSphere V-DevContainers**: `https://virtusphere-devcontainers.azurewebsites.net`

Local development:
- **VirtuVerse Studio**: `http://localhost:5001`
- **VirtuSpace**: `http://localhost:3003`
- **VirtuSphere V-Analyzer**: `http://localhost:3020`
- **VirtuSphere V-DevContainers**: `http://localhost:3030`

## VirtuVerse Studio API

### Authentication Endpoints

#### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
```

**Response:** `201 Created`
```json
{
  "message": "User registered successfully",
  "userId": 1
}
```

#### POST /api/auth/login
Login to get JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user"
  }
}
```

### Workspace Endpoints

All workspace endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

#### GET /api/workspaces
Get all workspaces for the current user.

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "My Simulation Workspace",
    "description": "Main workspace for vehicle simulations",
    "type": "simulation",
    "status": "active",
    "created_at": "2024-01-30T10:00:00.000Z",
    "updated_at": "2024-01-30T10:00:00.000Z"
  }
]
```

#### POST /api/workspaces
Create a new workspace.

**Request Body:**
```json
{
  "name": "New Workspace",
  "description": "Description of the workspace",
  "type": "simulation"
}
```

**Response:** `201 Created`
```json
{
  "id": 2,
  "name": "New Workspace",
  "description": "Description of the workspace",
  "type": "simulation",
  "status": "active",
  "message": "Workspace created successfully"
}
```

#### GET /api/workspaces/:id
Get workspace by ID.

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "My Simulation Workspace",
  "description": "Main workspace for vehicle simulations",
  "type": "simulation",
  "status": "active",
  "created_at": "2024-01-30T10:00:00.000Z",
  "updated_at": "2024-01-30T10:00:00.000Z"
}
```

#### PUT /api/workspaces/:id
Update workspace.

**Request Body:**
```json
{
  "name": "Updated Workspace Name",
  "description": "Updated description",
  "status": "archived"
}
```

**Response:** `200 OK`
```json
{
  "message": "Workspace updated successfully"
}
```

#### DELETE /api/workspaces/:id
Delete workspace.

**Response:** `200 OK`
```json
{
  "message": "Workspace deleted successfully"
}
```

### Project Endpoints

#### GET /api/projects/workspace/:workspaceId
Get all projects in a workspace.

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "workspace_id": 1,
    "name": "Vehicle Model Project",
    "description": "FMU-based vehicle simulation",
    "type": "simulation",
    "config": {
      "models": ["vehicle.fmu", "environment.fmu"],
      "timestep": 0.01
    },
    "status": "active",
    "created_at": "2024-01-30T10:00:00.000Z",
    "updated_at": "2024-01-30T10:00:00.000Z"
  }
]
```

#### POST /api/projects
Create a new project.

**Request Body:**
```json
{
  "workspace_id": 1,
  "name": "New Project",
  "description": "Project description",
  "type": "simulation",
  "config": {
    "models": [],
    "timestep": 0.01
  }
}
```

**Response:** `201 Created`
```json
{
  "id": 2,
  "workspace_id": 1,
  "name": "New Project",
  "description": "Project description",
  "type": "simulation",
  "config": { "models": [], "timestep": 0.01 },
  "status": "active",
  "message": "Project created successfully"
}
```

#### GET /api/projects/:id
Get project by ID.

#### PUT /api/projects/:id
Update project.

#### DELETE /api/projects/:id
Delete project.

### Integration Endpoints

#### GET /api/integrations/status
Get integration status for all connected services.

**Response:** `200 OK`
```json
{
  "virtuspace": {
    "url": "https://virtuspace.azurewebsites.net",
    "status": "healthy",
    "details": {
      "status": "ok",
      "message": "VirtuSpace API is running"
    }
  },
  "virtusphere": {
    "analyzer": {
      "url": "https://virtusphere-analyzer.azurewebsites.net",
      "status": "healthy",
      "details": { "status": "healthy", "service": "V-Analyzer API" }
    },
    "devcontainers": {
      "url": "https://virtusphere-devcontainers.azurewebsites.net",
      "status": "healthy",
      "details": { "status": "healthy", "service": "V-DevContainers API" }
    }
  },
  "overall": "partial"
}
```

#### ALL /api/integrations/virtuspace/*
Proxy requests to VirtuSpace API.

**Example:**
```
GET /api/integrations/virtuspace/models
→ Proxied to VirtuSpace: GET /api/models
```

#### ALL /api/integrations/virtusphere/analyzer/*
Proxy requests to VirtuSphere V-Analyzer API.

#### ALL /api/integrations/virtusphere/devcontainers/*
Proxy requests to VirtuSphere V-DevContainers API.

#### GET /api/integrations/metrics
Get aggregated metrics from all services.

### Health Check

#### GET /api/health
Check if the service is running.

**Response:** `200 OK`
```json
{
  "status": "healthy",
  "service": "VirtuVerse API",
  "timestamp": "2024-01-30T12:00:00.000Z"
}
```

## VirtuSpace API

### Configuration Endpoints

#### GET /api/config
Get all configuration connections.

**Response:** `200 OK`
```json
[
  {
    "id": "jfrog",
    "name": "JFrog Artifactory",
    "type": "artifactory",
    "url": "https://artifactory.bosch.com",
    "status": "disconnected"
  }
]
```

#### PUT /api/config/:id
Update connection configuration.

#### POST /api/config/:id/test
Test connection to external service.

#### POST /api/config/:id/sync
Sync artifacts from external service.

### Model Endpoints

#### GET /api/models
Get all models.

#### POST /api/models
Upload new model.

#### GET /api/models/:id
Get model details.

### Tool Endpoints

#### GET /api/tools
Get all available tools.

### Metadata Endpoints

#### GET /api/metadata
Get metadata.

### AI Agent Endpoints

#### POST /api/aiagent
Interact with AI agent.

### Health Check

#### GET /api/health
**Response:** `200 OK`
```json
{
  "status": "ok",
  "message": "VirtuSpace API is running"
}
```

## VirtuSphere V-Analyzer API

### Dashboard Endpoints

#### GET /api/dashboards
Get all available dashboards.

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "Simulation Results Dashboard",
    "type": "simulation",
    "description": "Visualization of open-loop and closed-loop simulation results",
    "panels": 4,
    "lastUpdated": "2024-01-30T10:00:00.000Z"
  }
]
```

#### GET /api/dashboards/:id
Get dashboard by ID.

### Metrics Endpoints

#### GET /api/metrics
Get current metrics.

**Response:** `200 OK`
```json
{
  "simulations": {
    "total": 156,
    "today": 23,
    "running": 3,
    "success_rate": 94.5
  },
  "platform": {
    "uptime": 99.8,
    "response_time": 245,
    "active_users": 48,
    "error_rate": 0.02
  },
  "usage": {
    "envihub_requests": 1247,
    "planthub_requests": 892,
    "orchestrator_runs": 156,
    "analyzer_views": 342
  }
}
```

#### GET /api/timeseries/:metric
Get time-series data for a metric.

**Parameters:**
- `metric`: One of `simulations`, `response_time`, `active_users`

**Response:** `200 OK`
```json
[
  {
    "timestamp": "2024-01-30T10:00:00.000Z",
    "value": 15
  },
  {
    "timestamp": "2024-01-30T11:00:00.000Z",
    "value": 18
  }
]
```

### Health Check

#### GET /api/health
**Response:** `200 OK`
```json
{
  "status": "healthy",
  "service": "V-Analyzer API"
}
```

## VirtuSphere V-DevContainers API

### DevContainer Configuration Endpoints

#### GET /api/devcontainers
Get all DevContainer configurations.

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "Test DevContainer",
    "description": "Test configuration for VirtuVerse",
    "components": ["envihub", "planthub"],
    "baseImage": "mcr.microsoft.com/devcontainers/python:3.11",
    "features": ["docker-in-docker", "git"],
    "status": "created",
    "created_at": "2024-01-30T10:00:00.000Z",
    "updated_at": "2024-01-30T10:00:00.000Z"
  }
]
```

#### POST /api/devcontainers
Create new DevContainer configuration.

**Request Body:**
```json
{
  "name": "My DevContainer",
  "description": "Development environment for simulation",
  "components": ["envihub", "planthub"],
  "baseImage": "mcr.microsoft.com/devcontainers/python:3.11",
  "features": ["docker-in-docker", "git", "python"]
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "name": "My DevContainer",
  "description": "Development environment for simulation",
  "components": ["envihub", "planthub"],
  "baseImage": "mcr.microsoft.com/devcontainers/python:3.11",
  "features": ["docker-in-docker", "git", "python"],
  "status": "created",
  "created_at": "2024-01-30T10:00:00.000Z",
  "updated_at": "2024-01-30T10:00:00.000Z"
}
```

#### GET /api/devcontainers/:id
Get DevContainer configuration by ID.

#### PUT /api/devcontainers/:id
Update DevContainer configuration.

#### DELETE /api/devcontainers/:id
Delete DevContainer configuration.

#### POST /api/devcontainers/:id/generate
Generate DevContainer JSON configuration.

**Response:** `200 OK`
```json
{
  "config": {
    "name": "My DevContainer",
    "image": "mcr.microsoft.com/devcontainers/python:3.11",
    "features": {
      "ghcr.io/devcontainers/features/docker-in-docker:2": {},
      "ghcr.io/devcontainers/features/git:1": {},
      "ghcr.io/devcontainers/features/python:1": {}
    },
    "customizations": {
      "vscode": {
        "extensions": [
          "ms-vscode.cpptools",
          "ms-python.python",
          "ms-azuretools.vscode-docker"
        ]
      }
    },
    "forwardPorts": [3000, 5000, 8080],
    "postCreateCommand": "npm install",
    "remoteUser": "vscode"
  },
  "filename": ".devcontainer/devcontainer.json"
}
```

### Component Endpoints

#### GET /api/components
Get available VirtuSpace components.

**Response:** `200 OK`
```json
[
  {
    "id": "envihub",
    "name": "EnviHub",
    "description": "Environment simulation component",
    "type": "simulation",
    "dependencies": ["ipg-carmaker", "fmu-runtime"]
  }
]
```

### Base Image Endpoints

#### GET /api/base-images
Get available base images for DevContainers.

**Response:** `200 OK`
```json
[
  {
    "id": "ubuntu",
    "name": "Ubuntu",
    "image": "mcr.microsoft.com/devcontainers/base:ubuntu",
    "description": "Ubuntu-based development container"
  }
]
```

### Feature Endpoints

#### GET /api/features
Get available DevContainer features.

**Response:** `200 OK`
```json
[
  {
    "id": "docker-in-docker",
    "name": "Docker in Docker",
    "feature": "ghcr.io/devcontainers/features/docker-in-docker:2",
    "description": "Access Docker from inside the container"
  }
]
```

### Health Check

#### GET /api/health
**Response:** `200 OK`
```json
{
  "status": "healthy",
  "service": "V-DevContainers API",
  "timestamp": "2024-01-30T12:00:00.000Z"
}
```

## Authentication

Most VirtuVerse Studio endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

To obtain a token:
1. Register a user: `POST /api/auth/register`
2. Login: `POST /api/auth/login`
3. Use the returned token in subsequent requests

## Error Responses

All APIs return consistent error responses:

```json
{
  "error": "Error message describing what went wrong"
}
```

Common HTTP status codes:
- `200 OK`: Request succeeded
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Authentication required or invalid token
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Rate Limiting

Currently, no rate limiting is implemented. In production, consider implementing rate limiting to prevent abuse.

## CORS

All APIs support CORS for cross-origin requests. Configure the allowed origins in environment variables:
- VirtuVerse Studio: `FRONTEND_URL`
- VirtuSpace: No CORS restrictions (accepts all origins)
- VirtuSphere: No CORS restrictions (accepts all origins)
