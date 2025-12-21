# VirtuVerse - EnviHub Platform

VirtuVerse is an E2E Virtualization & Simulation universe in SDV, a collaborator platform that includes **EnviHub** - a comprehensive platform for simulation model management and tool integration.

## 🚀 EnviHub Platform

EnviHub is a part of VirtuSpace that provides:

- **Model Library Management** - Store, organize, and share simulation models
- **Tool Integration** - Connect with tools like IPG CarMaker, MATLAB/Simulink, dSPACE VEOS
- **Metadata Extraction** - Extract smart harness metadata for cosimulation integration
- **Model Editor** - Edit and configure models across different tools
- **Collaboration** - Share models with OEMs, suppliers, and internal Bosch teams

## 🏗️ Architecture

```
virtuverse/
├── frontend/          # React-based UI application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.jsx
│   └── package.json
├── backend/           # Node.js/Express API server
│   ├── src/
│   │   ├── routes/
│   │   ├── config/
│   │   └── server.js
│   └── package.json
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- **React** - UI framework
- **React Router** - Navigation
- **Lucide React** - Icons
- **Axios** - HTTP client
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **SQLite** - Database
- **Multer** - File upload handling
- **Axios** - HTTP client for tool integration

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm start
```

The backend API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 🎯 Key Features

### 1. Dashboard
- Overview of all models and integrations
- Recent activity tracking
- Quick actions for common tasks
- Statistics and metrics

### 2. Model Library
- Browse and search models
- Filter by type and tags
- Upload new models
- Share models with teams
- Download and edit capabilities

### 3. Tool Integration
- Connect to IPG CarMaker
- Connect to MATLAB/Simulink
- Connect to dSPACE VEOS
- Test connections
- Sync models between tools
- Add custom tool integrations

### 4. Metadata Extractor
- Upload simulation models
- Extract metadata automatically
- View interface definitions
- Generate smart harness configuration
- Export metadata as JSON
- Integration-ready metadata for cosimulation

### 5. Model Editor
- Visual and code editing modes
- Edit model parameters
- Configure tool integrations
- Set sharing permissions
- Update model metadata

## 🔌 API Endpoints

### Models API
- `GET /api/models` - List all models
- `GET /api/models/:id` - Get specific model
- `POST /api/models/upload` - Upload new model
- `PUT /api/models/:id` - Update model
- `DELETE /api/models/:id` - Delete model
- `GET /api/models/stats/summary` - Get statistics

### Tools API
- `GET /api/tools` - List all integrations
- `GET /api/tools/:id` - Get specific integration
- `POST /api/tools` - Add new integration
- `POST /api/tools/:id/test` - Test connection
- `POST /api/tools/:id/sync` - Sync models
- `PUT /api/tools/:id` - Update integration
- `DELETE /api/tools/:id` - Delete integration

### Metadata API
- `POST /api/metadata/extract` - Extract metadata from file
- `GET /api/metadata/model/:modelId` - Get model metadata
- `POST /api/metadata/model/:modelId` - Save metadata
- `GET /api/metadata/all` - List all models with metadata
- `GET /api/metadata/model/:modelId/harness` - Generate smart harness config

## 🎨 UI Screenshots

The EnviHub platform features a modern, intuitive interface with:
- Clean navigation bar
- Interactive dashboard with statistics
- Searchable model library
- Tool integration management
- Metadata extraction workflow
- Visual and code-based model editing

## 🔐 Security Features

- Secure file upload handling
- API endpoint validation
- Database parameter sanitization
- Error handling and logging

## 🚀 Deployment

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy the 'dist' folder to your hosting service
```

### Backend Deployment
```bash
cd backend
npm start
# Deploy to your Node.js hosting service (e.g., Heroku, AWS, Azure)
```

## 🤝 Integration with IPG CarMaker

The platform provides ready-to-use integration with IPG CarMaker:
- Connect to CarMaker instances
- Import and export models
- Sync model changes
- Extract metadata for cosimulation

## 📊 Smart Harness

The platform's unique **Smart Harness** feature:
- Extracts interface definitions automatically
- Identifies compatible tools
- Generates integration metadata
- Enables seamless cosimulation
- Supports FMI/FMU export

## 🌐 Sharing and Collaboration

Models can be shared with:
- External OEMs
- Suppliers
- Tool vendors
- Internal Bosch teams
- Other domains within the organization

## 📝 License

ISC

## 👥 Contributing

This is a proprietary platform for VirtuVerse. For contributions, please contact the development team.

## 📞 Support

For support and questions, please contact the VirtuVerse EnviHub team.
