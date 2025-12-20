# VirtuVerse
VirtuVerse an E2E Virtualization &amp; Simulation universe in SDV, is a collaborator platform

## VirtuSpace Platforms

VirtuSpace includes multiple specialized platforms for different modeling domains:

### EnviHub Platform

EnviHub is a comprehensive platform within VirtuSpace that provides unified access to virtualization and simulation tools, focusing on environment models.

#### Features

- **Tool Integration**: Interfaces to IPG CarMaker, MATLAB Simulink, PreScan, and other simulation tools
- **Model Library**: Centralized storage and management of simulation models
- **External Collaboration**: Share models with OEMs, suppliers, and tool vendors
- **Internal Access**: Enable cross-domain collaboration within Bosch
- **Model Editor**: Create, edit, and validate simulation models

#### Quick Start

```bash
# Navigate to EnviHub directory
cd EnviHub

# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..

# Start the development server (runs both backend and frontend)
npm run dev
```

For detailed documentation, see [EnviHub/README.md](EnviHub/README.md)

### PlantHub Platform

PlantHub is a comprehensive platform within VirtuSpace that provides unified access to plant modeling tools, focusing on sensors, actuators, physical models, and mathematical models.

#### Features

- **Tool Integration**: Interfaces to MATLAB Simulink, Modelica, Simcenter Amesim, and other plant modeling tools
- **Model Library**: Centralized storage and management of plant models (sensors, actuators, physical, mathematical)
- **External Collaboration**: Share models with OEMs, suppliers, and tool vendors
- **Internal Access**: Enable cross-domain collaboration within Bosch
- **Model Editor**: Create, edit, and validate plant models

#### Quick Start

```bash
# Navigate to PlantHub directory
cd PlantHub

# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..

# Start the development server (runs both backend and frontend)
npm run dev
```

For detailed documentation, see [PlantHub/README.md](PlantHub/README.md)
