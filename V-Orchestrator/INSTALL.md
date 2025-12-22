# V-Orchestrator Installation Guide

This guide will help you set up and run the V-Orchestrator platform.

## Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

## Backend Setup

### 1. Navigate to Backend Directory

```bash
cd V-Orchestrator/backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` file if needed to configure:
- `PORT` - Backend server port (default: 3003)
- `MEDAC_URL` - MeDaC platform URL
- `ENVIHUB_URL` - EnviHub platform URL
- `PLANTHUB_URL` - PlantHub platform URL

### 4. Start Backend Server

```bash
npm start
```

The backend API will be available at `http://localhost:3003`

To run in development mode with auto-reload:

```bash
npm run dev
```

## Frontend Setup

### 1. Navigate to Frontend Directory

```bash
cd V-Orchestrator/frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` file if needed to configure:
- `VITE_API_URL` - Backend API URL (default: http://localhost:3003)

### 4. Start Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:5174`

### 5. Build for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Verification

### 1. Check Backend Health

Visit `http://localhost:3003/api/health` in your browser or use curl:

```bash
curl http://localhost:3003/api/health
```

You should see:
```json
{
  "status": "healthy",
  "service": "V-Orchestrator API"
}
```

### 2. Access Frontend

Open your browser and navigate to `http://localhost:5174`

You should see the V-Orchestrator dashboard.

## Running with Platform Integrations

To fully utilize V-Orchestrator, ensure that the following platforms are running:

### MeDaC (Port 3000)
Provides V-ECU models

### EnviHub (Port 3001)
Provides Environment models

### PlantHub (Port 3002)
Provides Plant models

Update the `.env` file in the backend directory to match your platform URLs.

## Troubleshooting

### Backend Issues

**Port Already in Use**
```bash
# Change PORT in backend/.env file
PORT=3004
```

**Cannot Connect to Platforms**
- Verify that MeDaC, EnviHub, and PlantHub are running
- Check URLs in backend/.env file
- Ensure CORS is enabled on platform backends

### Frontend Issues

**Cannot Connect to Backend**
- Verify backend is running on correct port
- Check VITE_API_URL in frontend/.env file
- Check browser console for CORS errors

**Build Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Development Mode

For development, run both backend and frontend:

### Terminal 1 - Backend
```bash
cd V-Orchestrator/backend
npm run dev
```

### Terminal 2 - Frontend
```bash
cd V-Orchestrator/frontend
npm run dev
```

## Production Deployment

### Backend
1. Set `NODE_ENV=production` in `.env`
2. Run `npm start`
3. Consider using PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start server.js --name v-orchestrator-backend
   ```

### Frontend
1. Build the frontend:
   ```bash
   npm run build
   ```
2. Serve the `dist` directory using a web server (nginx, Apache, etc.)
3. Or use the preview server:
   ```bash
   npm run preview
   ```

## Docker Deployment (Optional)

Docker configuration files can be added for containerized deployment. Contact the development team for Docker setup instructions.

## API Testing

You can test the API endpoints using curl or tools like Postman:

```bash
# Test cosimulation middleware
curl http://localhost:3003/api/cosimulation

# Test interfaces
curl http://localhost:3003/api/interfaces

# Test test cases
curl http://localhost:3003/api/testcases

# Test integrations
curl http://localhost:3003/api/integrations
```

## Support

For installation issues or support, please contact the VirtuVerse V-Orchestrator team.
