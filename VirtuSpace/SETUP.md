# VirtuSpace Platform - Setup Guide

## Prerequisites

- Node.js v18 or higher
- npm v9 or higher
- Git

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/kushalkoppa/virtuverse.git
cd virtuverse/VirtuSpace
```

### 2. Backend Setup

```bash
cd backend

# Copy environment configuration
cp .env.example .env

# Install dependencies
npm install

# Start the server
npm start
```

The backend server will start on `http://localhost:5000`

**Backend Features:**
- REST API for model management
- SQLite database with sample data
- File upload handling
- Tool integration endpoints
- Metadata extraction service
- Configuration management API
- AI Agent API

### 3. Frontend Setup

Open a new terminal window:

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on `http://localhost:5173`

**Frontend Features:**
- React-based UI
- VirtuSpace landing page with platform cards
- Configuration Management interface
- AI Agent Assistant
- Dashboard and Model Library pages
- Tool Integration pages
- Responsive design
- Modern UI with gradient backgrounds

## Using Docker (Recommended)

If you prefer to use Docker:

```bash
# From the VirtuSpace directory
docker-compose up

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

## Project Structure

```
VirtuSpace/
├── README.md              # Main documentation
├── SETUP.md              # This file
├── VIRTUSPACE.md         # Detailed UI documentation
├── docker-compose.yml    # Docker orchestration
│
├── frontend/             # React Application
│   ├── src/
│   │   ├── pages/
│   │   │   ├── VirtuSpace.jsx      # Landing page
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ModelLibrary.jsx
│   │   │   ├── ToolIntegration.jsx
│   │   │   ├── MetadataExtractor.jsx
│   │   │   └── ModelEditor.jsx
│   │   ├── components/
│   │   │   ├── ConfigManagement.jsx
│   │   │   └── ChatBot.jsx
│   │   ├── App.jsx       # Main app with routing
│   │   └── index.css
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
└── backend/              # Node.js API Server
    ├── src/
    │   ├── routes/
    │   │   ├── models.js     # Model CRUD endpoints
    │   │   ├── tools.js      # Tool integration endpoints
    │   │   ├── metadata.js   # Metadata extraction endpoints
    │   │   ├── config.js     # Configuration management
    │   │   └── aiagent.js    # AI Agent endpoints
    │   ├── config/
    │   │   └── database.js   # SQLite configuration
    │   └── server.js         # Express server setup
    ├── uploads/          # File upload directory
    ├── .env.example      # Environment template
    ├── Dockerfile
    └── package.json
```

## API Endpoints

### Health Check
- `GET /api/health` - Check if API is running

### Models
- `GET /api/models` - List all models
- `GET /api/models/:id` - Get specific model
- `POST /api/models/upload` - Upload new model
- `PUT /api/models/:id` - Update model
- `DELETE /api/models/:id` - Delete model
- `GET /api/models/stats/summary` - Get statistics

### Tool Integrations
- `GET /api/tools` - List all integrations
- `GET /api/tools/:id` - Get specific integration
- `POST /api/tools` - Add new integration
- `POST /api/tools/:id/test` - Test connection
- `POST /api/tools/:id/sync` - Sync models
- `PUT /api/tools/:id` - Update integration
- `DELETE /api/tools/:id` - Delete integration

### Metadata
- `POST /api/metadata/extract` - Extract metadata from file
- `GET /api/metadata/model/:modelId` - Get model metadata
- `POST /api/metadata/model/:modelId` - Save metadata
- `GET /api/metadata/all` - List all models with metadata
- `GET /api/metadata/model/:modelId/harness` - Generate smart harness

## Testing the Application

### 1. Test Backend

```bash
# Check health
curl http://localhost:5000/api/health

# List models
curl http://localhost:5000/api/models

# List tool integrations
curl http://localhost:5000/api/tools
```

### 2. Test Frontend

1. Open browser to `http://localhost:5173`
2. Navigate through all pages:
   - Dashboard
   - Model Library
   - Tool Integration
   - Metadata Extractor
   - Model Editor

## Common Issues

### Port Already in Use

If you get a port conflict:

**Backend (port 5000):**
```bash
# Change PORT in backend/.env
PORT=5001
```

**Frontend (port 5173):**
Vite will automatically use the next available port or you can configure it in `vite.config.js`

### Database Issues

If you need to reset the database:

```bash
cd backend
rm envihub.db
npm start  # Database will be recreated with sample data
```

### Module Not Found

Make sure you've installed dependencies:

```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

## Development Tips

### Hot Reload

Both frontend and backend support hot reload:
- Frontend: Vite provides instant HMR
- Backend: Use `nodemon` for auto-restart (install: `npm install -D nodemon`)

### Adding New Models

Use the Model Library page or API:

```bash
curl -X POST http://localhost:5000/api/models/upload \
  -F "file=@/path/to/model.ipg" \
  -F "name=My Model" \
  -F "type=IPG CarMaker"
```

### Connecting to Real Tools

Update the tool integration endpoints in the Tool Integration page to point to actual IPG CarMaker, MATLAB, or dSPACE instances.

## Production Deployment

### Build for Production

**Frontend:**
```bash
cd frontend
npm run build
# Output in dist/ folder
```

**Backend:**
```bash
cd backend
npm start
# Use PM2 or similar for process management
```

### Using Docker

```bash
docker-compose up -d
```

## Support

For issues or questions:
1. Check the main README.md
2. Review API documentation
3. Contact the VirtuVerse EnviHub team

## Next Steps

After setup:
1. Explore the Dashboard for an overview
2. Browse sample models in Model Library
3. Test tool connections in Tool Integration
4. Try extracting metadata from a model file
5. Experiment with the Model Editor

Happy developing! 🚀
