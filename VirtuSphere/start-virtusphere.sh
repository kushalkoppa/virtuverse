#!/bin/bash

# VirtuSphere Start Script
# This script starts all VirtuSphere backend services for local development

echo "Starting VirtuSphere services..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if a port is in use
check_port() {
    lsof -i :$1 > /dev/null 2>&1
    return $?
}

# Function to wait for service to be ready
wait_for_service() {
    local port=$1
    local service_name=$2
    local max_attempts=30
    local attempt=0
    
    echo -e "${YELLOW}Waiting for $service_name to start on port $port...${NC}"
    
    while [ $attempt -lt $max_attempts ]; do
        if check_port $port; then
            echo -e "${GREEN}✓ $service_name is ready${NC}"
            return 0
        fi
        sleep 1
        attempt=$((attempt + 1))
    done
    
    echo -e "${YELLOW}⚠ $service_name did not start within expected time${NC}"
    return 1
}

# Check if services are already running
if check_port 3020; then
    echo -e "${YELLOW}V-Analyzer backend already running on port 3020${NC}"
else
    echo "Starting V-Analyzer backend..."
    cd V-Analyzer/backend && node server.js > /tmp/v-analyzer.log 2>&1 &
    V_ANALYZER_PID=$!
    echo "V-Analyzer PID: $V_ANALYZER_PID"
    cd ../..
    wait_for_service 3020 "V-Analyzer"
fi

if check_port 3030; then
    echo -e "${YELLOW}V-DevContainers backend already running on port 3030${NC}"
else
    echo "Starting V-DevContainers backend..."
    cd V-DevContainers/backend && node src/server.js > /tmp/v-devcontainers.log 2>&1 &
    V_DEVCONTAINERS_PID=$!
    echo "V-DevContainers PID: $V_DEVCONTAINERS_PID"
    cd ../..
    wait_for_service 3030 "V-DevContainers"
fi

if check_port 3023; then
    echo -e "${YELLOW}VirtuSphere backend already running on port 3023${NC}"
else
    echo "Starting VirtuSphere backend..."
    cd backend && node server.js > /tmp/virtusphere.log 2>&1 &
    VIRTUSPHERE_PID=$!
    echo "VirtuSphere PID: $VIRTUSPHERE_PID"
    cd ..
    wait_for_service 3023 "VirtuSphere"
fi

echo ""
echo -e "${GREEN}=== VirtuSphere Services Started ===${NC}"
echo ""
echo "Services running:"
echo "  • V-Analyzer Backend:      http://localhost:3020"
echo "  • V-DevContainers Backend: http://localhost:3030"
echo "  • VirtuSphere Backend:     http://localhost:3023"
echo ""
echo "API Endpoints:"
echo "  • Health check:            curl http://localhost:3023/api/health"
echo "  • Platform info:           curl http://localhost:3023/api/info"
echo "  • Service stats:           curl http://localhost:3023/api/stats"
echo ""
echo "Logs:"
echo "  • V-Analyzer:      tail -f /tmp/v-analyzer.log"
echo "  • V-DevContainers: tail -f /tmp/v-devcontainers.log"
echo "  • VirtuSphere:     tail -f /tmp/virtusphere.log"
echo ""
echo "To stop services, run: ./stop-virtusphere.sh"
echo ""
