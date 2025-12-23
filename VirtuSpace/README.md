# VirtuSpace Platform

VirtuSpace is the unified parent platform for VirtuVerse Studio that brings together three powerful sub-platforms:
- **V-Orchestrator** - Cosimulation orchestration platform
- **EnviHub** - Environment modeling platform
- **PlantHub** - Plant modeling platform

All platforms are integrated with centralized Configuration Management (JFrog Artifactory & GitHub Enterprise Server) and an AI Agent for intelligent assistance.

## 🚀 Quick Start

### Prerequisites
- Node.js v18 or higher
- npm v9 or higher

### Running with Docker (Recommended)

From the VirtuSpace directory:

```bash
docker-compose up
```

This will start:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

### Running Locally

#### Backend Setup

```bash
cd backend
npm install
npm start
```

Backend API will be available at `http://localhost:5000`

#### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at `http://localhost:5173`

## 📁 Structure

```
VirtuSpace/
├── backend/           # Node.js/Express API server
│   ├── src/
│   │   ├── routes/   # API endpoints
│   │   ├── config/   # Database & configuration
│   │   └── server.js
│   └── package.json
├── frontend/         # React-based UI application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
├── docker-compose.yml
├── SETUP.md          # Detailed setup instructions
├── VIRTUSPACE.md     # Complete UI documentation
└── README.md         # This file
```

## 🎯 Key Features

### 1. VirtuSpace Landing Page
- Entry point to the entire VirtuVerse ecosystem
- Visual cards for each platform (V-Orchestrator, EnviHub, PlantHub)
- Configuration Management status display
- AI Agent Assistant access

### 2. Configuration Management
- Centralized connection to JFrog Artifactory
- GitHub Enterprise Server (GHES) integration
- Test connections and sync models/artifacts
- Available across all three sub-platforms

### 3. AI Agent Assistant
- Intelligent guidance for model import and integration
- Model compatibility checking
- Integration strategy recommendations
- Step-by-step setup guidance

## 🔌 API Endpoints

### Health Check
- `GET /api/health` - Check API status

### Configuration Management
- `GET /api/config` - List all connections
- `GET /api/config/:id` - Get specific connection
- `PUT /api/config/:id` - Update connection
- `POST /api/config/:id/test` - Test connection
- `POST /api/config/:id/sync` - Sync models/artifacts

### AI Agent
- `POST /api/aiagent/query` - Send query to AI agent
- `POST /api/aiagent/recommend` - Get model recommendations
- `POST /api/aiagent/compatibility` - Check model compatibility
- `POST /api/aiagent/integrate` - Get integration guidance

### Models API
- `GET /api/models` - List all models
- `GET /api/models/:id` - Get specific model
- `POST /api/models/upload` - Upload new model
- `PUT /api/models/:id` - Update model
- `DELETE /api/models/:id` - Delete model

### Tools API
- `GET /api/tools` - List all integrations
- `POST /api/tools` - Add new integration
- `POST /api/tools/:id/test` - Test connection
- `PUT /api/tools/:id` - Update integration

### Metadata API
- `POST /api/metadata/extract` - Extract metadata from file
- `GET /api/metadata/model/:modelId` - Get model metadata
- `GET /api/metadata/model/:modelId/harness` - Generate smart harness

## 🛠️ Technology Stack

### Frontend
- React 19
- React Router
- Vite
- Lucide Icons
- Axios

### Backend
- Node.js
- Express 5
- SQLite
- Multer (file uploads)
- Axios

## 📚 Documentation

- **[SETUP.md](./SETUP.md)** - Detailed setup and installation instructions
- **[VIRTUSPACE.md](./VIRTUSPACE.md)** - Complete UI documentation and features
- **[Backend API](./backend/src/)** - API implementation details
- **[Frontend Components](./frontend/src/)** - UI component structure

## 🔒 Security

- Secure file upload handling
- API endpoint validation
- Database parameter sanitization
- Error handling and logging

## 🚀 Deployment

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
# Deploy the 'dist' folder
```

**Backend:**
```bash
cd backend
npm start
# Use PM2 or similar for process management
```

### Docker Deployment

```bash
docker-compose up -d
```

## 📝 Development

### Hot Reload
- Frontend: Vite provides instant HMR
- Backend: Use `nodemon` for auto-restart

### Testing

```bash
# Backend tests
cd backend
npm test

# Frontend lint
cd frontend
npm run lint
```

## 🤝 Integration with Sub-Platforms

VirtuSpace provides the landing page and shared services for:
- **V-Orchestrator** - Located in `../V-Orchestrator/`
- **EnviHub** - Located in `../EnviHub/`
- **PlantHub** - Located in `../PlantHub/`

Each sub-platform has its own backend and frontend, while VirtuSpace provides:
- Unified landing page
- Centralized configuration management
- AI Agent assistant
- Shared authentication (planned)

## 🐛 Troubleshooting

### Port Conflicts
- Backend uses port 5000 (configurable via .env)
- Frontend uses port 5173 (Vite default)
- Docker frontend uses port 3000

### Database Reset
```bash
cd backend
rm envihub.db
npm start  # Database recreated with sample data
```

### Module Not Found
```bash
# Ensure dependencies are installed
cd backend && npm install
cd frontend && npm install
```

## 📞 Support

For issues or questions:
1. Check the main repository [README.md](../README.md)
2. Review [VIRTUSPACE.md](./VIRTUSPACE.md) for detailed documentation
3. Contact the VirtuVerse VirtuSpace team

## 📄 License

ISC License - © 2024 Bosch
