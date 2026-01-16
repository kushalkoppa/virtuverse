#!/bin/bash

# VirtuSphere Stop Script
# This script stops all VirtuSphere backend services

echo "Stopping VirtuSphere services..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Function to stop process on a port
stop_port() {
    local port=$1
    local service_name=$2
    
    local pid=$(lsof -t -i:$port 2>/dev/null)
    
    if [ -n "$pid" ]; then
        echo "Stopping $service_name (PID: $pid) on port $port..."
        kill $pid
        sleep 1
        
        # Check if process is still running
        if ps -p $pid > /dev/null 2>&1; then
            echo -e "${RED}Process still running, forcing kill...${NC}"
            kill -9 $pid
        fi
        echo -e "${GREEN}✓ $service_name stopped${NC}"
    else
        echo "$service_name not running on port $port"
    fi
}

# Stop all services
stop_port 3020 "V-Analyzer backend"
stop_port 3030 "V-DevContainers backend"
stop_port 3023 "VirtuSphere backend"

# Clean up log files
echo ""
echo "Cleaning up log files..."
rm -f /tmp/v-analyzer.log /tmp/v-devcontainers.log /tmp/virtusphere.log

echo ""
echo -e "${GREEN}All VirtuSphere services stopped${NC}"
echo ""
