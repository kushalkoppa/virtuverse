# VirtuSphere

VirtuSphere is an analytics and monitoring platform within VirtuVerse Studio that provides visualization and insights for simulations and platform usage, along with DevContainer generation and assessment capabilities.

## Overview

VirtuSphere contains:
- **Main Dashboard**: Unified landing page for all VirtuSphere sub-platforms (Port: 3025)
- **V-Analyzer**: Grafana-based dashboard platform for simulation data visualization and platform metrics (Port: 3021)
- **V-DevContainers**: DevContainer generation tool for quick development environment setup (Port: 3031)
- **V-Assessor**: Assessment and evaluation platform for simulation models and results (External: https://simulab.de.bosch.com:4200/costa)
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

### VirtuSphere Main Dashboard
Landing page that provides access to all sub-platforms:
- Unified interface for analytics and visualization tools
- Easy navigation between V-Analyzer, V-DevContainers, and V-Assessor
- SmartHarness integration overview
- Port: 3025

### V-Analyzer
Dashboard platform that provides:
- Grafana dashboards for simulation data
- Real-time metrics from V-Orchestrator
- Platform usage statistics
- Historical trend analysis
- SmartHarness insights integration
- Port: 3021 (Frontend), 3020 (Backend)

### V-DevContainers
DevContainer generation tool that provides:
- Quick conversion of V-Orchestrator projects to DevContainers
- Individual component selection from PlantHub, EnviHub, and V-Orchestrator
- Independent or grouped container creation
- Pre-configured development environments
- SmartHarness-assisted container configuration
- Port: 3031 (Frontend), 3030 (Backend)

### V-Assessor
Assessment and evaluation platform that provides:
- Model assessment and quality metrics
- Performance evaluation
- Compliance checking
- Integration with external assessment tools
- URL: https://simulab.de.bosch.com:4200/costa

## Getting Started

### Local Development

To run VirtuSphere locally:

```bash
# Install dependencies
npm run install:all

# Start all services (frontends and backends)
./start-virtusphere.sh

# Access services
# - VirtuSphere Main Dashboard: http://localhost:3025
# - V-Analyzer Frontend: http://localhost:3021
# - V-Analyzer Backend: http://localhost:3020
# - V-DevContainers Frontend: http://localhost:3031
# - V-DevContainers Backend: http://localhost:3030
# - VirtuSphere Backend: http://localhost:3023
# - V-Assessor: https://simulab.de.bosch.com:4200/costa (external)

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
