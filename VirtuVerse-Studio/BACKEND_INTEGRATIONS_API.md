# Backend Integration API Documentation

This document describes the backend integration endpoints for VirtuVerse Studio.

## Table of Contents

- [VM Connection API](#vm-connection-api)
- [PostgreSQL API](#postgresql-api)
- [JFrog Artifactory API](#jfrog-artifactory-api)
- [GitHub API](#github-api)
- [Azure AI API](#azure-ai-api)
- [Integration Status](#integration-status)

## Authentication

All endpoints require authentication using a JWT token. Include the token in the `Authorization` header:

```
Authorization: Bearer <your-jwt-token>
```

## VM Connection API

Endpoints for connecting to virtual machines to access tools for editing/modifying models.

### Base URL
`/api/vm`

### Endpoints

#### GET /api/vm/status
Get VM connection status and configuration.

**Response:**
```json
{
  "status": "configured",
  "host": "localhost",
  "port": 22,
  "username": "vmuser",
  "toolsPath": "/opt/virtuverse/tools"
}
```

#### POST /api/vm/test
Test the VM connection.

**Response:**
```json
{
  "status": "success",
  "message": "VM connection successful"
}
```

#### POST /api/vm/execute
Execute a command on the VM.

**Request Body:**
```json
{
  "command": "ls -la /opt/virtuverse/tools"
}
```

**Response:**
```json
{
  "status": "success",
  "result": {
    "stdout": "...",
    "stderr": "",
    "exitCode": 0
  }
}
```

#### GET /api/vm/tools
List available tools on the VM.

**Response:**
```json
{
  "status": "success",
  "toolsPath": "/opt/virtuverse/tools",
  "tools": "..."
}
```

## PostgreSQL API

Endpoints for PostgreSQL database operations.

### Base URL
`/api/postgres`

### Endpoints

#### GET /api/postgres/test
Test the PostgreSQL connection.

**Response:**
```json
{
  "status": "success",
  "message": "PostgreSQL connection successful",
  "timestamp": "2024-01-31T12:00:00.000Z"
}
```

#### GET /api/postgres/info
Get PostgreSQL connection information.

**Response:**
```json
{
  "host": "localhost",
  "port": 5432,
  "database": "virtuverse_db",
  "user": "virtuverse_user",
  "ssl": false
}
```

#### POST /api/postgres/query
Execute a SELECT query (admin only).

**Request Body:**
```json
{
  "query": "SELECT * FROM users LIMIT 10",
  "params": []
}
```

**Response:**
```json
{
  "status": "success",
  "rowCount": 10,
  "rows": [...],
  "fields": [...]
}
```

#### GET /api/postgres/stats
Get database statistics.

**Response:**
```json
{
  "status": "success",
  "database": "virtuverse_db",
  "size": "12 MB",
  "tables": 5,
  "activeConnections": 3
}
```

## JFrog Artifactory API

Endpoints for JFrog Artifactory integration.

### Base URL
`/api/jfrog`

### Endpoints

#### GET /api/jfrog/test
Test the JFrog Artifactory connection.

**Response:**
```json
{
  "status": "success",
  "message": "JFrog Artifactory connection successful",
  "response": "OK"
}
```

#### GET /api/jfrog/repositories
Get list of repositories.

**Response:**
```json
{
  "status": "success",
  "repositories": [...]
}
```

#### GET /api/jfrog/artifacts/:repo
List artifacts in a repository.

**Query Parameters:**
- `path` - Path within the repository (optional)

**Response:**
```json
{
  "status": "success",
  "repository": "virtuverse-repo",
  "path": "",
  "artifacts": {...}
}
```

#### POST /api/jfrog/artifacts/:repo
Upload an artifact.

**Request Body:**
```json
{
  "path": "models/my-model.zip",
  "content": "base64-encoded-content"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Artifact uploaded successfully",
  "response": {...}
}
```

#### GET /api/jfrog/artifacts/:repo/download
Download an artifact.

**Query Parameters:**
- `path` - Path to the artifact (required)

**Response:**
Binary content of the artifact

#### DELETE /api/jfrog/artifacts/:repo
Delete an artifact (admin only).

**Query Parameters:**
- `path` - Path to the artifact (required)

**Response:**
```json
{
  "status": "success",
  "message": "Artifact deleted successfully",
  "response": {...}
}
```

#### POST /api/jfrog/search
Search for artifacts.

**Request Body:**
```json
{
  "name": "model-*.zip",
  "repos": ["virtuverse-repo"]
}
```

**Response:**
```json
{
  "status": "success",
  "results": [...]
}
```

## GitHub API

Endpoints for GitHub repository integration.

### Base URL
`/api/github`

### Endpoints

#### GET /api/github/test
Test the GitHub connection.

**Response:**
```json
{
  "status": "success",
  "message": "GitHub connection successful",
  "user": "username"
}
```

#### GET /api/github/repository
Get repository information.

**Response:**
```json
{
  "status": "success",
  "repository": {
    "name": "virtuverse",
    "fullName": "org/virtuverse",
    "description": "...",
    "private": false,
    "url": "https://github.com/org/virtuverse",
    "defaultBranch": "main",
    "stars": 10,
    "forks": 5,
    "openIssues": 2,
    "language": "JavaScript",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

#### GET /api/github/branches
List repository branches.

**Response:**
```json
{
  "status": "success",
  "branches": [
    {
      "name": "main",
      "commit": "abc123...",
      "protected": true
    }
  ]
}
```

#### GET /api/github/commits
List commits.

**Query Parameters:**
- `branch` - Branch name (optional)
- `per_page` - Number of results per page (default: 10)

**Response:**
```json
{
  "status": "success",
  "commits": [
    {
      "sha": "abc123...",
      "message": "commit message",
      "author": "John Doe",
      "date": "2024-01-31T12:00:00Z",
      "url": "https://github.com/..."
    }
  ]
}
```

#### GET /api/github/content
Get file content from repository.

**Query Parameters:**
- `path` - File path (required)
- `ref` - Branch/tag/commit (optional)

**Response:**
```json
{
  "status": "success",
  "file": {
    "name": "README.md",
    "path": "README.md",
    "type": "file",
    "size": 1234,
    "sha": "abc123...",
    "content": "file content",
    "url": "https://github.com/..."
  }
}
```

#### POST /api/github/content
Create or update a file (admin only).

**Request Body:**
```json
{
  "path": "path/to/file.txt",
  "content": "file content",
  "message": "commit message",
  "branch": "main",
  "sha": "abc123..." // Required for updates
}
```

**Response:**
```json
{
  "status": "success",
  "message": "File created/updated successfully",
  "commit": {
    "sha": "def456...",
    "url": "https://github.com/..."
  }
}
```

#### GET /api/github/pulls
List pull requests.

**Query Parameters:**
- `state` - State filter (default: open)
- `per_page` - Number of results per page (default: 10)

**Response:**
```json
{
  "status": "success",
  "pullRequests": [
    {
      "number": 123,
      "title": "PR title",
      "state": "open",
      "author": "username",
      "createdAt": "...",
      "updatedAt": "...",
      "url": "https://github.com/..."
    }
  ]
}
```

#### GET /api/github/issues
List issues.

**Query Parameters:**
- `state` - State filter (default: open)
- `per_page` - Number of results per page (default: 10)

**Response:**
```json
{
  "status": "success",
  "issues": [
    {
      "number": 456,
      "title": "Issue title",
      "state": "open",
      "author": "username",
      "labels": ["bug", "high-priority"],
      "createdAt": "...",
      "updatedAt": "...",
      "url": "https://github.com/..."
    }
  ]
}
```

## Azure AI API

Endpoints for Azure OpenAI integration (AI Chatbot).

### Base URL
`/api/azureai`

### Endpoints

#### GET /api/azureai/test
Test the Azure AI connection.

**Response:**
```json
{
  "status": "success",
  "message": "Azure AI connection successful",
  "model": "gpt-4",
  "response": "Hello! How can I help you?"
}
```

#### GET /api/azureai/info
Get Azure AI configuration information.

**Response:**
```json
{
  "endpoint": "https://your-resource.openai.azure.com/",
  "deploymentName": "gpt-4",
  "apiVersion": "2024-02-15-preview",
  "configured": true
}
```

#### POST /api/azureai/chat
Chat completion endpoint.

**Request Body:**
```json
{
  "messages": [
    {"role": "user", "content": "Hello!"}
  ],
  "temperature": 0.7,
  "maxTokens": 800
}
```

**Response:**
```json
{
  "status": "success",
  "response": {
    "id": "chatcmpl-...",
    "model": "gpt-4",
    "message": {
      "role": "assistant",
      "content": "Hello! How can I assist you today?"
    },
    "finishReason": "stop",
    "usage": {
      "promptTokens": 10,
      "completionTokens": 8,
      "totalTokens": 18
    }
  }
}
```

#### POST /api/azureai/chat/stream
Streaming chat completion endpoint.

**Request Body:**
```json
{
  "messages": [
    {"role": "user", "content": "Tell me about VirtuVerse"}
  ],
  "temperature": 0.7,
  "maxTokens": 800
}
```

**Response:**
Server-Sent Events (SSE) stream:
```
data: {"content": "VirtuVerse"}
data: {"content": " is"}
data: {"content": " a"}
...
data: [DONE]
```

#### POST /api/azureai/embeddings
Get text embeddings.

**Request Body:**
```json
{
  "input": "Text to embed"
}
```

**Response:**
```json
{
  "status": "success",
  "embeddings": [
    {
      "embedding": [0.1, 0.2, ...],
      "index": 0
    }
  ],
  "usage": {
    "promptTokens": 5,
    "totalTokens": 5
  }
}
```

#### POST /api/azureai/analyze-model
AI assistant for model analysis.

**Request Body:**
```json
{
  "modelData": {
    "name": "vehicle_model",
    "type": "simulink",
    "interfaces": [...]
  },
  "analysisType": "compatibility" // or "integration", "optimization", "general"
}
```

**Response:**
```json
{
  "status": "success",
  "analysis": {
    "type": "compatibility",
    "content": "Analysis results...",
    "model": "gpt-4"
  }
}
```

#### POST /api/azureai/chatbot
AI chatbot for general assistance.

**Request Body:**
```json
{
  "message": "How do I use V-Orchestrator?",
  "conversationHistory": [
    {"role": "user", "content": "Previous message"},
    {"role": "assistant", "content": "Previous response"}
  ]
}
```

**Response:**
```json
{
  "status": "success",
  "response": "V-Orchestrator is used for...",
  "conversationId": "1234567890"
}
```

## Integration Status

### GET /api/integrations/status
Get status of all integrations.

**Response:**
```json
{
  "status": "success",
  "integrations": {
    "vm": {
      "configured": true,
      "host": "localhost",
      "endpoint": "/api/vm"
    },
    "postgres": {
      "configured": true,
      "host": "localhost",
      "database": "virtuverse_db",
      "endpoint": "/api/postgres"
    },
    "jfrog": {
      "configured": true,
      "url": "https://your-domain.jfrog.io",
      "repository": "virtuverse-repo",
      "endpoint": "/api/jfrog"
    },
    "github": {
      "configured": true,
      "owner": "your_org",
      "repo": "virtuverse",
      "endpoint": "/api/github"
    },
    "azureai": {
      "configured": true,
      "endpoint": "https://your-resource.openai.azure.com/",
      "deployment": "gpt-4",
      "apiEndpoint": "/api/azureai"
    }
  },
  "timestamp": "2024-01-31T12:00:00.000Z"
}
```

## Environment Configuration

All integrations require proper environment variables to be set in `.env` file:

```bash
# PostgreSQL Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=virtuverse_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=virtuverse_db
POSTGRES_SSL=false

# VM Connection Configuration
VM_SSH_HOST=localhost
VM_SSH_PORT=22
VM_SSH_USER=vmuser
VM_SSH_PRIVATE_KEY_PATH=/path/to/private/key
VM_TOOLS_PATH=/opt/virtuverse/tools

# JFrog Artifactory Configuration
JFROG_URL=https://your-domain.jfrog.io
JFROG_USERNAME=your_jfrog_username
JFROG_PASSWORD=your_jfrog_password
JFROG_API_KEY=your_jfrog_api_key
JFROG_REPOSITORY=virtuverse-repo

# GitHub Configuration
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_OWNER=your_github_org_or_user
GITHUB_REPO=virtuverse
GITHUB_API_URL=https://api.github.com

# Azure AI Configuration
AZURE_OPENAI_API_KEY=your_azure_openai_api_key
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4
AZURE_OPENAI_API_VERSION=2024-02-15-preview
```

## Error Handling

All endpoints return errors in a consistent format:

```json
{
  "status": "failed",
  "error": "Error message",
  "message": "Additional context"
}
```

Common HTTP status codes:
- `200` - Success
- `400` - Bad request (missing or invalid parameters)
- `401` - Unauthorized (missing or invalid JWT token)
- `403` - Forbidden (insufficient permissions)
- `500` - Internal server error

## Security Notes

1. All endpoints require authentication using JWT tokens
2. Some endpoints (marked as "admin only") require admin role
3. Sensitive operations like file updates and deletions are restricted to admins
4. All external API calls are validated and sanitized
5. SQL queries are limited to SELECT statements for safety
6. File uploads and downloads are validated for security
