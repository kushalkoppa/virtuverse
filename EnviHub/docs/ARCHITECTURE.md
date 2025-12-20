# EnviHub Architecture

## System Overview

EnviHub is designed as a modern web-based platform that provides a unified interface to multiple simulation and virtualization tools. The platform follows a client-server architecture with clear separation of concerns.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     EnviHub Platform                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Frontend   │  │   Backend    │  │   Database   │      │
│  │   (React)    │◄─┤  (Express)   │◄─┤   (Future)   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                    Integration Layer                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   IPG    │  │  MATLAB  │  │ PreScan  │  │  Other   │   │
│  │ CarMaker │  │ Simulink │  │          │  │  Tools   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Components

### 1. Frontend (React Application)

**Location:** `/EnviHub/frontend`

The frontend is built using React and provides the user interface for all platform features.

**Key Components:**
- **Dashboard**: Overview of platform status and capabilities
- **ToolsInterface**: Connect and manage tool integrations
- **ModelLibrary**: Browse and filter simulation models
- **ModelEditor**: Create and edit models
- **SharingHub**: Manage external sharing and internal access

**Technologies:**
- React 18.2
- React Router for navigation
- Axios for API communication
- CSS for styling

### 2. Backend (Express API)

**Location:** `/EnviHub/backend`

The backend provides RESTful APIs for all platform operations.

**API Routes:**
- `/api/tools` - Tool interface management
- `/api/models` - Model CRUD operations
- `/api/sharing` - Sharing and access control

**Technologies:**
- Node.js with Express
- CORS for cross-origin requests
- JSON for data format

### 3. Integration Layer

The integration layer provides connectors to external simulation tools.

**Supported Tools:**
- IPG CarMaker - Vehicle dynamics simulation
- MATLAB Simulink - Model-based design
- PreScan - Sensor simulation

**Integration Methods:**
- REST API connectors
- File-based integration
- Socket communication (future)

## Data Model

### Tool

```javascript
{
  id: string,
  name: string,
  version: string,
  type: string,
  status: string,
  description: string,
  capabilities: string[],
  connectionStatus: string
}
```

### Model

```javascript
{
  id: string,
  name: string,
  type: string,
  tool: string,
  version: string,
  author: string,
  created: string,
  modified: string,
  description: string,
  tags: string[],
  parameters: object,
  access: string
}
```

### Sharing Record

```javascript
{
  id: string,
  modelId: string,
  sharedWith: string,
  type: string,
  permissions: string[],
  sharedDate: string,
  expiryDate: string,
  status: string
}
```

## Security

### Access Control
- Role-based access control (RBAC)
- Model-level permissions
- External vs internal access separation

### Sharing Security
- Time-limited sharing with expiry dates
- Permission scoping (read, write, execute)
- Audit trail for all sharing activities

## Scalability

The platform is designed to scale horizontally:
- Stateless API servers
- Distributed model storage
- Load balancing support
- Caching layer (future)

## Future Enhancements

1. **Database Integration**: Replace in-memory storage with PostgreSQL/MongoDB
2. **Authentication**: Implement JWT-based authentication
3. **Real-time Updates**: WebSocket support for live updates
4. **Advanced Search**: Full-text search and filtering
5. **Version Control**: Git-based model versioning
6. **CI/CD Pipeline**: Automated testing and deployment
7. **Monitoring**: Application performance monitoring
8. **Analytics**: Usage analytics and reporting
