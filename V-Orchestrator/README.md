# V-Orchestrator

V-Orchestrator is an intelligent cosimulation orchestration platform within VirtuSpace that seamlessly integrates V-ECUs, Environment Models, and Plant Models from MeDaC, EnviHub, and PlantHub.

## 🎯 Overview

V-Orchestrator provides a unified interface for managing cosimulation workflows by:
- Automatically detecting model interfaces from metadata
- Supporting multiple cosimulation middleware (FMI, DCP, Custom)
- Integrating models from MeDaC (V-ECUs), EnviHub (Environment), and PlantHub (Plant)
- Managing test cases and test scripts for simulation execution

## 🏗️ Architecture

```
V-Orchestrator/
├── backend/              # Node.js/Express API server
│   ├── routes/
│   │   ├── cosimulationRoutes.js
│   │   ├── interfaceRoutes.js
│   │   ├── testCaseRoutes.js
│   │   └── integrationRoutes.js
│   ├── server.js
│   └── package.json
├── frontend/             # React UI application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js
│   │   │   ├── CosimulationMiddleware.js
│   │   │   ├── InterfaceDetection.js
│   │   │   ├── TestCaseManager.js
│   │   │   └── ModelIntegration.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── config.js
│   │   └── index.js
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## 🚀 Key Features

### 1. Dashboard
- Overview of cosimulation middleware, interface detection, test cases, and platform integrations
- Real-time statistics and status monitoring
- Platform architecture visualization

### 2. Cosimulation Middleware
- Manage multiple middleware (FMI/FMU, DCP, Custom)
- Configure middleware capabilities and supported model types
- Activate/deactivate middleware based on use-case requirements

### 3. Interface Detection
- Automatically detect model interfaces from metadata
- View interface details (inputs/outputs, data types, units, ranges)
- Check compatibility between different models
- Seamless integration based on detected interfaces

### 4. Test Case Manager
- Create and manage test cases and test scripts
- Define test steps and execution sequences
- Execute tests within simulation middleware
- View test results and execution history

### 5. Model Integration
- Connect to MeDaC, EnviHub, and PlantHub
- Sync models from connected platforms
- View available V-ECUs, Environment Models, and Plant Models
- Select models for cosimulation scenarios

## 🛠️ Technology Stack

### Frontend
- **React** - UI framework
- **React Router** - Navigation
- **Vite** - Build tool
- **CSS** - Styling

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **CORS** - Cross-origin resource sharing

## 📦 Installation

See [INSTALL.md](INSTALL.md) for detailed installation instructions.

## 🔌 API Endpoints

### Cosimulation Middleware API
- `GET /api/cosimulation` - List all middleware
- `GET /api/cosimulation/:id` - Get specific middleware
- `POST /api/cosimulation` - Add new middleware
- `PUT /api/cosimulation/:id` - Update middleware
- `DELETE /api/cosimulation/:id` - Delete middleware

### Interface Detection API
- `GET /api/interfaces` - List all detected interfaces
- `GET /api/interfaces/:id` - Get specific interface
- `POST /api/interfaces/detect` - Auto-detect interfaces from metadata
- `POST /api/interfaces/compatibility` - Check compatibility between models

### Test Case API
- `GET /api/testcases` - List all test cases
- `GET /api/testcases/:id` - Get specific test case
- `POST /api/testcases` - Create new test case
- `PUT /api/testcases/:id` - Update test case
- `DELETE /api/testcases/:id` - Delete test case
- `POST /api/testcases/:id/execute` - Execute test case
- `GET /api/testcases/:id/results` - Get test results

### Integration API
- `GET /api/integrations` - List all platform integrations
- `GET /api/integrations/:id` - Get specific integration
- `POST /api/integrations/:id/sync` - Sync models from platform
- `GET /api/integrations/:id/models` - Get models from platform
- `POST /api/integrations/:id/test` - Test connection to platform
- `GET /api/integrations/stats/summary` - Get integration statistics

## 🎨 UI Features

The V-Orchestrator platform features:
- Modern, intuitive interface with purple theme
- Clean navigation bar
- Interactive dashboard with statistics
- Comprehensive middleware management
- Intelligent interface detection and compatibility checking
- Test case creation and execution
- Platform integration management

## 🔐 Integration with VirtuSpace

V-Orchestrator is part of VirtuSpace and integrates with:
- **MeDaC** - Access to V-ECU models with interface metadata
- **EnviHub** - Access to Environment Models (IPG CarMaker, PreScan, etc.)
- **PlantHub** - Access to Plant Models (Sensors, Actuators, Physical/Mathematical models)

## 🌟 Intelligent Features

### Automatic Interface Detection
- Reads metadata from MeDaC, EnviHub, and PlantHub
- Identifies input/output interfaces
- Detects data types, units, and valid ranges
- Enables seamless model integration

### Compatibility Checking
- Analyzes interface compatibility between models
- Matches inputs to outputs based on data types
- Suggests optimal model combinations
- Validates integration feasibility

### Domain-Specific Orchestration
- Configure integrations based on specific domains
- Select appropriate middleware for use-cases
- Customize test scenarios for different applications

## 📝 License

ISC

## 👥 Contributing

This is a proprietary platform for VirtuVerse. For contributions, please contact the development team.

## 📞 Support

For support and questions, please contact the VirtuVerse V-Orchestrator team.
