#!/bin/bash

# Azure Deployment Script for VirtuVerse Platform
# This script deploys VirtuVerse Studio, VirtuSpace, and VirtuSphere to Azure

set -e

# Configuration
RESOURCE_GROUP="${RESOURCE_GROUP:-virtuverse-rg}"
LOCATION="${LOCATION:-eastus}"
VIRTUVERSE_STUDIO_APP="${VIRTUVERSE_STUDIO_APP:-virtuverse-studio}"
VIRTUSPACE_APP="${VIRTUSPACE_APP:-virtuspace}"
VIRTUSPHERE_ANALYZER_APP="${VIRTUSPHERE_ANALYZER_APP:-virtusphere-analyzer}"
VIRTUSPHERE_DEVCONTAINERS_APP="${VIRTUSPHERE_DEVCONTAINERS_APP:-virtusphere-devcontainers}"

echo "=========================================="
echo "VirtuVerse Platform Azure Deployment"
echo "=========================================="
echo "Resource Group: $RESOURCE_GROUP"
echo "Location: $LOCATION"
echo ""

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo "❌ Azure CLI is not installed. Please install it first."
    echo "Visit: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
    exit 1
fi

# Check if logged in to Azure
echo "🔍 Checking Azure login status..."
if ! az account show &> /dev/null; then
    echo "❌ Not logged in to Azure. Please run 'az login' first."
    exit 1
fi

SUBSCRIPTION_NAME=$(az account show --query name -o tsv)
echo "✅ Logged in to Azure"
echo "   Subscription: $SUBSCRIPTION_NAME"
echo ""

# Create Resource Group if it doesn't exist
echo "📦 Creating resource group..."
az group create \
  --name "$RESOURCE_GROUP" \
  --location "$LOCATION" \
  --output none

echo "✅ Resource group created/verified: $RESOURCE_GROUP"
echo ""

# Deploy VirtuVerse Studio
echo "🚀 Deploying VirtuVerse Studio..."
cd VirtuVerse-Studio
az deployment group create \
  --resource-group "$RESOURCE_GROUP" \
  --template-file azure-deploy.json \
  --parameters webAppName="$VIRTUVERSE_STUDIO_APP" \
  --output none

VIRTUVERSE_STUDIO_URL=$(az webapp show \
  --resource-group "$RESOURCE_GROUP" \
  --name "$VIRTUVERSE_STUDIO_APP" \
  --query defaultHostName -o tsv)

echo "✅ VirtuVerse Studio deployed"
echo "   URL: https://$VIRTUVERSE_STUDIO_URL"
echo ""

# Deploy VirtuSpace
echo "🚀 Deploying VirtuSpace..."
cd ../VirtuSpace
az deployment group create \
  --resource-group "$RESOURCE_GROUP" \
  --template-file azure-deploy.json \
  --parameters webAppName="$VIRTUSPACE_APP" \
  --output none

VIRTUSPACE_URL=$(az webapp show \
  --resource-group "$RESOURCE_GROUP" \
  --name "$VIRTUSPACE_APP" \
  --query defaultHostName -o tsv)

echo "✅ VirtuSpace deployed"
echo "   URL: https://$VIRTUSPACE_URL"
echo ""

# Deploy VirtuSphere
echo "🚀 Deploying VirtuSphere..."
cd ../VirtuSphere
az deployment group create \
  --resource-group "$RESOURCE_GROUP" \
  --template-file azure-deploy.json \
  --parameters analyzerAppName="$VIRTUSPHERE_ANALYZER_APP" \
               devcontainersAppName="$VIRTUSPHERE_DEVCONTAINERS_APP" \
  --output none

VIRTUSPHERE_ANALYZER_URL=$(az webapp show \
  --resource-group "$RESOURCE_GROUP" \
  --name "$VIRTUSPHERE_ANALYZER_APP" \
  --query defaultHostName -o tsv)

VIRTUSPHERE_DEVCONTAINERS_URL=$(az webapp show \
  --resource-group "$RESOURCE_GROUP" \
  --name "$VIRTUSPHERE_DEVCONTAINERS_APP" \
  --query defaultHostName -o tsv)

echo "✅ VirtuSphere deployed"
echo "   V-Analyzer URL: https://$VIRTUSPHERE_ANALYZER_URL"
echo "   V-DevContainers URL: https://$VIRTUSPHERE_DEVCONTAINERS_URL"
echo ""

# Configure App Settings with URLs
echo "⚙️  Configuring application settings..."

# Configure VirtuVerse Studio
az webapp config appsettings set \
  --resource-group "$RESOURCE_GROUP" \
  --name "$VIRTUVERSE_STUDIO_APP" \
  --settings \
    "VIRTUSPACE_URL=https://$VIRTUSPACE_URL" \
    "VIRTUSPHERE_ANALYZER_URL=https://$VIRTUSPHERE_ANALYZER_URL" \
    "VIRTUSPHERE_DEVCONTAINERS_URL=https://$VIRTUSPHERE_DEVCONTAINERS_URL" \
    "FRONTEND_URL=https://$VIRTUVERSE_STUDIO_URL" \
  --output none

# Configure VirtuSpace
az webapp config appsettings set \
  --resource-group "$RESOURCE_GROUP" \
  --name "$VIRTUSPACE_APP" \
  --settings \
    "VIRTUVERSE_STUDIO_URL=https://$VIRTUVERSE_STUDIO_URL" \
  --output none

echo "✅ Application settings configured"
echo ""

# Deploy source code to all apps
echo "📤 Deploying source code..."

# VirtuVerse Studio
cd ../VirtuVerse-Studio
echo "   Deploying VirtuVerse Studio source..."
zip -r virtuverse-studio.zip . -x "*.git*" "node_modules/*" "frontend/node_modules/*" > /dev/null
az webapp deployment source config-zip \
  --resource-group "$RESOURCE_GROUP" \
  --name "$VIRTUVERSE_STUDIO_APP" \
  --src virtuverse-studio.zip \
  --output none
rm virtuverse-studio.zip

# VirtuSpace
cd ../VirtuSpace
echo "   Deploying VirtuSpace source..."
zip -r virtuspace.zip . -x "*.git*" "node_modules/*" "*/node_modules/*" > /dev/null
az webapp deployment source config-zip \
  --resource-group "$RESOURCE_GROUP" \
  --name "$VIRTUSPACE_APP" \
  --src virtuspace.zip \
  --output none
rm virtuspace.zip

# VirtuSphere V-Analyzer
cd ../VirtuSphere/V-Analyzer
echo "   Deploying VirtuSphere V-Analyzer source..."
zip -r v-analyzer.zip . -x "*.git*" "node_modules/*" "*/node_modules/*" > /dev/null
az webapp deployment source config-zip \
  --resource-group "$RESOURCE_GROUP" \
  --name "$VIRTUSPHERE_ANALYZER_APP" \
  --src v-analyzer.zip \
  --output none
rm v-analyzer.zip

# VirtuSphere V-DevContainers
cd ../V-DevContainers
echo "   Deploying VirtuSphere V-DevContainers source..."
zip -r v-devcontainers.zip . -x "*.git*" "node_modules/*" "*/node_modules/*" > /dev/null
az webapp deployment source config-zip \
  --resource-group "$RESOURCE_GROUP" \
  --name "$VIRTUSPHERE_DEVCONTAINERS_APP" \
  --src v-devcontainers.zip \
  --output none
rm v-devcontainers.zip

cd ../..

echo "✅ Source code deployed to all applications"
echo ""

# Print deployment summary
echo "=========================================="
echo "🎉 Deployment Complete!"
echo "=========================================="
echo ""
echo "📋 Deployment Summary:"
echo "   Resource Group: $RESOURCE_GROUP"
echo "   Location: $LOCATION"
echo ""
echo "🌐 Application URLs:"
echo "   VirtuVerse Studio: https://$VIRTUVERSE_STUDIO_URL"
echo "   VirtuSpace: https://$VIRTUSPACE_URL"
echo "   VirtuSphere V-Analyzer: https://$VIRTUSPHERE_ANALYZER_URL"
echo "   VirtuSphere V-DevContainers: https://$VIRTUSPHERE_DEVCONTAINERS_URL"
echo ""
echo "⏱️  Note: Applications may take 5-10 minutes to fully start."
echo ""
echo "🔍 To validate deployment, run:"
echo "   ./validate-deployment.sh"
echo ""
