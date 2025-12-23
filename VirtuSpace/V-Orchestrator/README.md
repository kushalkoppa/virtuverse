# V-Orchestrator

V-Orchestrator is a simulation orchestration platform within VirtuSpace that manages and coordinates simulation workflows with **SmartHarness** AI assistance for intelligent model integration.

## Overview

V-Orchestrator provides:
- **Simulation Management**: Orchestrate open-loop and closed-loop simulations
- **Workflow Coordination**: Manage simulation pipelines and dependencies
- **Resource Allocation**: Optimize compute resources for simulations
- **Results Tracking**: Monitor and track simulation results
- **SmartHarness Integration**: AI-powered model integration and compatibility checking

## Features

### 1. Simulation Orchestration
- Create and manage simulation workflows
- Configure simulation parameters
- Schedule simulation runs
- Monitor execution status

### 2. Open-Loop Simulations
- Define input scenarios
- Execute simulations
- Collect results
- Generate reports

### 3. Closed-Loop Simulations
- Configure feedback loops
- Real-time parameter adjustment
- Iterative execution
- Convergence monitoring

### 4. Integration
- Integrates with EnviHub for environment simulations
- Integrates with PlantHub for manufacturing simulations
- Sends results to V-Analyzer for visualization

### 5. SmartHarness - Model Integration Assistant
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
- Frontend: React-based UI for workflow management
- Backend: Node.js/Express API for orchestration
- Integration: REST APIs to EnviHub and PlantHub

## Getting Started

See the main VirtuSpace documentation for setup instructions.

## UI Screenshots

### V-Orchestrator Dashboard
![V-Orchestrator Dashboard](docs/screenshots/v-orchestrator-dashboard.png)
*Main orchestration interface showing simulation workflows and status*

### SmartHarness Model Integration
![SmartHarness Integration](docs/screenshots/v-orchestrator-smartharness.png)
*SmartHarness interface assisting with model integration and compatibility analysis*

### Simulation Workflow Configuration
![Workflow Configuration](docs/screenshots/v-orchestrator-workflow.png)
*Configure and manage complex simulation workflows with AI assistance*

### Model Interface Analysis
![Interface Analysis](docs/screenshots/v-orchestrator-interfaces.png)
*Detailed view of model interfaces with direction, datatype, and source tool information*

> **Note**: Place actual screenshots in `V-Orchestrator/docs/screenshots/` directory once deployed.
