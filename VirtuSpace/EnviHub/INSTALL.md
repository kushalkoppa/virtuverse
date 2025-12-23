# EnviHub Installation Guide

## Prerequisites

Before installing EnviHub, ensure you have:

- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v8.0.0 or higher) - Comes with Node.js
- **Git** - For cloning the repository

## Installation Steps

### 1. Access the Repository

If you've cloned the virtuverse repository, navigate to it:

```bash
cd virtuverse
```

Or clone it first:

```bash
git clone <repository-url>
cd virtuverse
```

Note: Replace `<repository-url>` with the actual repository URL provided by your administrator.

### 2. Navigate to EnviHub Directory

```bash
cd EnviHub
```

### 3. Install Backend Dependencies

```bash
npm install
```

This will install:
- express - Web server framework
- cors - Cross-origin resource sharing
- dotenv - Environment configuration
- jsonwebtoken - Authentication (future use)
- multer - File upload handling
- nodemon - Development auto-reload
- concurrently - Run multiple processes
- jest - Testing framework
- supertest - API testing

### 4. Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

This will install:
- react - UI library
- react-dom - React DOM rendering
- react-router-dom - Client-side routing
- axios - HTTP client
- react-scripts - React development tools

### 5. Configure Environment (Optional)

Create a `.env` file in the EnviHub directory:

```bash
cp .env.example .env
```

Edit `.env` to customize settings:

```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## Running the Application

### Development Mode

Run both backend and frontend simultaneously:

```bash
npm run dev
```

This will start:
- Backend API server on `http://localhost:3001`
- Frontend React app on `http://localhost:3000`

### Production Mode

#### Build the Frontend

```bash
npm run build
```

#### Start the Backend Server

```bash
npm start
```

The application will be available at `http://localhost:3001`

## Running Individual Components

### Backend Only

```bash
npm run dev:backend
```

The API will be available at `http://localhost:3001`

### Frontend Only

```bash
npm run dev:frontend
```

The UI will be available at `http://localhost:3000`

## Testing

### Run Backend Tests

```bash
npm test
```

This will run the Jest test suite for API endpoints.

## Verification

After installation, verify the setup:

### 1. Check Backend Health

Open your browser or use curl:

```bash
curl http://localhost:3001/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "service": "EnviHub API"
}
```

### 2. Access the UI

Open your browser and navigate to:
```
http://localhost:3000
```

You should see the EnviHub dashboard.

### 3. Test API Endpoints

```bash
# Get all tools
curl http://localhost:3001/api/tools

# Get all models
curl http://localhost:3001/api/models

# Get sharing records
curl http://localhost:3001/api/sharing
```

## Troubleshooting

### Port Already in Use

If port 3000 or 3001 is already in use:

1. Change the port in `.env` file
2. Or stop the process using the port:

```bash
# Linux/Mac
lsof -ti:3001 | xargs kill -9

# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### Dependencies Installation Failed

Try clearing npm cache:

```bash
npm cache clean --force
rm -rf node_modules
npm install
```

### Frontend Build Issues

Ensure you're using a compatible Node.js version:

```bash
node --version  # Should be v18.0.0 or higher
```

### API Not Responding

1. Check if the backend server is running
2. Verify the port in `.env` matches the frontend API calls
3. Check console for error messages

## Next Steps

After successful installation:

1. Read the [User Guide](docs/USER_GUIDE.md) to learn how to use EnviHub
2. Review the [API Documentation](docs/API.md) for API integration
3. Check the [Architecture Documentation](docs/ARCHITECTURE.md) to understand the system design

## Uninstallation

To remove EnviHub:

```bash
cd EnviHub
rm -rf node_modules
rm -rf frontend/node_modules
rm -rf frontend/build
```

## Support

For issues or questions:
- Check the documentation in the `docs/` folder
- Review existing issues on GitHub
- Contact the development team
