# Azure Deployment Guide for VirtuVerse Platform

This guide provides comprehensive instructions for deploying VirtuVerse Studio, VirtuSpace, and VirtuSphere to Microsoft Azure.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Architecture Overview](#architecture-overview)
3. [Quick Start](#quick-start)
4. [Manual Deployment](#manual-deployment)
5. [Configuration](#configuration)
6. [Validation](#validation)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Tools

1. **Azure CLI** (version 2.40.0 or later)
   ```bash
   # Install Azure CLI
   curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
   
   # Or for Windows
   # https://aka.ms/installazurecliwindows
   
   # Verify installation
   az --version
   ```

2. **Azure Subscription**
   - Active Azure subscription with contributor access
   - Sufficient quota for B1 App Service Plans (or higher)

3. **Git** (for source code management)
   ```bash
   git --version
   ```

### Azure Login

```bash
# Login to Azure
az login

# Set your subscription (if you have multiple)
az account set --subscription "YOUR_SUBSCRIPTION_ID"

# Verify you're logged in
az account show
```

## Architecture Overview

The VirtuVerse platform consists of three main components deployed to Azure App Service:

```
┌─────────────────────────────────────────────────────┐
│                 Azure Resource Group                │
│                   (virtuverse-rg)                   │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌───────────────────────────────────────────┐    │
│  │       VirtuVerse Studio                   │    │
│  │  - Authentication & User Management       │    │
│  │  - Workspace & Project Management         │    │
│  │  - Integration Hub                        │    │
│  │  Port: 5001                               │    │
│  └───────────────────────────────────────────┘    │
│                      ↓                             │
│  ┌───────────────────────────────────────────┐    │
│  │       VirtuSpace                          │    │
│  │  - Model Management                       │    │
│  │  - Tool Integration                       │    │
│  │  - Orchestration Layer                    │    │
│  │  Port: 3003                               │    │
│  └───────────────────────────────────────────┘    │
│                      ↓                             │
│  ┌───────────────────────────────────────────┐    │
│  │       VirtuSphere                         │    │
│  │  - V-Analyzer (Metrics & Analytics)       │    │
│  │  - V-DevContainers (Dev Environment)      │    │
│  │  Ports: 3020, 3030                        │    │
│  └───────────────────────────────────────────┘    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Quick Start

### Automated Deployment

Use the provided deployment script for a one-command deployment:

```bash
# Navigate to repository root
cd /path/to/virtuverse

# Run deployment script
./deploy-azure.sh
```

The script will:
1. Create an Azure Resource Group
2. Deploy all three components (VirtuVerse Studio, VirtuSpace, VirtuSphere)
3. Configure application settings
4. Deploy source code
5. Provide deployment URLs

### Environment Variables (Optional)

Customize deployment by setting environment variables:

```bash
export RESOURCE_GROUP="my-virtuverse-rg"
export LOCATION="westus2"
export VIRTUVERSE_STUDIO_APP="my-studio"
export VIRTUSPACE_APP="my-virtuspace"
export VIRTUSPHERE_ANALYZER_APP="my-analyzer"
export VIRTUSPHERE_DEVCONTAINERS_APP="my-devcontainers"

./deploy-azure.sh
```

## Manual Deployment

### Step 1: Create Resource Group

```bash
RESOURCE_GROUP="virtuverse-rg"
LOCATION="eastus"

az group create \
  --name $RESOURCE_GROUP \
  --location $LOCATION
```

### Step 2: Deploy VirtuVerse Studio

```bash
cd VirtuVerse-Studio

# Deploy using ARM template
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file azure-deploy.json \
  --parameters webAppName="virtuverse-studio"

# Get the app URL
STUDIO_URL=$(az webapp show \
  --resource-group $RESOURCE_GROUP \
  --name virtuverse-studio \
  --query defaultHostName -o tsv)

echo "VirtuVerse Studio: https://$STUDIO_URL"
```

### Step 3: Deploy VirtuSpace

```bash
cd ../VirtuSpace

az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file azure-deploy.json \
  --parameters webAppName="virtuspace"

VIRTUSPACE_URL=$(az webapp show \
  --resource-group $RESOURCE_GROUP \
  --name virtuspace \
  --query defaultHostName -o tsv)

echo "VirtuSpace: https://$VIRTUSPACE_URL"
```

### Step 4: Deploy VirtuSphere

```bash
cd ../VirtuSphere

az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file azure-deploy.json \
  --parameters \
    analyzerAppName="virtusphere-analyzer" \
    devcontainersAppName="virtusphere-devcontainers"

ANALYZER_URL=$(az webapp show \
  --resource-group $RESOURCE_GROUP \
  --name virtusphere-analyzer \
  --query defaultHostName -o tsv)

DEVCONTAINERS_URL=$(az webapp show \
  --resource-group $RESOURCE_GROUP \
  --name virtusphere-devcontainers \
  --query defaultHostName -o tsv)

echo "V-Analyzer: https://$ANALYZER_URL"
echo "V-DevContainers: https://$DEVCONTAINERS_URL"
```

### Step 5: Configure Application Settings

```bash
# Configure VirtuVerse Studio with integration URLs
az webapp config appsettings set \
  --resource-group $RESOURCE_GROUP \
  --name virtuverse-studio \
  --settings \
    "VIRTUSPACE_URL=https://$VIRTUSPACE_URL" \
    "VIRTUSPHERE_ANALYZER_URL=https://$ANALYZER_URL" \
    "VIRTUSPHERE_DEVCONTAINERS_URL=https://$DEVCONTAINERS_URL" \
    "JWT_SECRET=$(openssl rand -base64 32)"
```

### Step 6: Deploy Source Code

```bash
# VirtuVerse Studio
cd ../VirtuVerse-Studio
zip -r deploy.zip . -x "*.git*" "node_modules/*" "frontend/node_modules/*"
az webapp deployment source config-zip \
  --resource-group $RESOURCE_GROUP \
  --name virtuverse-studio \
  --src deploy.zip
rm deploy.zip

# VirtuSpace
cd ../VirtuSpace
zip -r deploy.zip . -x "*.git*" "node_modules/*" "*/node_modules/*"
az webapp deployment source config-zip \
  --resource-group $RESOURCE_GROUP \
  --name virtuspace \
  --src deploy.zip
rm deploy.zip

# VirtuSphere V-Analyzer
cd ../VirtuSphere/V-Analyzer
zip -r deploy.zip . -x "*.git*" "node_modules/*" "*/node_modules/*"
az webapp deployment source config-zip \
  --resource-group $RESOURCE_GROUP \
  --name virtusphere-analyzer \
  --src deploy.zip
rm deploy.zip

# VirtuSphere V-DevContainers
cd ../V-DevContainers
zip -r deploy.zip . -x "*.git*" "node_modules/*" "*/node_modules/*"
az webapp deployment source config-zip \
  --resource-group $RESOURCE_GROUP \
  --name virtusphere-devcontainers \
  --src deploy.zip
rm deploy.zip
```

## Configuration

### Environment Variables

Each component supports the following environment variables:

#### VirtuVerse Studio
```bash
NODE_ENV=production
PORT=5001
JWT_SECRET=your-secret-key
VIRTUSPACE_URL=https://virtuspace.azurewebsites.net
VIRTUSPHERE_ANALYZER_URL=https://virtusphere-analyzer.azurewebsites.net
VIRTUSPHERE_DEVCONTAINERS_URL=https://virtusphere-devcontainers.azurewebsites.net
FRONTEND_URL=https://virtuverse-studio.azurewebsites.net
```

#### VirtuSpace
```bash
NODE_ENV=production
PORT=3003
VIRTUVERSE_STUDIO_URL=https://virtuverse-studio.azurewebsites.net
```

#### VirtuSphere Components
```bash
NODE_ENV=production
PORT=3020  # V-Analyzer
PORT=3030  # V-DevContainers
```

### Scaling Configuration

Adjust the SKU in ARM templates for different performance needs:

- **F1**: Free tier (limited resources)
- **B1**: Basic tier (recommended for development)
- **S1**: Standard tier (recommended for production)
- **P1V2**: Premium tier (high performance)

```bash
# Update SKU in azure-deploy.json
"sku": {
  "name": "S1"  # Change from B1 to S1
}
```

## Validation

### Automated Validation

Use the validation script to check deployment status:

```bash
./validate-deployment.sh
```

The script checks:
- Application availability
- Health endpoints
- Integration connectivity
- Azure App Service status

### Manual Validation

#### Check VirtuVerse Studio

```bash
# Health check
curl https://virtuverse-studio.azurewebsites.net/api/health

# Expected response:
# {
#   "status": "healthy",
#   "service": "VirtuVerse API",
#   "timestamp": "2024-01-30T12:00:00.000Z"
# }
```

#### Check VirtuSpace

```bash
curl https://virtuspace.azurewebsites.net/api/health

# Expected response:
# {
#   "status": "ok",
#   "message": "VirtuSpace API is running"
# }
```

#### Check VirtuSphere

```bash
# V-Analyzer
curl https://virtusphere-analyzer.azurewebsites.net/api/health

# V-DevContainers
curl https://virtusphere-devcontainers.azurewebsites.net/api/health
```

#### Check Integration Status

```bash
# This endpoint requires authentication
curl https://virtuverse-studio.azurewebsites.net/api/integrations/status \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Troubleshooting

### Common Issues

#### 1. Deployment Timeout

**Problem**: Deployment takes too long or times out.

**Solution**:
```bash
# Check deployment logs
az webapp log tail \
  --resource-group virtuverse-rg \
  --name virtuverse-studio

# Or download logs
az webapp log download \
  --resource-group virtuverse-rg \
  --name virtuverse-studio
```

#### 2. Application Not Starting

**Problem**: App shows as Running but returns 503 errors.

**Solution**:
```bash
# Check application logs
az webapp log tail \
  --resource-group virtuverse-rg \
  --name virtuverse-studio

# Restart the app
az webapp restart \
  --resource-group virtuverse-rg \
  --name virtuverse-studio
```

#### 3. Database Initialization Issues

**Problem**: VirtuVerse Studio cannot create database.

**Solution**:
```bash
# Enable detailed logging
az webapp config appsettings set \
  --resource-group virtuverse-rg \
  --name virtuverse-studio \
  --settings "WEBSITE_NODE_DEFAULT_VERSION=18-lts" \
               "WEBSITE_RUN_FROM_PACKAGE=0"

# SSH into the app
az webapp ssh \
  --resource-group virtuverse-rg \
  --name virtuverse-studio

# Check if database directory exists
ls -la /home/site/wwwroot/backend/database/
```

#### 4. Integration Connectivity Issues

**Problem**: Services cannot communicate with each other.

**Solution**:
```bash
# Verify application settings
az webapp config appsettings list \
  --resource-group virtuverse-rg \
  --name virtuverse-studio

# Test connectivity from app
az webapp ssh \
  --resource-group virtuverse-rg \
  --name virtuverse-studio

# Inside SSH session
curl https://virtuspace.azurewebsites.net/api/health
```

### Getting More Help

#### View Application Insights

```bash
# Enable Application Insights
az monitor app-insights component create \
  --app virtuverse-insights \
  --location eastus \
  --resource-group virtuverse-rg

# Link to Web App
INSTRUMENTATION_KEY=$(az monitor app-insights component show \
  --app virtuverse-insights \
  --resource-group virtuverse-rg \
  --query instrumentationKey -o tsv)

az webapp config appsettings set \
  --resource-group virtuverse-rg \
  --name virtuverse-studio \
  --settings "APPINSIGHTS_INSTRUMENTATIONKEY=$INSTRUMENTATION_KEY"
```

#### Check Resource Usage

```bash
# Check CPU and memory
az monitor metrics list \
  --resource $(az webapp show \
    --resource-group virtuverse-rg \
    --name virtuverse-studio \
    --query id -o tsv) \
  --metric "CpuPercentage" "MemoryPercentage" \
  --interval PT1M
```

## Cleanup

To remove all deployed resources:

```bash
# Delete the entire resource group
az group delete \
  --name virtuverse-rg \
  --yes \
  --no-wait
```

## Next Steps

After successful deployment:

1. **Initialize Admin User**: Access VirtuVerse Studio and create an admin account
2. **Configure Authentication**: Set up JWT secrets and authentication settings
3. **Test Integrations**: Verify connectivity between all components
4. **Setup Monitoring**: Configure Application Insights for production monitoring
5. **Configure Custom Domain**: Add custom domain and SSL certificate
6. **Setup CI/CD**: Configure GitHub Actions for automated deployments

## Support

For issues or questions:
- Check Azure App Service documentation: https://docs.microsoft.com/en-us/azure/app-service/
- Review application logs using `az webapp log tail`
- Check GitHub repository issues
