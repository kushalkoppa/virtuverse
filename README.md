# VirtuVerse Studio - E2E Virtualization & Simulation Universe

VirtuVerse Studio is a complete end-to-end virtualization and simulation platform for Software Defined Vehicles (SDV). It provides a comprehensive ecosystem with three major platforms.

## Architecture Overview

```
VirtuVerse Studio (Authentication & Entry Point)
    ├── VirtuSpace (Simulation & Virtualization)
    │   ├── V-Orchestrator (Simulation Orchestration) [with SmartHarness]
    │   ├── EnviHub (Virtualization Tools) [with SmartHarness]
    │   └── PlantHub (Manufacturing Simulation) [with SmartHarness]
    ├── VirtuSphere (Analytics & Visualization)
    │   ├── V-Analyzer (Grafana-style Dashboards) [with SmartHarness]
    │   └── V-DevContainers (DevContainer Generation)
    └── VirtuMind (AI & Intelligence) [with SmartHarness]
```

### SmartHarness - AI-Enabled Component

All platforms include **SmartHarness**, an AI-enabled component that assists users in:
- **Model Integration** (V-Orchestrator): Quickly integrate models from various sources
- **Model Reusability** (EnviHub/PlantHub): Check models for reuse in different tools
- **Interface Analysis**: Verify model interfaces with details on direction, datatype, and source tool
- **Contextual Scoring**: Provide scores for model suitability in integration, simulation, or adaptation contexts
- **Smart Recommendations**: Suggest next steps and best practices for model usage

## Platforms

### 1. VirtuVerse Studio (Main Application)
- **Purpose**: Authentication and main entry point
- **Features**:
  - User registration and login
  - Password recovery
  - JWT-based authentication
  - Admin user management
  - SQLite database
- **Ports**: Frontend (5000), Backend (5001)
- **Documentation**: [VirtuVerse-Studio/README.md](VirtuVerse-Studio/README.md)

### 2. VirtuSpace (Simulation Platform)
- **Purpose**: Unified simulation and virtualization platform
- **Sub-platforms**:
  - **V-Orchestrator**: Simulation orchestration (Ports: 3011/3010)
  - **EnviHub**: Virtualization tools (Ports: 3000/3001)
  - **PlantHub**: Manufacturing simulation (Ports: 3004/3002)
- **Ports**: Frontend (3005), Backend (3003)
- **Documentation**: [VirtuSpace/README.md](VirtuSpace/README.md)

### 3. VirtuSphere (Analytics Platform)
- **Purpose**: Analytics and visualization
- **Sub-platforms**:
  - **V-Analyzer**: Grafana-style dashboards (Ports: 3021/3020)
  - **V-DevContainers**: DevContainer generation tool (Ports: 3031/3030)
- **Documentation**: [VirtuSphere/README.md](VirtuSphere/README.md)

### 4. VirtuMind (AI Platform - Coming Soon)
- **Purpose**: AI and intelligence platform
- **Features**: ML-powered optimization, predictive analytics
- **Documentation**: [VirtuMind/README.md](VirtuMind/README.md)

## Quick Start Guide

### Automated Setup (Recommended)

```bash
# 1. Clone and enter the repository
git clone <repository-url>
cd virtuverse

# 2. Run the quick start script
./start-all.sh
```

This will install dependencies, set up environment files, initialize the admin user, and start all backend services.

### Manual Setup

For detailed step-by-step instructions, see **[GETTING_STARTED.md](GETTING_STARTED.md)**

### Prerequisites
- Node.js v14 or higher
- npm or yarn
- 4GB RAM minimum
- 10GB disk space

### Access the Applications

- **VirtuVerse Studio** (Login): http://localhost:5000
- **VirtuSpace**: http://localhost:3003 (accessible after login)
  - V-Orchestrator: http://localhost:3011
  - EnviHub: http://localhost:3000
  - PlantHub: http://localhost:3004
- **VirtuSphere**:
  - V-Analyzer: http://localhost:3021
  - V-DevContainers: http://localhost:3031

### Default Admin Credentials

> **⚠️ CRITICAL**: Before you can login, you must initialize the backend. Run `./start-all.sh` OR follow the [VirtuVerse-Studio Backend Setup Guide](VirtuVerse-Studio/BACKEND_SETUP.md).

```
Email: admin@virtuverse.com
Password: Admin@123
```

**⚠️ Important**: Change these credentials immediately after first login in production!

## User Journey

1. **Access VirtuVerse Studio** → User visits http://localhost:5000
2. **Authentication** → Login with credentials or register new account
3. **Choose Platform** → Select from three main platforms:
   - **VirtuSpace** → Simulation and virtualization
   - **VirtuSphere** → Analytics and dashboards
   - **VirtuMind** → AI and intelligence (coming soon)
4. **VirtuSpace Sub-platforms** → Access V-Orchestrator, EnviHub, or PlantHub
5. **Use Tools** → Access simulation, orchestration, and modeling tools

## Development

### Running in Development Mode

Each component can be run independently in development mode:

```bash
# VirtuVerse Studio
cd VirtuVerse-Studio && npm run dev

# VirtuSpace
cd VirtuSpace && npm run dev

# V-Orchestrator
cd VirtuSpace/V-Orchestrator && npm run dev

# EnviHub
cd VirtuSpace/EnviHub && npm run dev

# PlantHub
cd VirtuSpace/PlantHub && npm run dev

# V-Analyzer
cd VirtuSphere/V-Analyzer && npm run dev
```

### Building for Production

```bash
# Build all frontend applications
cd VirtuVerse-Studio/frontend && npm run build && cd ../..
cd VirtuSpace/frontend && npm run build && cd ../..
cd VirtuSpace/V-Orchestrator/frontend && npm run build && cd ../../..
cd VirtuSpace/EnviHub/frontend && npm run build && cd ../../..
cd VirtuSpace/PlantHub/frontend && npm run build && cd ../../..
cd VirtuSphere/V-Analyzer/frontend && npm run build && cd ../../..
```

## Deployment

For production deployment, see [DEPLOYMENT.md](DEPLOYMENT.md) for:
- Docker Compose setup
- Nginx configuration
- SSL/TLS setup
- Database migration
- Security hardening
- Monitoring and logging

## Project Structure

```
virtuverse/
├── VirtuVerse-Studio/      # Main authentication application
│   ├── backend/            # Node.js/Express API with SQLite
│   └── frontend/           # React application
├── VirtuSpace/             # Simulation & Virtualization platform
│   ├── V-Orchestrator/     # Simulation orchestration
│   │   ├── backend/
│   │   └── frontend/
│   ├── EnviHub/            # Virtualization platform
│   │   ├── backend/        # Node.js/Express API
│   │   └── frontend/       # React application
│   ├── PlantHub/           # Manufacturing platform
│   │   ├── backend/        # Node.js/Express API
│   │   └── frontend/       # React application
│   ├── backend/            # VirtuSpace aggregation API
│   └── frontend/           # VirtuSpace UI
├── VirtuSphere/            # Analytics platform
│   └── V-Analyzer/         # Dashboard platform
│       ├── backend/
│       └── frontend/
│   └── V-DevContainers/    # DevContainer generation
│       ├── backend/
│       └── frontend/
├── VirtuMind/              # AI platform (coming soon)
├── DEPLOYMENT.md           # Deployment guide
└── README.md              # This file
```

## Features

### Authentication System (VirtuVerse Studio)
- ✅ User registration
- ✅ Secure login (JWT)
- ✅ Password recovery
- ✅ Admin user management
- ✅ Role-based access control

### Simulation Platform (VirtuSpace)
- ✅ V-Orchestrator for simulation orchestration
- ✅ EnviHub for virtualization tools
- ✅ PlantHub for manufacturing simulation
- ✅ Unified dashboard
- ✅ Seamless navigation
- ✅ SmartHarness AI assistance in all tools

### Analytics Platform (VirtuSphere)
- ✅ V-Analyzer with Grafana-style dashboards
- ✅ Simulation results visualization
- ✅ Platform usage metrics
- ✅ Real-time monitoring
- ✅ V-DevContainers for DevContainer generation
- ✅ SmartHarness AI assistance

### Virtualization Tools (EnviHub)
- ✅ Tool interfaces (CarMaker, Simulink, etc.)
- ✅ Model library
- ✅ Model editor
- ✅ Sharing hub
- ✅ Collaboration features
- ✅ SmartHarness for model compatibility checking

### Manufacturing Tools (PlantHub)
- ✅ Plant simulation tools
- ✅ Manufacturing models
- ✅ Factory planning
- ✅ Production optimization
- ✅ Process simulator
- ✅ SmartHarness for adaptation scoring

### Orchestration (V-Orchestrator)
- ✅ Open-loop simulations
- ✅ Closed-loop simulations
- ✅ Workflow management
- ✅ Results tracking
- ✅ SmartHarness for model integration

### AI Platform (VirtuMind - Coming Soon)
- 🔄 ML-powered optimization
- 🔄 Predictive analytics
- 🔄 Intelligent automation
- 🔄 SmartHarness integration

## Technology Stack

- **Frontend**: React 18, React Router 6, Axios
- **Backend**: Node.js, Express, JWT
- **Database**: SQLite (development), PostgreSQL/MySQL (production)
- **Authentication**: JWT with bcrypt
- **Deployment**: Docker, PM2, Nginx

## UI Screenshots & Preview

### VirtuVerse Studio - Login Interface
![VirtuVerse Studio Login](docs/screenshots/virtuverse-studio-login.png)
*Main authentication portal providing secure access to all VirtuVerse platforms*

### VirtuSpace - Platform Dashboard
![VirtuSpace Dashboard](docs/screenshots/virtuspace-dashboard.png)
*Unified dashboard showing V-Orchestrator, EnviHub, and PlantHub with SmartHarness integration*

### V-Orchestrator - Simulation Orchestration
![V-Orchestrator Interface](docs/screenshots/v-orchestrator-ui.png)
*Simulation workflow management with SmartHarness AI assistance for model integration*

### EnviHub - Virtualization Platform
![EnviHub Interface](docs/screenshots/envihub-ui.png)
*Model library and tool integration interface with SmartHarness for compatibility checking*

### PlantHub - Manufacturing Simulation
![PlantHub Interface](docs/screenshots/planthub-ui.png)
*Plant simulation and factory planning tools with SmartHarness adaptation scoring*

### VirtuSphere V-Analyzer - Analytics Dashboard
![V-Analyzer Dashboard](docs/screenshots/v-analyzer-ui.png)
*Grafana-style dashboards for simulation results and platform metrics with SmartHarness insights*

### VirtuSphere V-DevContainers - DevContainer Generation
![V-DevContainers Interface](docs/screenshots/v-devcontainers-ui.png)
*Quick DevContainer generation from V-Orchestrator projects or individual components*

### VirtuMind - AI Platform (Coming Soon)
![VirtuMind Preview](docs/screenshots/virtumind-preview.png)
*AI-powered optimization and predictive analytics with SmartHarness integration*

> **Note**: Screenshot files should be placed in the `docs/screenshots/` directory. For actual deployment, replace these placeholder references with actual screenshots of your deployed applications.

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

ISC License - © 2024 Bosch

## Support

For issues, questions, or contributions:
- Review component-specific README files
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment issues
- Contact the development team

## Roadmap

- [ ] Email service integration for password reset
- [ ] OAuth integration (Google, Microsoft)
- [ ] Advanced user management dashboard
- [ ] Activity logging and audit trail
- [ ] Real-time collaboration features
- [ ] Mobile application
- [ ] Enhanced security features
