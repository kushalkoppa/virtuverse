# VirtuVerse - E2E Virtualization & Simulation Universe

![Main CI/CD](https://github.com/kushalkoppa/virtuverse/actions/workflows/main-ci.yml/badge.svg)
![Full Pipeline](https://github.com/kushalkoppa/virtuverse/actions/workflows/full-pipeline.yml/badge.svg)

VirtuVerse is an E2E Virtualization & Simulation universe in SDV (Software-Defined Vehicles), providing a comprehensive collaborative platform for simulation model management, tool integration, and cosimulation orchestration.

## 🏗️ Repository Structure

```
virtuverse/
├── VirtuSpace/         # Unified parent platform with landing page, config management, AI agent
│   ├── frontend/       # React-based UI
│   ├── backend/        # Node.js/Express API
│   ├── docker-compose.yml
│   └── README.md
├── EnviHub/           # Environment modeling platform
│   ├── frontend/
│   ├── backend/
│   └── README.md
├── PlantHub/          # Plant modeling platform
│   ├── frontend/
│   ├── backend/
│   └── README.md
├── V-Orchestrator/    # Cosimulation orchestration platform
│   ├── frontend/
│   ├── backend/
│   └── README.md
├── .github/workflows/ # CI/CD pipelines
└── README.md         # This file
```

## 🚀 Platforms Overview

### VirtuSpace
The unified parent platform that brings together all sub-platforms:
- **Landing Page** - Central entry point to the entire ecosystem
- **Configuration Management** - Centralized connection to JFrog Artifactory and GitHub Enterprise Server
- **AI Agent Assistant** - Intelligent guidance for model import and integration
- **Shared Services** - Authentication, configuration, and common utilities

**[Get Started with VirtuSpace →](./VirtuSpace/README.md)**

### EnviHub
Environment modeling platform for simulation model management:
- **Model Library Management** - Store, organize, and share simulation models
- **Tool Integration** - Connect with IPG CarMaker, MATLAB/Simulink, dSPACE VEOS
- **Metadata Extraction** - Extract smart harness metadata for cosimulation
- **Model Editor** - Edit and configure models across different tools
- **Collaboration** - Share models with OEMs, suppliers, and internal teams

**[Get Started with EnviHub →](./EnviHub/README.md)**

### PlantHub
Plant modeling platform for vehicle component models:
- **Component Library** - Manage plant models (sensors, actuators, etc.)
- **Tool Integration** - Connect with simulation tools
- **Model Sharing** - Collaborate with teams and partners
- **Version Control** - Track model history and changes

**[Get Started with PlantHub →](./PlantHub/README.md)**

### V-Orchestrator
Cosimulation orchestration platform:
- **Cosimulation Setup** - Configure and manage cosimulation scenarios
- **Model Integration** - Integrate models from different tools
- **Execution Control** - Run and monitor cosimulations
- **Results Analysis** - Analyze simulation results

**[Get Started with V-Orchestrator →](./V-Orchestrator/README.md)**

## 📦 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Docker (optional, for containerized deployment)

### Running VirtuSpace Platform

```bash
cd VirtuSpace
docker-compose up
```

Or run manually:
```bash
# Backend
cd VirtuSpace/backend
npm install
npm start

# Frontend (in another terminal)
cd VirtuSpace/frontend
npm install
npm run dev
```

Access VirtuSpace at: **http://localhost:5173**

### Running Individual Platforms

Each platform (EnviHub, PlantHub, V-Orchestrator) can be run independently. See their respective README files for detailed instructions.

## 🛠️ Technology Stack

All platforms are built with modern web technologies:

### Frontend
- **React** 19 - UI framework
- **React Router** - Navigation
- **Lucide React** - Icons
- **Axios** - HTTP client
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **Express** 5 - Web framework
- **SQLite** - Database
- **Multer** - File upload handling
- **Axios** - HTTP client for tool integration

## 🎯 Key Features Across Platforms

### Model Management
- Centralized model library
- Version control and history tracking
- Model metadata and tagging
- Search and filtering capabilities
- Secure file upload handling

### Tool Integration
- IPG CarMaker integration
- MATLAB/Simulink support
- dSPACE VEOS connectivity
- Extensible architecture for additional tools
- Connection testing and monitoring

### Collaboration
- Share models with external OEMs and suppliers
- Internal team collaboration
- Role-based access control (planned)
- Model permissions management

### Configuration Management
- Centralized JFrog Artifactory connection
- GitHub Enterprise Server integration
- Artifact synchronization
- Repository cloning and management

### AI Assistant
- Intelligent model import guidance
- Model compatibility checking
- Integration strategy recommendations
- Step-by-step setup instructions

## 🔐 Security Features

- Secure file upload handling
- API endpoint validation
- Database parameter sanitization
- Error handling and logging
- CORS configuration

## 🚀 Deployment

### Continuous Integration/Continuous Deployment (CI/CD)

The repository includes automated GitHub Actions workflows:
- **Main CI/CD Pipeline** - Builds and tests VirtuSpace platform
- **Platform-Specific Pipelines** - Separate workflows for EnviHub, PlantHub, and V-Orchestrator
- **Full Integration Tests** - Comprehensive pipeline testing on every push
- **Docker Support** - Automated Docker image building for deployment

For more details, see [.github/workflows/README.md](.github/workflows/README.md)

### Docker Deployment

Each platform includes Docker support:

```bash
# VirtuSpace
cd VirtuSpace
docker-compose up -d

# Individual platforms
cd EnviHub  # or PlantHub, V-Orchestrator
# Follow platform-specific deployment instructions
```

### Manual Deployment

See individual platform README files for detailed deployment instructions.

## 📚 Documentation

- **[VirtuSpace Platform](./VirtuSpace/README.md)** - Unified parent platform documentation
- **[EnviHub Platform](./EnviHub/README.md)** - Environment modeling platform
- **[PlantHub Platform](./PlantHub/README.md)** - Plant modeling platform
- **[V-Orchestrator Platform](./V-Orchestrator/README.md)** - Cosimulation orchestration
- **[CI/CD Workflows](./.github/workflows/README.md)** - Build and deployment pipelines
- **[Workflows Summary](./WORKFLOWS_SUMMARY.md)** - Overview of all workflows

## 🤝 Integration Capabilities

### IPG CarMaker
- Connect to CarMaker instances
- Import and export models
- Sync model changes
- Extract metadata for cosimulation

### MATLAB/Simulink
- Model import and export
- Interface with Simulink models
- Parameter configuration

### dSPACE VEOS
- Virtual ECU integration
- Real-time simulation support

## 📊 Smart Harness Feature

The platform's unique **Smart Harness** feature:
- Extracts interface definitions automatically
- Identifies compatible tools
- Generates integration metadata
- Enables seamless cosimulation
- Supports FMI/FMU export

## 🌐 Collaboration & Sharing

Models can be shared with:
- External OEMs
- Suppliers
- Tool vendors
- Internal Bosch teams
- Other domains within the organization

## 🐛 Troubleshooting

Common issues and solutions:

### Port Conflicts
- VirtuSpace: Backend (5000), Frontend (5173/3000)
- Check platform-specific README files for port configurations

### Module Installation
```bash
# Install dependencies for each platform
cd VirtuSpace/backend && npm install
cd VirtuSpace/frontend && npm install
```

### Database Issues
```bash
# Reset VirtuSpace database
cd VirtuSpace/backend
rm envihub.db
npm start  # Database will be recreated
```

For platform-specific issues, see individual platform documentation.

## 🔄 Migration from Previous Structure

**Note:** The repository structure has been reorganized for better clarity and easier deployment. The previous root-level `backend/` and `frontend/` folders are now located in `VirtuSpace/backend/` and `VirtuSpace/frontend/`.

If you have existing scripts or configurations that reference the old paths, update them as follows:
- `backend/` → `VirtuSpace/backend/`
- `frontend/` → `VirtuSpace/frontend/`
- `docker-compose.yml` → `VirtuSpace/docker-compose.yml`

## 📝 License

ISC

## 👥 Contributing

This is a proprietary platform for VirtuVerse. For contributions, please contact the development team.

## 📞 Support

For support and questions, please contact the VirtuVerse EnviHub team.
