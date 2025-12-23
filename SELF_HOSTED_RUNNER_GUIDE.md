# Self-Hosted Runner Setup and Deployment Guide

This guide explains how to set up and use self-hosted runners for automatic deployment of VirtuVerse applications.

## Overview

The VirtuVerse project now supports automatic deployment to self-hosted runners:
- **VectorLinuxMachine** - Linux self-hosted runner for deploying VirtuSpace, EnviHub, PlantHub, and V-Orchestrator
- **VirtuGo** - Windows self-hosted runner for deploying Windows-specific builds

## Self-Hosted Runner Setup

### Linux Runner (VectorLinuxMachine)

1. **Install Prerequisites**
   ```bash
   # Update system
   sudo apt-get update && sudo apt-get upgrade -y
   
   # Install Node.js 18.x
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install build essentials
   sudo apt-get install -y build-essential git curl wget
   ```

2. **Configure GitHub Runner**
   - Go to GitHub repository → Settings → Actions → Runners
   - Click "New self-hosted runner" and select Linux
   - Follow the setup instructions to download and configure the runner
   - **Important**: Name the runner `VectorLinuxMachine` or add it as a label

3. **Create Deployment Directory**
   ```bash
   sudo mkdir -p /opt/virtuverse/deployments
   sudo chown -R $USER:$USER /opt/virtuverse
   chmod -R 755 /opt/virtuverse
   ```

### Windows Runner (VirtuGo)

1. **Install Prerequisites**
   - Install Node.js 18+ from https://nodejs.org/
   - Install Git from https://git-scm.com/
   - Ensure PowerShell 5.1+ is available

2. **Configure GitHub Runner**
   - Go to GitHub repository → Settings → Actions → Runners
   - Click "New self-hosted runner" and select Windows
   - Follow the setup instructions to download and configure the runner
   - **Important**: Name the runner `VirtuGo` or add it as a label

3. **Create Deployment Directory**
   ```powershell
   New-Item -ItemType Directory -Force -Path "C:\VirtuVerse\deployments"
   ```

## Workflow Triggers and Deployment

### Automatic Deployment (Push to main)

When code is pushed to the `main` branch:
1. **Linux Builds** (`full-pipeline.yml`):
   - Automatically uses `VectorLinuxMachine` runner
   - Builds all VirtuSpace components
   - Deploys to `/opt/virtuverse/deployments/` on the Linux VM

2. **Windows Builds** (`windows-ci.yml`):
   - Automatically uses `VirtuGo` runner
   - Builds all Windows-compatible components
   - Deploys to `C:\VirtuVerse\deployments\` on the Windows VM

### Manual Deployment (workflow_dispatch)

You can manually trigger deployments with custom options:

#### Full Pipeline (Linux)
1. Go to Actions → Full Pipeline CI/CD
2. Click "Run workflow"
3. Select options:
   - **Runner type**: `VectorLinuxMachine`, `self-hosted`, or `ubuntu-latest`
   - **Deploy**: `true` or `false`
4. Click "Run workflow"

#### Windows Pipeline
1. Go to Actions → Windows CI/CD Pipeline
2. Click "Run workflow"
3. Select options:
   - **Component**: Choose specific component or `all`
   - **Runner type**: `VirtuGo` or `windows-latest`
   - **Deploy**: `true` or `false`
4. Click "Run workflow"

#### Azure Deployment (Linux)
1. Go to Actions → Azure VM Deployment
2. Click "Run workflow"
3. Select options:
   - **Runner type**: `VectorLinuxMachine`, `self-hosted`, or `ubuntu-latest`
   - **Deploy target**: Choose specific component or `all`
4. Click "Run workflow"

## Deployment Locations

### Linux (VectorLinuxMachine)
Applications are deployed to:
```
/opt/virtuverse/deployments/
├── virtuspace-frontend/
├── envihub/
├── planthub/
└── v-orchestrator/
```

### Windows (VirtuGo)
Applications are deployed to:
```
C:\VirtuVerse\deployments\
├── virtuverse-studio\
├── virtuspace-frontend\
├── envihub\
├── planthub\
└── v-orchestrator\
```

## Accessing Deployed Applications

After successful deployment, access applications at:
- **VirtuSpace**: http://\<vm-ip\>:3003
- **EnviHub**: http://\<vm-ip\>:3001
- **PlantHub**: http://\<vm-ip\>:3002
- **V-Orchestrator**: http://\<vm-ip\>:3005

Replace `<vm-ip>` with your VM's IP address or hostname.

## Workflow Files Reference

- **`.github/workflows/full-pipeline.yml`** - Main CI/CD pipeline for Linux builds and deployment
- **`.github/workflows/windows-ci.yml`** - Windows CI/CD pipeline for Windows builds and deployment
- **`.github/workflows/azure-deployment.yml`** - Azure-specific deployment workflow

## Testing the Setup

### Test EnviHub Tests
```bash
cd VirtuSpace/EnviHub
npm install
npm test
```

The tests should now complete without hanging.

### Test Manual Workflow Trigger
1. Go to Actions tab in GitHub
2. Select any workflow
3. Click "Run workflow" with manual dispatch
4. Verify it runs on the correct runner

### Verify Deployment
After a successful workflow run:

**Linux:**
```bash
ls -la /opt/virtuverse/deployments/
```

**Windows:**
```powershell
Get-ChildItem C:\VirtuVerse\deployments\
```

## Troubleshooting

### Runner Not Picking Up Jobs
1. Check runner status: GitHub → Settings → Actions → Runners
2. Verify runner labels match workflow requirements
3. Restart runner service:
   - **Linux**: `cd ~/actions-runner && sudo ./svc.sh restart`
   - **Windows**: Restart the GitHub Actions Runner service

### Deployment Fails
1. Check runner has write permissions to deployment directory
2. Verify Node.js and npm are installed and in PATH
3. Check runner logs for errors

### Tests Still Hanging
1. Ensure `NODE_ENV=test` is set in the test script
2. Verify Jest configuration has `forceExit: true`
3. Check that server.js conditionally starts the server

## Summary of Changes

### 1. Fixed Jest Hanging Issue
- Modified `VirtuSpace/EnviHub/backend/server.js` to only start server when not in test mode
- Added `jest.config.js` with proper timeout and `forceExit` settings
- Updated test script to set `NODE_ENV=test`

### 2. Enhanced Workflows
- Added support for `VectorLinuxMachine` (Linux) and `VirtuGo` (Windows) runners
- Added automatic deployment steps when pushing to main branch
- Added manual deployment options via workflow_dispatch
- Added artifact upload for all build outputs
- Improved runner selection logic to use self-hosted runners by default on main branch

### 3. Deployment Automation
- Builds automatically trigger on push to main/develop branches
- Deployments automatically happen on self-hosted runners when pushing to main
- Manual control available via workflow_dispatch for testing and specific deployments

## Next Steps

1. Set up your self-hosted runners with the names `VectorLinuxMachine` and `VirtuGo`
2. Push a test commit to a non-main branch to verify builds work
3. Merge to main to trigger automatic deployment
4. Access your deployed applications at the URLs listed above
5. Configure reverse proxy (nginx/IIS) if needed for production access

## Support

For issues or questions:
- Check workflow run logs in the Actions tab
- Review runner logs on the self-hosted machines
- Refer to [AZURE_RUNNER_SETUP.md](./AZURE_RUNNER_SETUP.md) for detailed runner setup
- Refer to [WINDOWS_RUNNER_COMPATIBILITY.md](./WINDOWS_RUNNER_COMPATIBILITY.md) for Windows-specific details
