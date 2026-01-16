# VirtuSphere

VirtuSphere is an analytics and monitoring platform within VirtuVerse Studio that provides visualization and insights for simulations and platform usage, along with DevContainer generation capabilities.

## Overview

VirtuSphere contains:
- **V-Analyzer**: Grafana-based dashboard platform for simulation data visualization and platform metrics
- **V-DevContainers**: DevContainer generation tool for quick development environment setup
- **SmartHarness**: AI-enabled component providing intelligent insights and recommendations

## Deployment Architecture

VirtuSphere is designed for hybrid cloud deployment:
- **Frontend**: Deployed on Azure Static Web Apps
- **Backend Logic**: Hosted on Google Cloud Platform (GCP)
- **Integration**: Connected through the VirtuVerse Studio interface

For detailed GCP deployment instructions, see [GCP_DEPLOYMENT.md](./GCP_DEPLOYMENT.md).

## Purpose

VirtuSphere serves as the analytics hub for:
- Simulation results visualization
- Platform usage metrics
- Performance monitoring
- Trend analysis

## Components

### V-Analyzer
Dashboard platform that provides:
- Grafana dashboards for simulation data
- Real-time metrics from V-Orchestrator
- Platform usage statistics
- Historical trend analysis
- SmartHarness insights integration

### V-DevContainers
DevContainer generation tool that provides:
- Quick conversion of V-Orchestrator projects to DevContainers
- Individual component selection from PlantHub, EnviHub, and V-Orchestrator
- Independent or grouped container creation
- Pre-configured development environments
- SmartHarness-assisted container configuration

## Getting Started

### Local Development

To run VirtuSphere locally:

```bash
# Install dependencies
npm run install:all

# Start all services
./start-virtusphere.sh

# Access services
# - VirtuSphere Backend: http://localhost:3023
# - V-Analyzer Backend: http://localhost:3020
# - V-DevContainers Backend: http://localhost:3030

# Stop services
./stop-virtusphere.sh
```

### Individual Services

- For V-Analyzer setup, see the [V-Analyzer README](V-Analyzer/README.md)
- For V-DevContainers setup, see the V-DevContainers README
- For backend setup, see the [Backend README](backend/README.md)

### Testing

Test the backend services:

```bash
# Health check
curl http://localhost:3023/api/health

# Platform info
curl http://localhost:3023/api/info

# Service stats
curl http://localhost:3023/api/stats

# V-Analyzer dashboards
curl http://localhost:3023/api/v-analyzer/dashboards

# V-DevContainers projects
curl http://localhost:3023/api/v-devcontainers/projects
```

## UI Screenshots

### VirtuSphere Landing Page
![VirtuSphere Landing](docs/screenshots/virtusphere-landing.png)
*Main landing page providing access to V-Analyzer and V-DevContainers*

### V-Analyzer Dashboard
![V-Analyzer Dashboard](docs/screenshots/v-analyzer-dashboard.png)
*Analytics dashboard with simulation results and platform metrics*

### V-DevContainers Interface
![V-DevContainers Interface](docs/screenshots/v-devcontainers-main.png)
*DevContainer generation interface for projects and components*

> **Note**: Place actual screenshots in `VirtuSphere/docs/screenshots/` directory once deployed.
