# VirtuVerse

VirtuVerse is the complete E2E Virtualization & Simulation Universe that serves as the entry point for the entire platform. It provides authentication and access to VirtuSpace, which integrates EnviHub and PlantHub.

## Features

- **User Authentication**: Complete login, signup, and password recovery system
- **User Management**: Database-backed user management with admin support
- **Secure Access**: JWT-based authentication
- **VirtuSpace Integration**: Access to both EnviHub and PlantHub through VirtuSpace

## Architecture

```
VirtuVerse (Authentication Layer)
    └── VirtuSpace (Integration Layer)
        ├── EnviHub (Virtualization & Simulation)
        └── PlantHub (Plant Simulation & Manufacturing)
```

## Getting Started

### Prerequisites

- Node.js v14 or higher
- MongoDB (or SQLite for development)

### Installation

1. Install backend dependencies:
```bash
cd VirtuVerse
npm install
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
cd ..
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Initialize the database with admin user:
```bash
npm run init-admin
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5000
- Backend API: http://localhost:5001

## Default Admin Credentials

- Email: admin@virtuverse.com
- Password: Admin@123

**Important**: Change these credentials immediately after first login in a production environment.

## Deployment

For production deployment, see [DEPLOYMENT.md](DEPLOYMENT.md) for Docker and hosting instructions.
