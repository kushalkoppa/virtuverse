# V-DevContainers

V-DevContainers is a development container generation tool within VirtuSphere that enables quick conversion of VirtuVerse projects and components into ready-to-use DevContainers with **SmartHarness** AI-assisted configuration.

## Overview

V-DevContainers provides:
- **Project Conversion**: Convert entire V-Orchestrator projects into DevContainers
- **Component Selection**: Select individual components from PlantHub, EnviHub, and V-Orchestrator
- **Flexible Container Creation**: Create independent or grouped containers based on user selection
- **Pre-configured Environments**: Automatically configure development environments with all dependencies
- **SmartHarness Integration**: AI-powered container configuration and optimization

## Features

### 1. V-Orchestrator Project Conversion
- Select any project from V-Orchestrator
- Automatically generate DevContainer configuration
- Include all project dependencies and tools
- Configure environment variables and settings
- One-click container generation

### 2. Individual Component Selection
Select components from multiple sources:
- **V-Orchestrator Components**: Simulation workflows and orchestration configs
- **EnviHub Components**: Environment models and simulation tool integrations
- **PlantHub Components**: Plant models and manufacturing simulations

### 3. Container Generation Options
- **Independent Containers**: Create separate containers for each selected component
- **Grouped Containers**: Combine selected components into a single container
- **Custom Configuration**: Fine-tune container settings and dependencies
- **Multi-stage Builds**: Optimize container size and build time

### 4. SmartHarness - DevContainer Assistant
SmartHarness in V-DevContainers provides:
- **Intelligent Configuration**: Automatically detect and configure required tools and dependencies
- **Compatibility Analysis**: Ensure all selected components work together in the container
- **Optimization Recommendations**: Suggest optimal container structure and resource allocation
- **Dependency Resolution**: Automatically resolve and include all necessary dependencies
- **Tool Version Selection**: Recommend compatible tool versions based on component requirements
- **Security Scanning**: Check container configuration for security best practices
- **Performance Tuning**: Optimize container performance for development workflows
- **Quick Start Templates**: Generate ready-to-use templates based on component selection

## Architecture

V-DevContainers is built with:
- **Frontend**: React-based UI for component selection and configuration
- **Backend**: Node.js/Express API for container generation
- **Container Builder**: Docker-based container creation engine
- **SmartHarness Engine**: AI-powered analysis and configuration

## Getting Started

### Prerequisites
- Docker installed and running
- Access to VirtuVerse Studio
- Node.js v18 or higher

### Running V-DevContainers

#### Backend Setup

```bash
cd backend
npm install
npm start
```

Backend API will be available at `http://localhost:3030`

#### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at `http://localhost:3031`

## Usage Workflow

### 1. Select Source
Choose your source for DevContainer generation:
- **V-Orchestrator Project**: Select an entire project
- **Individual Components**: Pick specific components from PlantHub, EnviHub, or V-Orchestrator

### 2. Configure Container
- Choose container type (independent or grouped)
- Configure environment settings
- Review SmartHarness recommendations
- Customize advanced options

### 3. Generate Container
- Click generate to create DevContainer configuration
- SmartHarness validates and optimizes configuration
- Download generated files or deploy directly

### 4. Use DevContainer
- Open in VS Code with Dev Containers extension
- Container automatically sets up development environment
- Start developing immediately

## API Endpoints

### Project Selection
- `GET /api/projects` - List available V-Orchestrator projects
- `GET /api/projects/:id` - Get project details

### Component Selection
- `GET /api/components/envihub` - List EnviHub components
- `GET /api/components/planthub` - List PlantHub components
- `GET /api/components/v-orchestrator` - List V-Orchestrator components

### Container Generation
- `POST /api/devcontainer/generate` - Generate DevContainer configuration
- `POST /api/devcontainer/validate` - Validate configuration
- `GET /api/devcontainer/:id/download` - Download generated configuration

### SmartHarness API
- `POST /api/smartharness/analyze` - Analyze selected components
- `POST /api/smartharness/recommend` - Get configuration recommendations
- `POST /api/smartharness/optimize` - Optimize container configuration
- `POST /api/smartharness/dependencies` - Resolve dependencies

## DevContainer Templates

V-DevContainers provides templates for common scenarios:

### 1. Full Stack Simulation Environment
- V-Orchestrator + EnviHub + PlantHub
- All simulation tools and dependencies
- Pre-configured integration

### 2. Environment Modeling Only
- EnviHub components only
- CarMaker and simulation tools
- Lightweight configuration

### 3. Plant Simulation Development
- PlantHub components only
- Manufacturing simulation tools
- Factory planning utilities

### 4. Custom Selection
- Mix and match components
- SmartHarness-optimized configuration
- Flexible dependency management

## Configuration Options

### Container Settings
- Base image selection
- Resource limits (CPU, memory)
- Port mappings
- Volume mounts

### Development Tools
- VS Code extensions
- Git configuration
- Shell preferences
- Terminal setup

### Integration Settings
- Database connections
- API endpoints
- Authentication tokens
- Environment variables

## SmartHarness Capabilities

### Automatic Dependency Detection
- Scan selected components for dependencies
- Identify required tools and libraries
- Resolve version conflicts automatically

### Compatibility Checking
- Ensure components work together
- Validate tool compatibility
- Check for known issues

### Performance Optimization
- Optimize container size
- Configure resource allocation
- Recommend caching strategies
- Suggest multi-stage build optimizations

### Security Best Practices
- Scan for security vulnerabilities
- Recommend secure configurations
- Check for exposed secrets
- Validate user permissions

## Technology Stack

### Frontend
- React 18
- React Router
- Lucide Icons
- Vite

### Backend
- Node.js
- Express 5
- Docker SDK
- File System API

### Container
- Docker
- devcontainer.json specification
- Docker Compose (for multi-container)

## Integration with Other Platforms

V-DevContainers seamlessly integrates with:
- **V-Orchestrator**: Direct project import and conversion
- **EnviHub**: Component selection and model integration
- **PlantHub**: Plant model and simulation tool inclusion
- **VirtuVerse Studio**: Authentication and user management

## Troubleshooting

### Docker Not Running
Ensure Docker Desktop is running before generating containers.

### Component Not Found
Verify component exists in source platform and user has access.

### Generation Failed
Check SmartHarness logs for detailed error information.

### Container Won't Start
Review generated configuration and validate dependencies.

## UI Screenshots

### V-DevContainers Main Interface
![V-DevContainers Main](docs/screenshots/v-devcontainers-main.png)
*Main interface for selecting projects and components*

### Project Selection View
![Project Selection](docs/screenshots/v-devcontainers-project-selection.png)
*Select V-Orchestrator projects for container generation*

### Component Selection Interface
![Component Selection](docs/screenshots/v-devcontainers-component-selection.png)
*Choose individual components from PlantHub, EnviHub, and V-Orchestrator*

### SmartHarness Configuration Assistant
![SmartHarness Config](docs/screenshots/v-devcontainers-smartharness-config.png)
*SmartHarness providing intelligent configuration recommendations*

### Container Configuration Panel
![Container Config](docs/screenshots/v-devcontainers-configuration.png)
*Configure container settings with SmartHarness optimization suggestions*

### Dependency Resolution View
![Dependency Resolution](docs/screenshots/v-devcontainers-dependencies.png)
*SmartHarness automatically resolving and displaying dependencies*

### Container Generation Progress
![Generation Progress](docs/screenshots/v-devcontainers-generation.png)
*Real-time progress of DevContainer generation*

### Generated Container Preview
![Container Preview](docs/screenshots/v-devcontainers-preview.png)
*Preview and download generated DevContainer configuration*

> **Note**: Place actual screenshots in `V-DevContainers/docs/screenshots/` directory once deployed.

## Future Enhancements

- [ ] Support for additional container runtimes (Podman, containerd)
- [ ] Cloud-based container registry integration
- [ ] Team collaboration features
- [ ] Container templates marketplace
- [ ] Advanced networking configurations
- [ ] Kubernetes deployment option
- [ ] CI/CD pipeline integration
- [ ] Container performance monitoring

## Support

For issues or questions:
1. Check the main VirtuSphere [README.md](../README.md)
2. Review VirtuVerse Studio documentation
3. Contact the VirtuVerse development team

## License

ISC License - © 2024 Bosch
