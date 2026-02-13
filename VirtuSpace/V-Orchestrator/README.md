# V-Orchestrator

V-Orchestrator is a simulation orchestration platform within VirtuSpace that manages and coordinates simulation workflows with **SmartHarness** AI assistance for intelligent model integration.

## Overview

V-Orchestrator provides:
- **Simulation Management**: Orchestrate open-loop and closed-loop simulations
- **Workflow Coordination**: Manage simulation pipelines and dependencies
- **Resource Allocation**: Optimize compute resources for simulations
- **Results Tracking**: Monitor and track simulation results
- **SmartHarness Integration**: AI-powered model integration and compatibility checking
- **Layout Editor**: NodeRed-style visual editor for creating simulation workflows

## Features

### 1. Layout Editor (New!)
The V-Orchestrator Layout Editor provides a NodeRed-style interface for visually designing simulation workflows:

**Key Features:**
- **Multi-Tab Interface**: Create and manage multiple layout configurations simultaneously
- **Drag-and-Drop Canvas**: Intuitive visual design with drag-and-drop support
- **Component Palette**: Organized sidebar with collapsible sections containing:
  - **MeDaC**: Model & Data Consortium components (Sensor models, Camera processors, LIDAR handlers)
  - **EnviHub**: Environment simulation models (Weather, Road surface, Traffic scenarios)
  - **PlantHub**: Plant/Vehicle models (Powertrain, Battery thermal, Vehicle dynamics)
  - **VehicleData**: Vehicle configurations and calibration data
  - **Co-Sim Middleware**: Integration middleware (FMI/FMU, DCP Bridge, SSP Connector)
  - **Simulation Platforms**: Target platforms for execution:
    - dSPACE VEOS
    - Synopsys SILVER
    - Vector CANoe
    - IPG CarMaker
    - MATLAB/Simulink

**Workflow Creation:**
1. Select models from the palette sections (MeDaC, EnviHub, PlantHub, VehicleData)
2. Drag and drop models onto the canvas to add them to your workflow
3. Add Co-Sim Middleware components for model integration
4. Drag simulation platform frames onto the canvas
5. Place models inside platform frames for targeted execution
6. Connect models based on their metadata and interfaces
7. Use zoom, pan, and mini-map controls for navigation

**Canvas Controls:**
- Zoom in/out
- Fit view to see all nodes
- Pan across the workspace
- Mini-map for quick navigation
- Connection handles on each node for creating data flows

### 2. Simulation Orchestration
- Create and manage simulation workflows
- Configure simulation parameters
- Schedule simulation runs
- Monitor execution status

### 3. Open-Loop Simulations
- Define input scenarios
- Execute simulations
- Collect results
- Generate reports

### 4. Closed-Loop Simulations
- Configure feedback loops
- Real-time parameter adjustment
- Iterative execution
- Convergence monitoring

### 5. Integration
- Integrates with EnviHub for environment simulations
- Integrates with PlantHub for manufacturing simulations
- Sends results to V-Analyzer for visualization

### 6. SmartHarness - Model Integration Assistant
SmartHarness in V-Orchestrator provides:
- **Quick Model Integration**: AI-guided process to integrate models from various sources
- **Model Compatibility**: Check if models from different tools can work together
- **Interface Verification**: Analyze model interfaces (direction, datatype, source tool)
- **Integration Scoring**: Evaluate model suitability for specific simulation workflows
- **Recommendations**: Suggest optimal integration strategies and configurations
- **Tool Detection**: Identify which tool/platform each model was developed or compiled in
- **Smart Guidance**: Step-by-step assistance for complex integration scenarios

## Architecture

V-Orchestrator acts as the coordination layer:
- Frontend: React-based UI with ReactFlow for visual workflow design
- Backend: Node.js/Express API for orchestration and model metadata
- Integration: REST APIs to EnviHub and PlantHub

## API Endpoints

### Models API
- `GET /api/models` - Get all models across all categories
- `GET /api/models/:category` - Get models by category (medac, envihub, planthub, vehicledata, middleware, platforms)

### Simulations API
- `GET /api/simulations` - Get all simulations
- `GET /api/simulations/:id` - Get simulation by ID
- `POST /api/simulations` - Create new simulation
- `PUT /api/simulations/:id` - Update simulation
- `DELETE /api/simulations/:id` - Delete simulation

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Install backend dependencies:
```bash
cd VirtuSpace/V-Orchestrator
npm install
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

### Running the Application

1. Start the backend server:
```bash
npm start
# Server runs on http://localhost:3010
```

2. Start the frontend development server:
```bash
cd frontend
npm start
# Frontend runs on http://localhost:3011
```

3. Access the application:
- Dashboard: http://localhost:3011/
- Layout Editor: http://localhost:3011/orchestrator
- Simulations: http://localhost:3011/simulations

## Usage Guide

### Creating a Workflow in Layout Editor

1. Navigate to the Layout Editor from the navigation menu
2. Create a new layout tab if needed using the "+ New Layout" button
3. Browse the Component Palette to find the models you need
4. Drag models from the palette onto the canvas
5. Add a simulation platform (e.g., dSPACE VEOS) to the canvas
6. Position models inside or near the platform frame
7. Connect models by clicking and dragging from connection handles
8. Use the canvas controls to zoom and navigate your workflow
9. Switch between tabs to manage multiple layouts

### Model Categories

**MeDaC Components:**
- Sensor Data Model
- Camera Data Processor
- LIDAR Data Handler
- Radar Data Parser

**EnviHub Models:**
- Weather Model
- Road Surface Model
- Traffic Scenario
- Terrain Model

**PlantHub Models:**
- Powertrain Model
- Battery Thermal Model
- Vehicle Dynamics
- Brake System Model

**VehicleData:**
- Vehicle Configurations (A, B)
- CAN Bus Data
- Calibration Data

**Co-Sim Middleware:**
- FMI/FMU Interface
- DCP Bridge
- SSP Connector

**Simulation Platforms:**
- dSPACE VEOS (Real-time simulation)
- Synopsys SILVER (Virtual ECU)
- Vector CANoe (Network simulation)
- IPG CarMaker (Vehicle dynamics)
- MATLAB/Simulink (Model-based design)

## Technology Stack

- **Frontend**: React 18, ReactFlow, React Router
- **Backend**: Node.js, Express
- **Styling**: Custom CSS with responsive design
- **Build**: React Scripts (Create React App)

## Contributing

See the main VirtuSpace documentation for contribution guidelines.

## License

© 2024 Bosch - V-Orchestrator | VirtuSpace Platform
