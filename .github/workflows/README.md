# GitHub Actions Workflows

This directory contains GitHub Actions workflow files that automate the build, test, and deployment processes for the VirtuVerse platform.

## Workflow Files

### 1. Full Pipeline CI/CD (`full-pipeline.yml`)
**Triggers:** All pushes, pull requests, and manual workflow dispatch
- Builds all components of the platform (main frontend/backend, EnviHub, PlantHub, V-Orchestrator)
- Tests Docker image builds
- Provides comprehensive build summary
- Runs on every push to ensure overall system integrity

### 2. Main CI/CD Pipeline (`main-ci.yml`)
**Triggers:** Changes to `frontend/` or `backend/` directories
- **Frontend Job:**
  - Lints frontend code
  - Builds React/Vite application
  - Uploads build artifacts
- **Backend Job:**
  - Installs dependencies
  - Runs tests
  - Validates server startup

### 3. EnviHub CI/CD Pipeline (`envihub-ci.yml`)
**Triggers:** Changes to `EnviHub/` directory
- **Frontend Job:** Builds EnviHub frontend application
- **Backend Job:** Tests EnviHub backend and validates server startup
- **Integration Tests:** Runs EnviHub-specific integration tests

### 4. PlantHub CI/CD Pipeline (`planthub-ci.yml`)
**Triggers:** Changes to `PlantHub/` directory
- **Frontend Job:** Builds PlantHub frontend application
- **Backend Job:** Tests PlantHub backend and validates server startup
- **Integration Tests:** Runs PlantHub-specific integration tests

### 5. V-Orchestrator CI/CD Pipeline (`v-orchestrator-ci.yml`)
**Triggers:** Changes to `V-Orchestrator/` directory
- **Frontend Job:** Builds V-Orchestrator frontend application
- **Backend Job:** Tests V-Orchestrator backend and validates server startup
- **Integration Tests:** Runs V-Orchestrator-specific integration tests

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

## Workflow Features

### Caching
- npm package caching for faster builds
- Cache is scoped to specific package.json files

### Error Handling
- `continue-on-error: true` for non-critical steps
- Ensures pipeline completes even if some optional checks fail

### Artifact Management
- Build artifacts uploaded for deployment
- 7-day retention policy for build outputs

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
![Main CI/CD](https://github.com/kushalkoppa/virtuverse/actions/workflows/main-ci.yml/badge.svg)
![Full Pipeline](https://github.com/kushalkoppa/virtuverse/actions/workflows/full-pipeline.yml/badge.svg)
```

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
