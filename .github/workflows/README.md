# GitHub Actions Workflows

This directory contains streamlined GitHub Actions workflow files that automate the build, test, and deployment processes for the VirtuVerse platform.

## Workflow Files

### 1. Full Pipeline CI/CD (`full-pipeline.yml`)
**Triggers:** All pushes, pull requests, and manual workflow dispatch
- **Purpose**: Main CI/CD workflow for all platform components
- Builds all components: VirtuSpace (frontend/backend), EnviHub, PlantHub, V-Orchestrator
- Tests Docker image builds
- Runs on every push to ensure overall system integrity
- Supports manual runner selection via workflow_dispatch

### 2. Azure VM Deployment (`azure-deployment.yml`)
**Triggers:** Push to main, pull requests, and manual workflow dispatch
- **Purpose**: Deployment workflow with Azure VM self-hosted runner support
- Builds all components of the platform (VirtuSpace, EnviHub, PlantHub, V-Orchestrator)
- Supports both GitHub-hosted (`ubuntu-latest`) and self-hosted Azure VM runners
- Automatic deployment to Azure VM when using self-hosted runner
- **Manual Deployment Options**:
  - Choose runner type: `self-hosted` or `ubuntu-latest`
  - Select deployment target: `all` or specific platform component

### 3. Windows CI/CD Pipeline (`windows-ci.yml`)
**Triggers:** All pushes, pull requests, and manual workflow dispatch
- **Purpose**: Windows platform-specific builds and tests
- Tests all components on Windows environment (VirtuVerse Studio, VirtuSpace, EnviHub, PlantHub, V-Orchestrator)
- Supports selective component building via workflow_dispatch
- Validates Windows compatibility

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

- **full-pipeline.yml**: Triggered by all pushes and PRs to `main` or `develop` branches
- **azure-deployment.yml**: Triggered by pushes and PRs to `main` branch, plus manual dispatch
- **windows-ci.yml**: Triggered by all pushes and PRs to `main` or `develop` branches

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
- All platform components build concurrently in full-pipeline workflow

## Local Testing

Before pushing changes, you can test builds locally:

```bash
# VirtuSpace Frontend
cd VirtuSpace/frontend
npm install
npm run lint
npm run build

# VirtuSpace Backend
cd VirtuSpace/backend
npm install
npm test

# EnviHub
cd VirtuSpace/EnviHub
npm install
npm test
npm run build

# PlantHub
cd VirtuSpace/PlantHub
npm install
npm test
npm run build

# V-Orchestrator
cd VirtuSpace/V-Orchestrator/frontend && npm install && npm run build
cd VirtuSpace/V-Orchestrator/backend && npm install && npm test
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
![Full Pipeline CI/CD](https://github.com/kushalkoppa/virtuverse/actions/workflows/full-pipeline.yml/badge.svg)
![Azure VM Deployment](https://github.com/kushalkoppa/virtuverse/actions/workflows/azure-deployment.yml/badge.svg)
![Windows CI/CD](https://github.com/kushalkoppa/virtuverse/actions/workflows/windows-ci.yml/badge.svg)
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

1. **Consolidated workflows:** Full pipeline workflow handles all components efficiently
2. **Platform-specific testing:** Use windows-ci for Windows compatibility checks
3. **Cache dependencies:** Faster builds with npm caching
4. **Fail fast:** Critical failures stop the workflow early
5. **Artifact retention:** Balance storage costs with debugging needs

## Maintenance

- Review and update Node.js versions periodically
- Update action versions (e.g., `actions/checkout@v4`)
- Monitor workflow run times and optimize as needed
- Clean up old artifacts to manage storage
