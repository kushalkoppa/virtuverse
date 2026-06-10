#!/bin/bash

# VirtuMind Start Script
# This script starts the VirtuMind frontend for local development

echo "Starting VirtuMind services..."

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

# Check if frontend is already running
if check_port 3035; then
    echo -e "${YELLOW}VirtuMind frontend already running on port 3035${NC}"
else
    echo "Starting VirtuMind frontend..."
    (cd frontend && npm run dev > /tmp/virtumind-frontend.log 2>&1 &)
    VIRTUMIND_FRONTEND_PID=$!
    echo "VirtuMind Frontend PID: $VIRTUMIND_FRONTEND_PID"
    wait_for_service 3035 "VirtuMind Frontend"
fi

echo ""
echo -e "${GREEN}=== VirtuMind Services Started ===${NC}"
echo ""
echo "Frontend Services:"
echo "  • VirtuMind Main:          http://localhost:3035"
echo ""
echo "Status: Under Development"
echo ""
echo "Logs:"
echo "  • VirtuMind Frontend:      tail -f /tmp/virtumind-frontend.log"
echo ""
echo "To stop services, run: ./stop-virtumind.sh"
echo ""
