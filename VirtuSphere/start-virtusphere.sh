#!/bin/bash

# VirtuSphere Start Script
# This script starts all VirtuSphere services (frontend and backends) for local development
#
# Prerequisites:
# - Node.js installed
# - Dependencies installed (npm run install:all)
# - Proper directory structure:
#   - frontend/ (main VirtuSphere frontend)
#   - V-Analyzer/backend/server.js
#   - V-Analyzer/frontend/ (V-Analyzer frontend)
#   - V-DevContainers/backend/src/server.js
#   - V-DevContainers/frontend/ (V-DevContainers frontend)
#   - backend/server.js

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

# Frontend services
if check_port 3025; then
    echo -e "${YELLOW}VirtuSphere frontend already running on port 3025${NC}"
else
    echo "Starting VirtuSphere frontend..."
    (cd frontend && npm run dev > /tmp/virtusphere-frontend.log 2>&1 &)
    VIRTUSPHERE_FRONTEND_PID=$!
    echo "VirtuSphere Frontend PID: $VIRTUSPHERE_FRONTEND_PID"
    wait_for_service 3025 "VirtuSphere Frontend"
fi

if check_port 3021; then
    echo -e "${YELLOW}V-Analyzer frontend already running on port 3021${NC}"
else
    echo "Starting V-Analyzer frontend..."
    (cd V-Analyzer/frontend && npm run dev > /tmp/v-analyzer-frontend.log 2>&1 &)
    V_ANALYZER_FRONTEND_PID=$!
    echo "V-Analyzer Frontend PID: $V_ANALYZER_FRONTEND_PID"
    wait_for_service 3021 "V-Analyzer Frontend"
fi

if check_port 3031; then
    echo -e "${YELLOW}V-DevContainers frontend already running on port 3031${NC}"
else
    echo "Starting V-DevContainers frontend..."
    (cd V-DevContainers/frontend && npm run dev > /tmp/v-devcontainers-frontend.log 2>&1 &)
    V_DEVCONTAINERS_FRONTEND_PID=$!
    echo "V-DevContainers Frontend PID: $V_DEVCONTAINERS_FRONTEND_PID"
    wait_for_service 3031 "V-DevContainers Frontend"
fi

# Backend services
if check_port 3020; then
    echo -e "${YELLOW}V-Analyzer backend already running on port 3020${NC}"
else
    echo "Starting V-Analyzer backend..."
    (cd V-Analyzer/backend && node server.js > /tmp/v-analyzer-backend.log 2>&1 &)
    V_ANALYZER_PID=$!
    echo "V-Analyzer Backend PID: $V_ANALYZER_PID"
    wait_for_service 3020 "V-Analyzer Backend"
fi

if check_port 3030; then
    echo -e "${YELLOW}V-DevContainers backend already running on port 3030${NC}"
else
    echo "Starting V-DevContainers backend..."
    (cd V-DevContainers/backend && node src/server.js > /tmp/v-devcontainers-backend.log 2>&1 &)
    V_DEVCONTAINERS_PID=$!
    echo "V-DevContainers Backend PID: $V_DEVCONTAINERS_PID"
    wait_for_service 3030 "V-DevContainers Backend"
fi

if check_port 3023; then
    echo -e "${YELLOW}VirtuSphere backend already running on port 3023${NC}"
else
    echo "Starting VirtuSphere backend..."
    (cd backend && node server.js > /tmp/virtusphere-backend.log 2>&1 &)
    VIRTUSPHERE_PID=$!
    echo "VirtuSphere Backend PID: $VIRTUSPHERE_PID"
    wait_for_service 3023 "VirtuSphere Backend"
fi

echo ""
echo -e "${GREEN}=== VirtuSphere Services Started ===${NC}"
echo ""
echo "Frontend Services:"
echo "  • VirtuSphere Main:        http://localhost:3025"
echo "  • V-Analyzer Frontend:     http://localhost:3021"
echo "  • V-DevContainers Frontend: http://localhost:3031"
echo "  • V-Assessor:              https://simulab.de.bosch.com:4200/costa (external)"
echo ""
echo "Backend Services:"
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
echo "  • VirtuSphere Frontend:    tail -f /tmp/virtusphere-frontend.log"
echo "  • V-Analyzer Frontend:     tail -f /tmp/v-analyzer-frontend.log"
echo "  • V-DevContainers Frontend: tail -f /tmp/v-devcontainers-frontend.log"
echo "  • V-Analyzer Backend:      tail -f /tmp/v-analyzer-backend.log"
echo "  • V-DevContainers Backend: tail -f /tmp/v-devcontainers-backend.log"
echo "  • VirtuSphere Backend:     tail -f /tmp/virtusphere-backend.log"
echo ""
echo "To stop services, run: ./stop-virtusphere.sh"
echo ""
