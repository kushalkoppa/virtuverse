# Getting Started with VirtuVerse

This guide will help you get the complete VirtuVerse system up and running on your local machine.

## Overview

VirtuVerse is a complete E2E Virtualization & Simulation Universe consisting of four integrated components:

1. **VirtuVerse** - Authentication and entry point
2. **VirtuSpace** - Integration platform
3. **EnviHub** - Virtualization and simulation tools
4. **PlantHub** - Plant simulation and manufacturing tools

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v14 or higher ([Download](https://nodejs.org/))
- **npm** v6 or higher (comes with Node.js)
- **Git** (for cloning the repository)
- At least **4GB RAM**
- At least **10GB disk space**

You can verify your installations:

```bash
node --version  # Should be v14.0.0 or higher
npm --version   # Should be v6.0.0 or higher
git --version   # Any recent version
```

## Quick Start (Automated)

The easiest way to start all services:

```bash
# 1. Clone the repository
git clone <repository-url>
cd virtuverse

# 2. Run the quick start script
./start-all.sh
```

This script will:
- Install all dependencies
- Set up environment files
- Initialize the admin user
- Start all backend services

## Manual Setup (Step-by-Step)

If you prefer to set up manually or need more control:

### Step 1: Install Dependencies

```bash
# Install VirtuVerse dependencies
cd VirtuVerse
npm install
cd ..

# Install VirtuSpace dependencies
cd VirtuSpace
npm install
cd ..

# Install EnviHub dependencies
cd EnviHub
npm install
cd ..

# Install PlantHub dependencies
cd PlantHub
npm install
cd ..
```

### Step 2: Configure Environment Variables

Create `.env` files from the examples:

```bash
cp VirtuVerse/.env.example VirtuVerse/.env
cp VirtuSpace/.env.example VirtuSpace/.env
cp EnviHub/.env.example EnviHub/.env
cp PlantHub/.env.example PlantHub/.env
```

**Optional**: Edit the `.env` files if you want to change default settings like ports or secrets.

### Step 3: Initialize the Database

```bash
cd VirtuVerse
npm run init-admin
cd ..
```

This creates the SQLite database and adds an admin user with default credentials:
- **Email**: admin@virtuverse.com
- **Password**: Admin@123

⚠️ **Security**: Change this password after first login!

### Step 4: Start Backend Services

Open four separate terminal windows/tabs:

**Terminal 1 - VirtuVerse Backend:**
```bash
cd VirtuVerse
npm start
# Running on http://localhost:5001
```

**Terminal 2 - VirtuSpace Backend:**
```bash
cd VirtuSpace
npm start
# Running on http://localhost:3003
```

**Terminal 3 - EnviHub Backend:**
```bash
cd EnviHub
npm start
# Running on http://localhost:3001
```

**Terminal 4 - PlantHub Backend:**
```bash
cd PlantHub
npm start
# Running on http://localhost:3002
```

### Step 5: Start Frontend Applications

For development, you can start the frontend applications:

**Terminal 5 - VirtuVerse Frontend:**
```bash
cd VirtuVerse/frontend
npm install  # First time only
npm start
# Running on http://localhost:5000
```

**Terminal 6 - VirtuSpace Frontend (Optional):**
```bash
cd VirtuSpace/frontend
npm install  # First time only
npm start
# Running on http://localhost:3005
```

**Terminal 7 - EnviHub Frontend (Optional):**
```bash
cd EnviHub/frontend
npm install  # First time only
npm start
# Running on http://localhost:3000
```

**Terminal 8 - PlantHub Frontend (Optional):**
```bash
cd PlantHub/frontend
npm install  # First time only
npm start
# Running on http://localhost:3004
```

## Accessing the Applications

### Main Entry Point

1. Open your browser and navigate to: **http://localhost:5000**
2. You'll see the VirtuVerse login page
3. Log in with the default admin credentials:
   - Email: `admin@virtuverse.com`
   - Password: `Admin@123`

### After Login

1. You'll be redirected to the VirtuVerse dashboard
2. Click the **"Launch VirtuSpace"** button
3. VirtuSpace will open in a new tab at **http://localhost:3003**
4. From VirtuSpace, you can access:
   - **EnviHub** (Virtualization tools)
   - **PlantHub** (Plant simulation tools)

## User Journey

```
1. Login → http://localhost:5000
   ↓
2. Dashboard → Click "Launch VirtuSpace"
   ↓
3. VirtuSpace → http://localhost:3003
   ↓
4. Choose Platform:
   ├── EnviHub → http://localhost:3000
   └── PlantHub → http://localhost:3004
```

## Testing the Services

You can verify all services are running using curl or your browser:

```bash
# VirtuVerse API
curl http://localhost:5001/api/health

# VirtuSpace API
curl http://localhost:3003/api/health

# EnviHub API
curl http://localhost:3001/api/health

# PlantHub API
curl http://localhost:3002/api/health

# VirtuSpace Stats (aggregated)
curl http://localhost:3003/api/stats
```

## Creating Additional Users

### Via UI (Recommended)

1. On the login page, click **"Sign Up"**
2. Fill in the registration form
3. Click **"Create Account"**

### Via API (For Testing)

```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123",
    "name": "John Doe"
  }'
```

## Password Recovery

If you forget your password:

1. Click **"Forgot Password?"** on the login page
2. Enter your email address
3. In development mode, the reset token will be displayed in the console
4. Use the token to reset your password

**Note**: In production, the reset token would be sent via email.

## Troubleshooting

### Port Already in Use

If you get an error about a port being in use:

```bash
# Find and kill the process using the port
lsof -ti:5001 | xargs kill -9  # Replace 5001 with the port number
```

### Database Issues

If you have database issues:

```bash
# Reset the database (development only)
rm VirtuVerse/backend/database/virtuverse.db
cd VirtuVerse
npm run init-admin
cd ..
```

### Dependencies Not Installing

Try clearing npm cache:

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors

Make sure all backend services are running and the frontend applications are configured with the correct API URLs in their `.env` files.

## Stopping the Services

If you used the automated start script:

```bash
./stop-all.sh
```

If you started manually, press `Ctrl+C` in each terminal window where a service is running.

## Next Steps

- **Explore the Platforms**: Try out EnviHub and PlantHub features
- **Change Admin Password**: Update the default admin credentials
- **Read Documentation**: Check individual README files in each component directory
- **Production Deployment**: See [DEPLOYMENT.md](../DEPLOYMENT.md) for production setup

## Common URLs Reference

| Service | Frontend | Backend API |
|---------|----------|-------------|
| VirtuVerse | http://localhost:5000 | http://localhost:5001/api |
| VirtuSpace | http://localhost:3003 (or 3005) | http://localhost:3003/api |
| EnviHub | http://localhost:3000 | http://localhost:3001/api |
| PlantHub | http://localhost:3004 | http://localhost:3002/api |

## Getting Help

- Check the [README.md](../README.md) for architecture overview
- Review [DEPLOYMENT.md](../DEPLOYMENT.md) for production deployment
- Read component-specific READMEs in each directory
- Contact the development team for support

## What's Next?

Now that you have VirtuVerse running:

1. ✅ Log in and explore the dashboard
2. ✅ Access VirtuSpace
3. ✅ Try out EnviHub tools
4. ✅ Explore PlantHub features
5. ✅ Create additional user accounts
6. ✅ Test the authentication flows
7. 📖 Read the detailed documentation
8. 🚀 Consider production deployment

Happy simulating! 🌌
