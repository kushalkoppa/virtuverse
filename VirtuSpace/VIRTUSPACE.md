# VirtuSpace UI Documentation

## Overview

VirtuSpace is the unified parent platform for VirtuVerse Studio that brings together three powerful sub-platforms:
- **V-Orchestrator** - Cosimulation orchestration platform
- **EnviHub** - Environment modeling platform
- **PlantHub** - Plant modeling platform

All platforms are integrated with centralized Configuration Management (JFrog Artifactory & GitHub Enterprise Server) and an AI Agent for intelligent assistance.

## Features

### 1. VirtuSpace Landing Page

The VirtuSpace landing page (`/`) serves as the main entry point to the entire VirtuVerse ecosystem.

**Key Components:**
- **Platform Cards**: Visual cards for each of the three platforms with descriptions and launch buttons
- **Configuration Management Section**: Shows connection status to JFrog Artifactory and GitHub GHES
- **AI Agent Assistant**: Floating button to access the AI assistant
- **Architecture Diagram**: Visual representation of the platform architecture

**Screenshot:**
![VirtuSpace Landing Page](https://github.com/user-attachments/assets/9e9711db-3c5c-4f09-a860-4ac236e5a7c8)

### 2. AI Agent Assistant

The AI Agent provides intelligent assistance for model import and integration tasks.

**Capabilities:**
- Guide users through model import from JFrog/GitHub
- Suggest optimal integration strategies
- Check model compatibility
- Recommend cosimulation middleware
- Provide step-by-step guidance for model setup

**How to Use:**
1. Click the "AI Agent Assistant" button on the VirtuSpace landing page
2. Type your question in the input field
3. Receive intelligent guidance and recommendations

**Example Queries:**
- "How do I import models?"
- "Check compatibility between FMU and IPG models"
- "Which platform should I use for environment models?"
- "How to integrate models?"

**Screenshot:**
![AI Agent Open](https://github.com/user-attachments/assets/7e325be0-efaf-45d3-bef3-4b13b0045012)

### 3. Configuration Management

Configuration Management is integrated into all three platforms (V-Orchestrator, EnviHub, PlantHub) and provides centralized access to:
- **JFrog Artifactory** - Binary repository for model artifacts
- **GitHub Enterprise Server (GHES)** - Source code management at boschdevcloud.com

**Features:**
- Connect to JFrog Artifactory and GitHub GHES
- Test connections with credentials
- Sync models and artifacts
- Download artifacts from JFrog
- Clone repositories from GitHub

**Access:**
- From any platform, click "Config Mgmt" in the navigation menu
- Or navigate to `/<platform>/config` (e.g., `/envihub/config`)

**Configuration Fields:**

*JFrog Artifactory:*
- URL (e.g., https://artifactory.bosch.com)
- Username
- API Key
- Repository name

*GitHub Enterprise Server:*
- URL (e.g., https://boschdevcloud.com)
- Username
- Personal Access Token
- Organization
- Repository

**Screenshot:**
![Configuration Management](https://github.com/user-attachments/assets/2e485994-2333-4410-ba50-7ea8b0d4c018)

**Expanded Configuration:**
![Configuration Management Expanded](https://github.com/user-attachments/assets/259cb0e0-b910-499f-babd-27a25ea95728)

## Platform Navigation

### URL Structure

```
/                           - VirtuSpace landing page
/v-orchestrator            - V-Orchestrator dashboard
/v-orchestrator/library    - V-Orchestrator model library
/v-orchestrator/tools      - V-Orchestrator tool integration
/v-orchestrator/config     - V-Orchestrator configuration management
/envihub                   - EnviHub dashboard
/envihub/library           - EnviHub model library
/envihub/tools             - EnviHub tool integration
/envihub/config            - EnviHub configuration management
/envihub/metadata          - EnviHub metadata extractor
/envihub/editor            - EnviHub model editor
/planthub                  - PlantHub dashboard
/planthub/library          - PlantHub model library
/planthub/tools            - PlantHub tool integration
/planthub/config           - PlantHub configuration management
```

### Navigation Flow

1. Start at VirtuSpace landing page
2. Select a platform (V-Orchestrator, EnviHub, or PlantHub)
3. Access platform-specific features
4. Use Configuration Management to connect to JFrog/GitHub
5. Use AI Agent for guidance at any point

## Backend API Endpoints

### Configuration Management API

```
GET    /api/config              - List all connections
GET    /api/config/:id          - Get specific connection
PUT    /api/config/:id          - Update connection
POST   /api/config/:id/test     - Test connection
POST   /api/config/:id/sync     - Sync models/artifacts
GET    /api/config/:id/artifact/:artifactId  - Download artifact
POST   /api/config/:id/clone/:repoName       - Clone repository
```

### AI Agent API

```
POST   /api/aiagent/query       - Send query to AI agent
POST   /api/aiagent/recommend   - Get model recommendations
POST   /api/aiagent/compatibility - Check model compatibility
POST   /api/aiagent/integrate   - Get integration guidance
GET    /api/aiagent/history     - Get conversation history
```

### Example API Requests

**Test JFrog Connection:**
```bash
curl -X POST http://localhost:5000/api/config/jfrog/test \
  -H "Content-Type: application/json"
```

**Sync Artifacts from JFrog:**
```bash
curl -X POST http://localhost:5000/api/config/jfrog/sync \
  -H "Content-Type: application/json"
```

**Query AI Agent:**
```bash
curl -X POST http://localhost:5000/api/aiagent/query \
  -H "Content-Type: application/json" \
  -d '{"query": "How do I import models?"}'
```

**Check Model Compatibility:**
```bash
curl -X POST http://localhost:5000/api/aiagent/compatibility \
  -H "Content-Type: application/json" \
  -d '{
    "sourceModel": {"type": "fmu", "name": "Environment Model"},
    "targetModel": {"type": "slx", "name": "Plant Model"}
  }'
```

## Development Setup

### Frontend

```bash
cd frontend
npm install
npm run dev  # Development server at http://localhost:5173
npm run build  # Production build
```

### Backend

```bash
cd backend
npm install
npm start  # Server at http://localhost:5000
```

### Running All Platforms Individually

**EnviHub:**
```bash
cd EnviHub/frontend
npm install
npm start  # Runs on port 3000
```

**PlantHub:**
```bash
cd PlantHub/frontend
npm install
npm start  # Runs on port 3001
```

**V-Orchestrator:**
```bash
cd V-Orchestrator/frontend
npm install
npm run dev  # Runs on port 5174
```

## Architecture

### Frontend Architecture

```
frontend/
├── src/
│   ├── components/
│   │   └── ConfigManagement.jsx    # Shared config management component
│   ├── pages/
│   │   ├── VirtuSpace.jsx          # Landing page
│   │   ├── Dashboard.jsx
│   │   ├── ModelLibrary.jsx
│   │   ├── ToolIntegration.jsx
│   │   ├── MetadataExtractor.jsx
│   │   └── ModelEditor.jsx
│   ├── styles/
│   │   ├── VirtuSpace.css
│   │   └── ConfigManagement.css
│   └── App.jsx                      # Main routing component
```

### Backend Architecture

```
backend/
├── src/
│   ├── routes/
│   │   ├── models.js
│   │   ├── tools.js
│   │   ├── metadata.js
│   │   ├── config.js               # Configuration management routes
│   │   └── aiagent.js              # AI agent routes
│   ├── config/
│   │   └── database.js
│   └── server.js
```

## Key Technologies

- **Frontend**: React 19, React Router, Vite, Lucide Icons
- **Backend**: Node.js, Express 5, SQLite
- **Styling**: CSS3 with custom properties
- **State Management**: React Hooks

## Configuration Management Integration

All three platforms (V-Orchestrator, EnviHub, PlantHub) now include Configuration Management:

1. **Consistent UI**: Same configuration interface across all platforms
2. **Centralized Backend**: Single API endpoint for all platforms
3. **Connection Management**: Test and maintain connections to JFrog/GitHub
4. **Artifact Sync**: Pull models from repositories
5. **Version Control**: Track model versions through Git

## AI Agent Integration

The AI Agent is powered by a knowledge base that includes:

- **Model Types**: FMU, IPG, Simulink, DCP, Amesim
- **Platform Information**: V-Orchestrator, EnviHub, PlantHub capabilities
- **Integration Steps**: Step-by-step guidance for model integration
- **Compatibility Rules**: Known compatible model combinations

## Best Practices

1. **Configuration Management**:
   - Always test connections before syncing
   - Use dedicated service accounts with appropriate permissions
   - Regularly sync to get latest models

2. **AI Agent**:
   - Ask specific questions for better responses
   - Provide context (model types, use case) for tailored guidance
   - Use recommendations for optimal workflow

3. **Platform Selection**:
   - Use V-Orchestrator for cosimulation orchestration
   - Use EnviHub for environment models (IPG CarMaker, etc.)
   - Use PlantHub for plant models (sensors, actuators, etc.)

## Troubleshooting

### Frontend Issues

**Issue**: Page not loading
- Check if frontend dev server is running
- Verify no port conflicts (default: 5173)
- Check browser console for errors

**Issue**: Routes not working
- Ensure React Router is properly configured
- Check for correct route paths in App.jsx

### Backend Issues

**Issue**: API endpoints returning errors
- Check if backend server is running (port 5000)
- Verify database initialization
- Check API endpoint paths

**Issue**: Configuration Management not working
- Ensure backend routes are properly registered
- Verify CORS settings for cross-origin requests

### Configuration Management Issues

**Issue**: Connection test failing
- Verify credentials are correct
- Check network connectivity to JFrog/GitHub
- Ensure URLs are properly formatted

**Issue**: Sync not returning models
- Ensure connection is established (status: connected)
- Verify repository names are correct
- Check API key/token permissions

## Future Enhancements

- Real implementation of JFrog Artifactory API integration
- Real implementation of GitHub Enterprise Server API integration
- Enhanced AI Agent with machine learning capabilities
- User authentication and role-based access control
- Real-time collaboration features
- Model version comparison tools
- Advanced search and filtering in model libraries

## Support

For issues, questions, or contributions:
- Check the main README.md
- Review API documentation
- Contact the VirtuVerse VirtuSpace team

## License

ISC License - © 2024 Bosch
