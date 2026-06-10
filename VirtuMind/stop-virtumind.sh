#!/bin/bash

# VirtuMind Stop Script
# This script stops all VirtuMind services

echo "Stopping VirtuMind services..."

# Function to stop service on a port
stop_service() {
    local port=$1
    local service_name=$2
    
    pid=$(lsof -ti :$port)
    if [ ! -z "$pid" ]; then
        echo "Stopping $service_name (PID: $pid) on port $port..."
        kill $pid
        echo "✓ $service_name stopped"
    else
        echo "No process found on port $port"
    fi
}

# Stop VirtuMind frontend
stop_service 3035 "VirtuMind Frontend"

echo ""
echo "All VirtuMind services stopped"
echo ""
