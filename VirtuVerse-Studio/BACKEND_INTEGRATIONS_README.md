# Backend Integrations Setup Guide

This guide explains how to set up and use the backend integrations for VirtuVerse Studio.

## Overview

VirtuVerse Studio now supports the following backend integrations:

1. **VM Connection** - Connect to virtual machines for accessing tools to edit/modify models
2. **PostgreSQL Database** - Connect to PostgreSQL for advanced data storage
3. **JFrog Artifactory** - Manage and store artifacts in JFrog Artifactory
4. **GitHub Repository** - Integrate with GitHub repositories for version control
5. **Azure AI** - Use Azure OpenAI for AI-powered chatbot and model analysis

## Prerequisites

- Node.js v14 or higher
- npm or yarn
- Access to the external services you want to integrate with

## Installation

1. Install the required dependencies:
```bash
cd VirtuVerse-Studio
npm install
```

This will install the following new packages:
- `pg` - PostgreSQL client
- `axios` - HTTP client for API calls
- `openai` - OpenAI SDK (with Azure support)
- `ssh2` - SSH2 client for VM connections

## Configuration

### Environment Variables

Copy the `.env.example` file to `.env` and configure the integration settings:

```bash
cp .env.example .env
```

Then edit `.env` with your credentials:

#### PostgreSQL Configuration
```bash
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=virtuverse_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=virtuverse_db
POSTGRES_SSL=false
```

#### VM Connection Configuration
```bash
VM_SSH_HOST=localhost
VM_SSH_PORT=22
VM_SSH_USER=vmuser
VM_SSH_PRIVATE_KEY_PATH=/path/to/private/key
# OR use password instead of key
VM_SSH_PASSWORD=your_password
VM_TOOLS_PATH=/opt/virtuverse/tools
```

#### JFrog Artifactory Configuration
```bash
JFROG_URL=https://your-domain.jfrog.io
JFROG_USERNAME=your_jfrog_username
JFROG_PASSWORD=your_jfrog_password
# OR use API key instead
JFROG_API_KEY=your_jfrog_api_key
JFROG_REPOSITORY=virtuverse-repo
```

#### GitHub Configuration
```bash
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_OWNER=your_github_org_or_user
GITHUB_REPO=virtuverse
GITHUB_API_URL=https://api.github.com
```

To create a GitHub Personal Access Token:
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate new token with required permissions (repo, read:org)
3. Copy the token to your `.env` file

#### Azure AI Configuration
```bash
AZURE_OPENAI_API_KEY=your_azure_openai_api_key
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4
AZURE_OPENAI_API_VERSION=2024-02-15-preview
```

To get Azure OpenAI credentials:
1. Create an Azure OpenAI resource in Azure Portal
2. Deploy a model (e.g., GPT-4)
3. Get the endpoint and API key from the resource

## Usage

### Starting the Server

```bash
cd VirtuVerse-Studio
npm start
```

Or in development mode:
```bash
npm run dev:backend
```

### Testing Integrations

Run the integration test script to verify all endpoints are working:

```bash
cd VirtuVerse-Studio
./test-integrations.sh
```

This will test:
- Health check endpoint
- All integration endpoints (authentication required)
- Proper error handling

### API Endpoints

All integration endpoints are protected with JWT authentication. You need to:

1. Login to get a JWT token:
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@virtuverse.com", "password": "Admin@123"}'
```

2. Use the token in subsequent requests:
```bash
curl -X GET http://localhost:5001/api/integrations/status \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

For detailed API documentation, see [BACKEND_INTEGRATIONS_API.md](BACKEND_INTEGRATIONS_API.md)

## Integration Details

### 1. VM Connection

The VM integration allows you to:
- Connect to remote VMs via SSH
- Execute commands on the VM
- List available tools
- Access model editing tools

**Example Use Case:**
```bash
# Get VM status
GET /api/vm/status

# List available tools
GET /api/vm/tools

# Execute a command
POST /api/vm/execute
{
  "command": "ls -la /opt/virtuverse/tools"
}
```

### 2. PostgreSQL Database

The PostgreSQL integration provides:
- Database connection testing
- Query execution (admin only)
- Database statistics
- Connection pool management

**Example Use Case:**
```bash
# Test connection
GET /api/postgres/test

# Get database stats
GET /api/postgres/stats

# Execute query (admin only)
POST /api/postgres/query
{
  "query": "SELECT * FROM models LIMIT 10",
  "params": []
}
```

### 3. JFrog Artifactory

The JFrog integration enables:
- Artifact storage and retrieval
- Repository management
- Search functionality
- Upload/download artifacts

**Example Use Case:**
```bash
# List artifacts
GET /api/jfrog/artifacts/virtuverse-repo

# Upload artifact
POST /api/jfrog/artifacts/virtuverse-repo
{
  "path": "models/vehicle_model.zip",
  "content": "base64-encoded-content"
}

# Download artifact
GET /api/jfrog/artifacts/virtuverse-repo/download?path=models/vehicle_model.zip
```

### 4. GitHub Repository

The GitHub integration supports:
- Repository information
- Branch and commit history
- File content access
- Pull requests and issues
- File creation/updates (admin only)

**Example Use Case:**
```bash
# Get repository info
GET /api/github/repository

# List branches
GET /api/github/branches

# Get file content
GET /api/github/content?path=README.md

# List pull requests
GET /api/github/pulls
```

### 5. Azure AI

The Azure AI integration provides:
- Chat completions
- Streaming responses
- Text embeddings
- Model analysis
- AI chatbot assistance

**Example Use Case:**
```bash
# Test connection
GET /api/azureai/test

# Chat completion
POST /api/azureai/chat
{
  "messages": [
    {"role": "user", "content": "How do I use V-Orchestrator?"}
  ],
  "temperature": 0.7,
  "maxTokens": 800
}

# Model analysis
POST /api/azureai/analyze-model
{
  "modelData": {
    "name": "vehicle_model",
    "type": "simulink"
  },
  "analysisType": "compatibility"
}

# Chatbot
POST /api/azureai/chatbot
{
  "message": "What tools are available in VirtuVerse?",
  "conversationHistory": []
}
```

## Security Considerations

1. **Environment Variables**: Never commit `.env` file to version control
2. **JWT Tokens**: Keep your JWT secret secure and rotate it regularly
3. **Admin Access**: Some endpoints require admin role for destructive operations
4. **API Keys**: Store API keys securely and limit their permissions
5. **SSH Keys**: Use SSH keys instead of passwords for VM access when possible
6. **HTTPS**: Always use HTTPS in production environments

## Troubleshooting

### Connection Issues

1. **PostgreSQL**: Ensure PostgreSQL server is running and accessible
2. **VM**: Check SSH credentials and network connectivity
3. **JFrog**: Verify URL and authentication credentials
4. **GitHub**: Ensure token has required permissions
5. **Azure AI**: Verify endpoint URL and API key

### Common Errors

**"Cannot open database because the directory does not exist"**
- Create the database directory: `mkdir -p backend/database`

**"PostgreSQL connection failed"**
- Check PostgreSQL credentials in `.env`
- Ensure PostgreSQL server is running
- Verify network connectivity

**"Azure AI connection failed"**
- Verify API key and endpoint in `.env`
- Check deployment name matches your Azure configuration

**"VM connection timeout"**
- Check SSH credentials
- Verify VM is accessible from your network
- Ensure SSH port is open

## Testing

### Manual Testing

Use curl or Postman to test endpoints:

```bash
# Health check (no auth required)
curl http://localhost:5001/api/health

# Integration status (requires auth)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5001/api/integrations/status
```

### Automated Testing

Run the test script:

```bash
./test-integrations.sh
```

## Support

For issues or questions:
1. Check the API documentation: [BACKEND_INTEGRATIONS_API.md](BACKEND_INTEGRATIONS_API.md)
2. Review server logs for error messages
3. Verify environment variables are correctly set
4. Contact the development team

## Roadmap

Future enhancements:
- [ ] Additional cloud storage integrations (AWS S3, Azure Blob)
- [ ] Enhanced AI features (fine-tuning, custom models)
- [ ] Advanced PostgreSQL migrations
- [ ] WebSocket support for real-time updates
- [ ] Enhanced monitoring and logging
