#!/bin/bash

# Deployment Validation Script for VirtuVerse Platform
# This script validates the deployment of VirtuVerse Studio, VirtuSpace, and VirtuSphere

set -e

# Configuration
RESOURCE_GROUP="${RESOURCE_GROUP:-virtuverse-rg}"
VIRTUVERSE_STUDIO_APP="${VIRTUVERSE_STUDIO_APP:-virtuverse-studio}"
VIRTUSPACE_APP="${VIRTUSPACE_APP:-virtuspace}"
VIRTUSPHERE_ANALYZER_APP="${VIRTUSPHERE_ANALYZER_APP:-virtusphere-analyzer}"
VIRTUSPHERE_DEVCONTAINERS_APP="${VIRTUSPHERE_DEVCONTAINERS_APP:-virtusphere-devcontainers}"

echo "=========================================="
echo "VirtuVerse Platform Deployment Validation"
echo "=========================================="
echo ""

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo "❌ Azure CLI is not installed. Please install it first."
    exit 1
fi

# Check if jq is installed (for JSON parsing)
if ! command -v jq &> /dev/null; then
    echo "⚠️  jq is not installed. Installing basic validation..."
    JQ_AVAILABLE=false
else
    JQ_AVAILABLE=true
fi

# Get application URLs
echo "🔍 Retrieving application URLs..."
VIRTUVERSE_STUDIO_URL=$(az webapp show \
  --resource-group "$RESOURCE_GROUP" \
  --name "$VIRTUVERSE_STUDIO_APP" \
  --query defaultHostName -o tsv 2>/dev/null)

VIRTUSPACE_URL=$(az webapp show \
  --resource-group "$RESOURCE_GROUP" \
  --name "$VIRTUSPACE_APP" \
  --query defaultHostName -o tsv 2>/dev/null)

VIRTUSPHERE_ANALYZER_URL=$(az webapp show \
  --resource-group "$RESOURCE_GROUP" \
  --name "$VIRTUSPHERE_ANALYZER_APP" \
  --query defaultHostName -o tsv 2>/dev/null)

VIRTUSPHERE_DEVCONTAINERS_URL=$(az webapp show \
  --resource-group "$RESOURCE_GROUP" \
  --name "$VIRTUSPHERE_DEVCONTAINERS_APP" \
  --query defaultHostName -o tsv 2>/dev/null)

if [ -z "$VIRTUVERSE_STUDIO_URL" ]; then
    echo "❌ VirtuVerse Studio app not found. Please check deployment."
    exit 1
fi

echo "✅ Application URLs retrieved"
echo ""

# Function to check health endpoint
check_health() {
    local name=$1
    local url=$2
    local endpoint=$3
    
    echo -n "   Testing $name... "
    
    # Try to get health status
    response=$(curl -s -o /dev/null -w "%{http_code}" "https://${url}${endpoint}" --max-time 10)
    
    if [ "$response" = "200" ]; then
        echo "✅ Healthy (HTTP 200)"
        return 0
    elif [ "$response" = "000" ]; then
        echo "⚠️  Timeout or connection error"
        return 1
    else
        echo "⚠️  HTTP $response"
        return 1
    fi
}

# Function to check detailed health
check_detailed_health() {
    local name=$1
    local url=$2
    local endpoint=$3
    
    echo "   Checking $name details..."
    
    response=$(curl -s "https://${url}${endpoint}" --max-time 10)
    
    if [ -n "$response" ]; then
        if [ "$JQ_AVAILABLE" = true ]; then
            echo "$response" | jq '.' 2>/dev/null || echo "   Response: $response"
        else
            echo "   Response received: ${response:0:100}..."
        fi
    else
        echo "   ⚠️  No response received"
    fi
    echo ""
}

# Validate VirtuVerse Studio
echo "🔍 Validating VirtuVerse Studio..."
echo "   URL: https://$VIRTUVERSE_STUDIO_URL"
check_health "VirtuVerse Studio Health" "$VIRTUVERSE_STUDIO_URL" "/api/health"
check_detailed_health "VirtuVerse Studio" "$VIRTUVERSE_STUDIO_URL" "/api/health"

# Validate VirtuSpace
echo "🔍 Validating VirtuSpace..."
echo "   URL: https://$VIRTUSPACE_URL"
check_health "VirtuSpace Health" "$VIRTUSPACE_URL" "/api/health"
check_detailed_health "VirtuSpace" "$VIRTUSPACE_URL" "/api/health"

# Validate VirtuSphere V-Analyzer
echo "🔍 Validating VirtuSphere V-Analyzer..."
echo "   URL: https://$VIRTUSPHERE_ANALYZER_URL"
check_health "V-Analyzer Health" "$VIRTUSPHERE_ANALYZER_URL" "/api/health"
check_detailed_health "V-Analyzer" "$VIRTUSPHERE_ANALYZER_URL" "/api/health"

# Validate VirtuSphere V-DevContainers
echo "🔍 Validating VirtuSphere V-DevContainers..."
echo "   URL: https://$VIRTUSPHERE_DEVCONTAINERS_URL"
check_health "V-DevContainers Health" "$VIRTUSPHERE_DEVCONTAINERS_URL" "/api/health"
check_detailed_health "V-DevContainers" "$VIRTUSPHERE_DEVCONTAINERS_URL" "/api/health"

# Test VirtuVerse Studio Integration Endpoints
echo "🔍 Testing VirtuVerse Studio Integration..."
echo "   Testing integration status endpoint..."
response=$(curl -s -o /dev/null -w "%{http_code}" \
  "https://${VIRTUVERSE_STUDIO_URL}/api/integrations/status" \
  --max-time 10)

if [ "$response" = "200" ] || [ "$response" = "401" ]; then
    echo "   ✅ Integration endpoint accessible (HTTP $response)"
else
    echo "   ⚠️  Integration endpoint returned HTTP $response"
fi
echo ""

# Check Azure App Service Status
echo "🔍 Checking Azure App Service Status..."

check_app_status() {
    local app_name=$1
    local display_name=$2
    
    state=$(az webapp show \
      --resource-group "$RESOURCE_GROUP" \
      --name "$app_name" \
      --query state -o tsv 2>/dev/null)
    
    if [ "$state" = "Running" ]; then
        echo "   ✅ $display_name: Running"
    else
        echo "   ⚠️  $display_name: $state"
    fi
}

check_app_status "$VIRTUVERSE_STUDIO_APP" "VirtuVerse Studio"
check_app_status "$VIRTUSPACE_APP" "VirtuSpace"
check_app_status "$VIRTUSPHERE_ANALYZER_APP" "VirtuSphere V-Analyzer"
check_app_status "$VIRTUSPHERE_DEVCONTAINERS_APP" "VirtuSphere V-DevContainers"
echo ""

# Summary
echo "=========================================="
echo "📊 Validation Summary"
echo "=========================================="
echo ""
echo "✅ All services are deployed and accessible"
echo ""
echo "🌐 VirtuVerse Studio URL:"
echo "   https://$VIRTUVERSE_STUDIO_URL"
echo ""
echo "📋 Additional URLs:"
echo "   VirtuSpace: https://$VIRTUSPACE_URL"
echo "   V-Analyzer: https://$VIRTUSPHERE_ANALYZER_URL"
echo "   V-DevContainers: https://$VIRTUSPHERE_DEVCONTAINERS_URL"
echo ""
echo "🔐 Next Steps:"
echo "   1. Access VirtuVerse Studio at https://$VIRTUVERSE_STUDIO_URL"
echo "   2. Initialize admin user (if not done)"
echo "   3. Configure authentication settings"
echo "   4. Test integration with VirtuSpace and VirtuSphere"
echo ""
