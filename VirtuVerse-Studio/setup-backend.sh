#!/bin/bash

# VirtuVerse-Studio Backend Setup Script
# This script sets up the backend environment and initializes the database

set -e

echo "🔧 VirtuVerse-Studio Backend Setup"
echo "===================================="
echo ""

# Create database directory
if [ ! -d "backend/database" ]; then
    echo "📁 Creating database directory..."
    mkdir -p backend/database
    echo "✅ Database directory created"
else
    echo "✅ Database directory already exists"
fi

# Copy .env.example to .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Please review and update the .env file with your settings"
    echo "   Especially change JWT_SECRET in production!"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "👤 Initializing admin user..."
npm run init-admin

echo ""
echo "✅ Backend setup complete!"
echo ""
echo "🚀 To start the backend server, run:"
echo "   npm start"
echo ""
echo "📊 Default Admin Credentials:"
echo "   Email:    admin@virtuverse.com"
echo "   Password: Admin@123"
echo ""
echo "⚠️  IMPORTANT: Change the admin password after first login!"
