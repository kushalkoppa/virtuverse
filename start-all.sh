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
check_dependencies "VirtuVerse-Studio"
check_dependencies "VirtuSpace"
check_dependencies "VirtuSpace/V-Orchestrator"
check_dependencies "VirtuSpace/EnviHub"
check_dependencies "VirtuSpace/PlantHub"
check_dependencies "VirtuSphere/V-Analyzer"
echo ""

# Setup environment files
echo "⚙️  Setting up environment files..."
for dir in VirtuVerse-Studio VirtuSpace VirtuSpace/V-Orchestrator VirtuSpace/EnviHub VirtuSpace/PlantHub VirtuSphere/V-Analyzer; do
    if [ ! -f "$dir/.env" ]; then
        cp "$dir/.env.example" "$dir/.env"
        echo "✅ Created .env file for $dir"
    fi
done
echo ""

# Initialize admin user
if [ ! -f "VirtuVerse-Studio/backend/database/virtuverse.db" ]; then
    echo "👤 Initializing admin user..."
    cd VirtuVerse-Studio
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

# Start VirtuVerse Studio Backend
echo "Starting VirtuVerse Studio Backend (Port 5001)..."
cd VirtuVerse-Studio
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

# Start V-Orchestrator Backend
echo "Starting V-Orchestrator Backend (Port 3010)..."
cd VirtuSpace/V-Orchestrator
npm start > ../../logs/v-orchestrator-backend.log 2>&1 &
V_ORCHESTRATOR_PID=$!
cd ../..
sleep 2

# Start EnviHub Backend
echo "Starting EnviHub Backend (Port 3001)..."
cd VirtuSpace/EnviHub
npm start > ../../logs/envihub-backend.log 2>&1 &
ENVIHUB_PID=$!
cd ../..
sleep 2

# Start PlantHub Backend
echo "Starting PlantHub Backend (Port 3002)..."
cd VirtuSpace/PlantHub
npm start > ../../logs/planthub-backend.log 2>&1 &
PLANTHUB_PID=$!
cd ../..
sleep 2

# Start V-Analyzer Backend
echo "Starting V-Analyzer Backend (Port 3020)..."
cd VirtuSphere/V-Analyzer
npm start > ../../logs/v-analyzer-backend.log 2>&1 &
V_ANALYZER_PID=$!
cd ../..
sleep 2

# Save PIDs
mkdir -p .pids
echo $VIRTUVERSE_PID > .pids/virtuverse.pid
echo $VIRTUSPACE_PID > .pids/virtuspace.pid
echo $V_ORCHESTRATOR_PID > .pids/v-orchestrator.pid
echo $ENVIHUB_PID > .pids/envihub.pid
echo $PLANTHUB_PID > .pids/planthub.pid
echo $V_ANALYZER_PID > .pids/v-analyzer.pid

echo ""
echo "${GREEN}✅ All services started successfully!${NC}"
echo ""
echo "📋 Service Status:"
echo "  VirtuVerse Studio API:  http://localhost:5001/api/health"
echo "  VirtuSpace API:         http://localhost:3003/api/health"
echo "  V-Orchestrator API:     http://localhost:3010/api/health"
echo "  EnviHub API:            http://localhost:3001/api/health"
echo "  PlantHub API:           http://localhost:3002/api/health"
echo "  V-Analyzer API:         http://localhost:3020/api/health"
echo ""
echo "🌐 Frontend Access (you need to start these separately):"
echo "  VirtuVerse Studio:  cd VirtuVerse-Studio/frontend && npm install && npm start"
echo "  VirtuSpace:         cd VirtuSpace/frontend && npm install && npm start"
echo "  V-Orchestrator:     cd VirtuSpace/V-Orchestrator/frontend && npm install && npm start"
echo "  EnviHub:            cd VirtuSpace/EnviHub/frontend && npm install && npm start"
echo "  PlantHub:           cd VirtuSpace/PlantHub/frontend && npm install && npm start"
echo "  V-Analyzer:         cd VirtuSphere/V-Analyzer/frontend && npm install && npm start"
echo ""
echo "📊 Default Admin Credentials:"
echo "  Email:    admin@virtuverse.com"
echo "  Password: Admin@123"
echo ""
echo "📝 Logs are available in the ./logs directory"
echo "🛑 To stop all services, run: ./stop-all.sh"
