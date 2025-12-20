# VirtuVerse - E2E Virtualization & Simulation Universe

VirtuVerse is a complete end-to-end virtualization and simulation platform for Software Defined Vehicles (SDV). It provides a comprehensive ecosystem with authentication, user management, and access to integrated simulation tools.

## Architecture Overview

```
VirtuVerse (Authentication & Entry Point)
    └── VirtuSpace (Integration Platform)
        ├── EnviHub (Virtualization & Simulation Tools)
        └── PlantHub (Plant Simulation & Manufacturing)
```

## Components

### 1. VirtuVerse (Main Application)
- **Purpose**: Authentication and user management
- **Features**:
  - User registration and login
  - Password recovery
  - JWT-based authentication
  - Admin user management
  - SQLite database (upgradeable to PostgreSQL/MySQL)
- **Ports**: Frontend (5000), Backend (5001)
- **Documentation**: [VirtuVerse/README.md](VirtuVerse/README.md)

### 2. VirtuSpace (Integration Layer)
- **Purpose**: Unified platform integrating EnviHub and PlantHub
- **Features**:
  - Seamless navigation between platforms
  - Aggregated dashboard
  - Single point of access
- **Ports**: Frontend (3005), Backend (3003)
- **Documentation**: [VirtuSpace/README.md](VirtuSpace/README.md)

### 3. EnviHub (Virtualization Platform)
- **Purpose**: Virtualization and simulation tools
- **Features**:
  - IPG CarMaker integration
  - MATLAB Simulink support
  - Model library management
  - External collaboration
  - Model editor and validator
- **Ports**: Frontend (3000), Backend (3001)
- **Documentation**: [EnviHub/README.md](EnviHub/README.md)

### 4. PlantHub (Manufacturing Platform)
- **Purpose**: Plant simulation and manufacturing tools
- **Features**:
  - Plant simulation tools
  - Manufacturing process models
  - Factory layout planning
  - Production optimization
  - Process simulator
- **Ports**: Frontend (3004), Backend (3002)
- **Documentation**: [PlantHub/README.md](PlantHub/README.md)

## Quick Start Guide

### Prerequisites
- Node.js v14 or higher
- npm or yarn
- 4GB RAM minimum
- 10GB disk space

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd virtuverse
```

2. **Install all dependencies**
```bash
# VirtuVerse
cd VirtuVerse && npm install && cd frontend && npm install && cd ../..

# VirtuSpace
cd VirtuSpace && npm install && cd frontend && npm install && cd ../..

# EnviHub
cd EnviHub && npm install && cd frontend && npm install && cd ../..

# PlantHub
cd PlantHub && npm install && cd frontend && npm install && cd ../..
```

3. **Set up environment variables**
```bash
# Copy example env files
cp VirtuVerse/.env.example VirtuVerse/.env
cp VirtuSpace/.env.example VirtuSpace/.env
cp EnviHub/.env.example EnviHub/.env
cp PlantHub/.env.example PlantHub/.env
```

4. **Initialize admin user**
```bash
cd VirtuVerse
npm run init-admin
cd ..
```

5. **Start all services** (in separate terminals)
```bash
# Terminal 1 - VirtuVerse Backend
cd VirtuVerse && npm run dev:backend

# Terminal 2 - VirtuVerse Frontend
cd VirtuVerse && npm run dev:frontend

# Terminal 3 - VirtuSpace
cd VirtuSpace && npm run dev

# Terminal 4 - EnviHub
cd EnviHub && npm run dev

# Terminal 5 - PlantHub
cd PlantHub && npm run dev
```

### Access the Applications

- **VirtuVerse** (Login): http://localhost:5000
- **VirtuSpace**: http://localhost:3003 (accessible after login)
- **EnviHub**: http://localhost:3000
- **PlantHub**: http://localhost:3004

### Default Admin Credentials

```
Email: admin@virtuverse.com
Password: Admin@123
```

**⚠️ Important**: Change these credentials immediately after first login in production!

## User Journey

1. **Access VirtuVerse** → User visits http://localhost:5000
2. **Authentication** → Login with credentials or register new account
3. **Dashboard** → View welcome page with VirtuSpace access link
4. **Access VirtuSpace** → Click "Launch VirtuSpace" button
5. **Choose Platform** → Select EnviHub or PlantHub from VirtuSpace
6. **Use Tools** → Access simulation and modeling tools

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
├── VirtuVerse/          # Main authentication application
│   ├── backend/         # Node.js/Express API with SQLite
│   └── frontend/        # React application
├── VirtuSpace/          # Integration platform
│   ├── backend/         # Proxy and aggregation API
│   └── frontend/        # React application
├── EnviHub/             # Virtualization platform
│   ├── backend/         # Node.js/Express API
│   └── frontend/        # React application
├── PlantHub/            # Manufacturing platform
│   ├── backend/         # Node.js/Express API
│   └── frontend/        # React application
├── DEPLOYMENT.md        # Deployment guide
└── README.md           # This file
```

## Features

### Authentication System (VirtuVerse)
- ✅ User registration
- ✅ Secure login (JWT)
- ✅ Password recovery
- ✅ Admin user management
- ✅ Role-based access control

### Integration Platform (VirtuSpace)
- ✅ Unified dashboard
- ✅ EnviHub integration
- ✅ PlantHub integration
- ✅ Seamless navigation

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
