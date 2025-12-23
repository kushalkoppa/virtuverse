# GitHub Actions Workflows

This directory contains GitHub Actions workflow files that automate the build, test, and deployment processes for the VirtuVerse platform.

## Workflow Files

### 1. Azure VM Deployment (`azure-deployment.yml`) **NEW**
**Triggers:** Push to main, pull requests, and manual workflow dispatch
- **Purpose**: Primary deployment workflow with Azure VM self-hosted runner support
- Builds all components of the platform (VirtuSpace, EnviHub, PlantHub, V-Orchestrator)
- Supports both GitHub-hosted and self-hosted Azure VM runners
- Automatic deployment to Azure VM when using self-hosted runner
- **Manual Deployment Options**:
  - Choose runner type: `self-hosted` or `ubuntu-latest`
  - Select deployment target: `all` or specific platform
- Provides comprehensive build and deployment summary

### 2. Full Pipeline CI/CD (`full-pipeline.yml`)
**Triggers:** All pushes, pull requests, and manual workflow dispatch
- Builds all components of the platform (main frontend/backend, EnviHub, PlantHub, V-Orchestrator)
- Tests Docker image builds
- Provides comprehensive build summary
- Runs on every push to ensure overall system integrity
- **NEW**: Supports manual runner selection via workflow_dispatch

### 3. Main CI/CD Pipeline (`main-ci.yml`)
**Triggers:** Changes to `VirtuSpace/frontend/` or `VirtuSpace/backend/` directories
- **Frontend Job:**
  - Installs dependencies
  - Lints frontend code (optional)
  - Builds React/Vite application
  - Uploads build artifacts
- **Backend Job:**
  - Installs dependencies
  - Runs tests
  - Validates server startup
- **NEW**: Supports manual runner selection via workflow_dispatch

### 4. EnviHub CI/CD Pipeline (`envihub-ci.yml`)
**Triggers:** Changes to `VirtuSpace/EnviHub/` directory
- Builds EnviHub frontend application
- Tests EnviHub backend and validates server startup
- **NEW**: Supports manual runner selection via workflow_dispatch

### 5. PlantHub CI/CD Pipeline (`planthub-ci.yml`)
**Triggers:** Changes to `VirtuSpace/PlantHub/` directory
- Builds PlantHub frontend application
- Tests PlantHub backend and validates server startup
- **NEW**: Supports manual runner selection via workflow_dispatch

### 6. V-Orchestrator CI/CD Pipeline (`v-orchestrator-ci.yml`)
**Triggers:** Changes to `VirtuSpace/V-Orchestrator/` directory
- Builds V-Orchestrator frontend application
- Tests V-Orchestrator backend and validates server startup
- **NEW**: Supports manual runner selection via workflow_dispatch

## Runner Configuration

All workflows now support both **GitHub-hosted** and **self-hosted** runners:

### GitHub-Hosted Runners (Default)
- Automatically provisioned by GitHub
- Clean environment for each run
- No setup required
- Used by default for all automated triggers (push, pull_request)

### Self-Hosted Runners (Azure VM)
- Hosted on your Azure Linux VM
- Persistent environment
- Can deploy directly to the VM
- Requires setup (see [AZURE_RUNNER_SETUP.md](../../AZURE_RUNNER_SETUP.md))

### Selecting Runner Type

#### Automatic (Default Behavior):
- **azure-deployment.yml**: Uses self-hosted runner by default
- **All other workflows**: Use GitHub-hosted runners by default

#### Manual Selection:
All workflows support manual runner selection via workflow_dispatch:

1. Go to **Actions** tab
2. Select the workflow
3. Click **Run workflow**
4. Choose runner type from dropdown:
   - `ubuntu-latest` - GitHub-hosted runner
   - `self-hosted` - Your Azure VM runner
5. Click **Run workflow**

## Trigger Conditions

All workflows are triggered by:
- **Push events** to `main` or `develop` branches
- **Pull request events** targeting `main` or `develop` branches
- Path-specific triggers ensure only relevant workflows run for each change

## Technology Stack

- **Node.js:** Version 18
- **Build Tools:** Vite (frontend), npm (all)
- **Docker:** Multi-stage builds for production deployments
- **Artifact Storage:** Build artifacts retained for 7 days
- **Runners:** GitHub-hosted (ubuntu-latest) or Self-hosted (Azure VM)

## Workflow Features

### Runner Support
- **Dual Runner Support**: All workflows work with both GitHub-hosted and self-hosted runners
- **Automatic Runner Selection**: Smart defaults based on workflow trigger
- **Manual Override**: Select runner type via workflow_dispatch for testing

### Dependency Management
- Uses `npm install` instead of `npm ci` for flexibility
- No package-lock.json required
- Compatible with package.json only

### Error Handling
- `continue-on-error: true` for non-critical steps
- Ensures pipeline completes even if some optional checks fail

### Artifact Management
- Build artifacts uploaded for deployment
- 7-day retention policy for build outputs
- Artifacts automatically deployed to Azure VM when using self-hosted runner

### Deployment
- **Azure VM Deployment**: Automatic deployment when using self-hosted runner
- **Deployment Directory**: `/opt/virtuverse/deployments/` on Azure VM
- **Health Checks**: Automated post-deployment verification

### Parallel Execution
- Independent jobs run in parallel for faster feedback
- Platform-specific workflows run only when needed

## Local Testing

Before pushing changes, you can test builds locally:

```bash
# Frontend
cd frontend
npm ci
npm run lint
npm run build

# Backend
cd backend
npm install
npm test

# EnviHub
cd EnviHub/frontend && npm install && npm run build
cd EnviHub/backend && npm install && npm test

# PlantHub
cd PlantHub/frontend && npm install && npm run build
cd PlantHub/backend && npm install && npm test

# V-Orchestrator
cd V-Orchestrator/frontend && npm install && npm run build
cd V-Orchestrator/backend && npm install && npm test
```

## Viewing Workflow Results

1. Navigate to the **Actions** tab in the GitHub repository
2. Select a workflow run to view details
3. Click on individual jobs to see logs
4. Download artifacts from successful builds

## Adding New Workflows

To add a new workflow:
1. Create a new `.yml` file in `.github/workflows/`
2. Define the trigger conditions
3. Add jobs with appropriate steps
4. Test with a pull request

## Workflow Badges

Add workflow status badges to your README:

```markdown
![Azure VM Deployment](https://github.com/kushalkoppa/virtuverse/actions/workflows/azure-deployment.yml/badge.svg)
![Full Pipeline](https://github.com/kushalkoppa/virtuverse/actions/workflows/full-pipeline.yml/badge.svg)
![Main CI/CD](https://github.com/kushalkoppa/virtuverse/actions/workflows/main-ci.yml/badge.svg)
```

## Azure VM Self-Hosted Runner Setup

To use the self-hosted runner features, you need to configure an Azure Linux VM as a GitHub Actions runner.

**See detailed setup instructions in [AZURE_RUNNER_SETUP.md](../../AZURE_RUNNER_SETUP.md)**

Quick setup steps:
1. Provision Azure Linux VM (Ubuntu 20.04+)
2. Install Node.js 18 and required dependencies
3. Download and configure GitHub Actions runner
4. Start runner as a service
5. Create deployment directories
6. Test with manual workflow trigger

## Troubleshooting

### Build Failures
- Check the Actions tab for detailed error logs
- Verify dependencies are correctly specified in package.json
- Ensure Node.js version compatibility

### Cache Issues
- Workflows automatically handle cache invalidation
- Manual cache clearing: modify cache key in workflow file

### Permission Issues
- Ensure repository has proper workflow permissions enabled
- Check GITHUB_TOKEN permissions in repository settings

## Best Practices

1. **Keep workflows focused:** Each workflow handles specific components
2. **Use path filters:** Reduce unnecessary workflow runs
3. **Cache dependencies:** Faster builds with npm caching
4. **Fail fast:** Critical failures stop the workflow early
5. **Artifact retention:** Balance storage costs with debugging needs

## Maintenance

- Review and update Node.js versions periodically
- Update action versions (e.g., `actions/checkout@v4`)
- Monitor workflow run times and optimize as needed
- Clean up old artifacts to manage storage
