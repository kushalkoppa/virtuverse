# Azure VM Self-Hosted Runner Setup

This guide explains how to configure an Azure Linux VM as a GitHub Actions self-hosted runner for the VirtuVerse project.

## Prerequisites

- Azure Linux VM (Ubuntu 20.04 or later recommended)
- SSH access to the VM
- GitHub repository admin access
- Minimum VM specifications:
  - 2 CPU cores
  - 4 GB RAM
  - 20 GB disk space

## Step 1: Prepare Azure Linux VM

### 1.1 Connect to your Azure VM

```bash
ssh <your-username>@<vm-ip-address>
```

### 1.2 Update system packages

```bash
sudo apt-get update
sudo apt-get upgrade -y
```

### 1.3 Install required dependencies

```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version

# Install build essentials
sudo apt-get install -y build-essential git curl wget

# Install Docker (optional, for Docker builds)
sudo apt-get install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
```

## Step 2: Configure GitHub Self-Hosted Runner

### 2.1 Navigate to GitHub Repository Settings

1. Go to your repository: `https://github.com/kushalkoppa/virtuverse`
2. Click on **Settings** → **Actions** → **Runners**
3. Click **New self-hosted runner**
4. Select **Linux** as the operating system

### 2.2 Download and Configure Runner on Azure VM

Follow the commands provided by GitHub (they will look similar to below):

```bash
# Create a folder for the runner
mkdir actions-runner && cd actions-runner

# Download the latest runner package
curl -o actions-runner-linux-x64-2.311.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.311.0/actions-runner-linux-x64-2.311.0.tar.gz

# Extract the installer
tar xzf ./actions-runner-linux-x64-2.311.0.tar.gz
```

### 2.3 Configure the Runner

```bash
# Configure the runner
./config.sh --url https://github.com/kushalkoppa/virtuverse --token <YOUR-TOKEN>

# When prompted:
# - Enter the name of runner: azure-vm-runner (or your preferred name)
# - Enter any additional labels: self-hosted,azure,linux
# - Enter name of work folder: _work
```

### 2.4 Install and Start Runner as a Service

```bash
# Install the service
sudo ./svc.sh install

# Start the service
sudo ./svc.sh start

# Check status
sudo ./svc.sh status
```

## Step 3: Configure Runner Labels

Make sure your runner has the following labels:
- `self-hosted`
- `Linux`
- `X64`
- `azure` (optional, for identification)

## Step 4: Test the Runner

### 4.1 Trigger a Workflow Manually

1. Go to **Actions** tab in your repository
2. Select **Azure VM Deployment** workflow
3. Click **Run workflow**
4. Select `self-hosted` as the runner type
5. Click **Run workflow**

### 4.2 Verify Runner is Picked Up

- Check the workflow run to ensure it's using your self-hosted runner
- Look for "Runner: self-hosted" in the job logs

## Step 5: Configure Deployment Directory

Create the deployment directory on your Azure VM:

```bash
# Create deployment directory
sudo mkdir -p /opt/virtuverse/deployments
sudo mkdir -p /opt/virtuverse/deployments/frontend
sudo mkdir -p /opt/virtuverse/deployments/backend

# Set appropriate permissions
sudo chown -R $USER:$USER /opt/virtuverse
chmod -R 755 /opt/virtuverse
```

## Step 6: Configure Environment Variables (Optional)

If your application requires environment variables:

```bash
# Create .env file
sudo nano /opt/virtuverse/.env

# Add your environment variables:
# NODE_ENV=production
# PORT=3000
# etc.
```

## Workflow Configuration

The following workflows now support self-hosted runners:

1. **azure-deployment.yml** - Main deployment workflow (defaults to self-hosted)
2. **full-pipeline.yml** - Full CI/CD pipeline (manual selection via workflow_dispatch)
3. **main-ci.yml** - Main VirtuSpace CI/CD (manual selection)
4. **envihub-ci.yml** - EnviHub CI/CD (manual selection)
5. **planthub-ci.yml** - PlantHub CI/CD (manual selection)
6. **v-orchestrator-ci.yml** - V-Orchestrator CI/CD (manual selection)

## Usage

### Automatic Deployment (Push to main)

When you push to the `main` branch, the **Azure VM Deployment** workflow will automatically:
1. Build all platforms
2. Run tests
3. Deploy to your Azure VM using the self-hosted runner

### Manual Deployment

To manually trigger deployment:

1. Go to **Actions** tab
2. Select **Azure VM Deployment**
3. Click **Run workflow**
4. Choose:
   - **Runner type**: `self-hosted` (for Azure VM) or `ubuntu-latest` (for GitHub-hosted)
   - **Deploy target**: `all` or specific platform
5. Click **Run workflow**

### Testing with GitHub-Hosted Runners

All workflows default to GitHub-hosted runners (`ubuntu-latest`) for regular CI/CD.
You can manually switch to self-hosted for specific workflow runs.

## Troubleshooting

### Runner Not Starting

```bash
# Check runner status
cd ~/actions-runner
sudo ./svc.sh status

# View logs
sudo journalctl -u actions.runner.kushalkoppa-virtuverse.azure-vm-runner.service -f
```

### Runner Not Picking Up Jobs

1. Verify runner is online in GitHub Settings → Actions → Runners
2. Check runner labels match workflow requirements
3. Ensure VM has internet connectivity
4. Restart the runner service:

```bash
cd ~/actions-runner
sudo ./svc.sh restart
```

### Permission Issues

```bash
# Fix permissions for deployment directory
sudo chown -R $USER:$USER /opt/virtuverse
chmod -R 755 /opt/virtuverse

# Add user to docker group (if using Docker)
sudo usermod -aG docker $USER
newgrp docker
```

### Node.js or npm Issues

```bash
# Verify Node.js installation
node --version
npm --version

# Reinstall if needed
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Maintenance

### Update Runner

```bash
cd ~/actions-runner
sudo ./svc.sh stop
./config.sh remove
# Then follow Step 2 again with the latest runner version
```

### Monitor Disk Space

```bash
# Check disk usage
df -h

# Clean up old build artifacts
rm -rf /opt/virtuverse/deployments/old/*
```

### View Runner Logs

```bash
# View service logs
sudo journalctl -u actions.runner.kushalkoppa-virtuverse.azure-vm-runner.service -f

# View runner logs
cd ~/actions-runner
tail -f _diag/*.log
```

## Security Considerations

1. **Keep VM Updated**: Regularly update system packages
2. **Firewall Rules**: Configure Azure NSG to restrict access
3. **SSH Keys**: Use SSH keys instead of passwords
4. **Runner Token**: Keep the runner registration token secure
5. **Secrets**: Use GitHub Secrets for sensitive data, not environment variables

## Support

For issues or questions:
- Check GitHub Actions logs in the Actions tab
- Review runner logs on the Azure VM
- Consult GitHub's [self-hosted runner documentation](https://docs.github.com/en/actions/hosting-your-own-runners)

## Next Steps

After setting up the runner:
1. Test with a simple workflow run
2. Configure any application-specific deployment scripts
3. Set up monitoring and alerts
4. Document your deployment process
5. Configure reverse proxy (nginx/Apache) if serving web applications
