# VirtuVerse Studio - E2E Virtualization & Simulation Universe

VirtuVerse Studio is a complete end-to-end virtualization and simulation platform for Software Defined Vehicles (SDV). It provides a comprehensive ecosystem with three major platforms.

## Architecture Overview

```
VirtuVerse Studio (Authentication & Entry Point)
    ├── VirtuSpace (Simulation & Virtualization)
    │   ├── V-Orchestrator (Simulation Orchestration)
    │   ├── EnviHub (Virtualization Tools)
    │   └── PlantHub (Manufacturing Simulation)
    ├── VirtuSphere (Analytics & Visualization)
    │   └── V-Analyzer (Grafana-style Dashboards)
    └── VirtuMind (AI & Intelligence - Coming Soon)
```

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

### Default Admin Credentials

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
# VirtuVerse
cd VirtuVerse && npm run dev

# VirtuSpace
cd VirtuSpace && npm run dev

# EnviHub
cd EnviHub && npm run dev

# PlantHub
cd PlantHub && npm run dev
```

### Building for Production

```bash
# Build all frontend applications
cd VirtuVerse/frontend && npm run build && cd ../..
cd VirtuSpace/frontend && npm run build && cd ../..
cd EnviHub/frontend && npm run build && cd ../..
cd PlantHub/frontend && npm run build && cd ../..
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
├── VirtuSpace/             # Simulation platform
│   ├── V-Orchestrator/     # Simulation orchestration
│   │   ├── backend/
│   │   └── frontend/
│   ├── backend/            # VirtuSpace aggregation API
│   └── frontend/           # VirtuSpace UI
├── EnviHub/                # Virtualization platform
│   ├── backend/            # Node.js/Express API
│   └── frontend/           # React application
├── PlantHub/               # Manufacturing platform
│   ├── backend/            # Node.js/Express API
│   └── frontend/           # React application
├── VirtuSphere/            # Analytics platform
│   └── V-Analyzer/         # Dashboard platform
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

### Analytics Platform (VirtuSphere)
- ✅ V-Analyzer with Grafana-style dashboards
- ✅ Simulation results visualization
- ✅ Platform usage metrics
- ✅ Real-time monitoring

### Virtualization Tools (EnviHub)
- ✅ Tool interfaces (CarMaker, Simulink, etc.)
- ✅ Model library
- ✅ Model editor
- ✅ Sharing hub
- ✅ Collaboration features

### Manufacturing Tools (PlantHub)
- ✅ Plant simulation tools
- ✅ Manufacturing models
- ✅ Factory planning
- ✅ Production optimization
- ✅ Process simulator

### Orchestration (V-Orchestrator)
- ✅ Open-loop simulations
- ✅ Closed-loop simulations
- ✅ Workflow management
- ✅ Results tracking

### AI Platform (VirtuMind - Coming Soon)
- 🔄 ML-powered optimization
- 🔄 Predictive analytics
- 🔄 Intelligent automation

## Technology Stack

- **Frontend**: React 18, React Router 6, Axios
- **Backend**: Node.js, Express, JWT
- **Database**: SQLite (development), PostgreSQL/MySQL (production)
- **Authentication**: JWT with bcrypt
- **Deployment**: Docker, PM2, Nginx

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
