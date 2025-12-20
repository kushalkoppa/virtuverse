#!/bin/bash

# VirtuVerse Quick Start Script
# This script starts all services for the complete VirtuVerse system

set -e

echo "🌌 VirtuVerse Quick Start"
echo "=========================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v14 or higher."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Function to check if dependencies are installed
check_dependencies() {
    local dir=$1
    if [ ! -d "$dir/node_modules" ]; then
        echo "📦 Installing dependencies for $dir..."
        cd "$dir"
        npm install > /dev/null 2>&1
        cd - > /dev/null
        echo "✅ Dependencies installed for $dir"
    else
        echo "✅ Dependencies already installed for $dir"
    fi
}

# Install dependencies for all components
echo "📦 Checking dependencies..."
check_dependencies "VirtuVerse"
check_dependencies "VirtuSpace"
check_dependencies "EnviHub"
check_dependencies "PlantHub"
echo ""

# Setup environment files
echo "⚙️  Setting up environment files..."
for dir in VirtuVerse VirtuSpace EnviHub PlantHub; do
    if [ ! -f "$dir/.env" ]; then
        cp "$dir/.env.example" "$dir/.env"
        echo "✅ Created .env file for $dir"
    fi
done
echo ""

# Initialize admin user
if [ ! -f "VirtuVerse/backend/database/virtuverse.db" ]; then
    echo "👤 Initializing admin user..."
    cd VirtuVerse
    npm run init-admin
    cd ..
    echo ""
fi

# Start all services
echo "🚀 Starting all services..."
echo ""
echo "${YELLOW}Starting services in the background...${NC}"
echo "To stop all services, run: ./stop-all.sh"
echo ""

# Start VirtuVerse Backend
echo "Starting VirtuVerse Backend (Port 5001)..."
cd VirtuVerse
npm start > ../logs/virtuverse-backend.log 2>&1 &
VIRTUVERSE_PID=$!
cd ..
sleep 3

# Start VirtuSpace Backend
echo "Starting VirtuSpace Backend (Port 3003)..."
cd VirtuSpace
npm start > ../logs/virtuspace-backend.log 2>&1 &
VIRTUSPACE_PID=$!
cd ..
sleep 2

# Start EnviHub Backend
echo "Starting EnviHub Backend (Port 3001)..."
cd EnviHub
npm start > ../logs/envihub-backend.log 2>&1 &
ENVIHUB_PID=$!
cd ..
sleep 2

# Start PlantHub Backend
echo "Starting PlantHub Backend (Port 3002)..."
cd PlantHub
npm start > ../logs/planthub-backend.log 2>&1 &
PLANTHUB_PID=$!
cd ..
sleep 2

# Save PIDs
mkdir -p .pids
echo $VIRTUVERSE_PID > .pids/virtuverse.pid
echo $VIRTUSPACE_PID > .pids/virtuspace.pid
echo $ENVIHUB_PID > .pids/envihub.pid
echo $PLANTHUB_PID > .pids/planthub.pid

echo ""
echo "${GREEN}✅ All services started successfully!${NC}"
echo ""
echo "📋 Service Status:"
echo "  VirtuVerse API: http://localhost:5001/api/health"
echo "  VirtuSpace API: http://localhost:3003/api/health"
echo "  EnviHub API:    http://localhost:3001/api/health"
echo "  PlantHub API:   http://localhost:3002/api/health"
echo ""
echo "🌐 Frontend Access (you need to start these separately):"
echo "  VirtuVerse:  cd VirtuVerse/frontend && npm install && npm start"
echo "  VirtuSpace:  cd VirtuSpace/frontend && npm install && npm start"
echo "  EnviHub:     cd EnviHub/frontend && npm install && npm start"
echo "  PlantHub:    cd PlantHub/frontend && npm install && npm start"
echo ""
echo "📊 Default Admin Credentials:"
echo "  Email:    admin@virtuverse.com"
echo "  Password: Admin@123"
echo ""
echo "📝 Logs are available in the ./logs directory"
echo "🛑 To stop all services, run: ./stop-all.sh"
