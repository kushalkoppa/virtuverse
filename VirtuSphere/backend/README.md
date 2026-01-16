# VirtuSphere Backend

This is the main VirtuSphere backend service that acts as an API gateway and aggregator for V-Analyzer and V-DevContainers services.

## Overview

The VirtuSphere backend provides:
- **API Gateway**: Single entry point for all VirtuSphere services
- **Service Proxy**: Routes requests to V-Analyzer and V-DevContainers
- **Health Checks**: Monitors sub-service health and availability
- **CORS Management**: Handles cross-origin requests from Azure frontend
- **Aggregated Stats**: Provides unified service statistics

## Architecture

```
Client Request
    ↓
VirtuSphere Backend (Port 3023/8080)
    ├─→ /api/health          (Health check)
    ├─→ /api/info            (Platform information)
    ├─→ /api/stats           (Aggregated statistics)
    ├─→ /api/v-analyzer/*    (Proxy to V-Analyzer on port 3020)
    └─→ /api/v-devcontainers/* (Proxy to V-DevContainers on port 3030)
```

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Running V-Analyzer backend (port 3020)
- Running V-DevContainers backend (port 3030)

## Installation

```bash
# From VirtuSphere/backend directory
npm install
```

## Configuration

Create a `.env` file based on `.env.example`:

```bash
PORT=3023
NODE_ENV=development
V_ANALYZER_API_URL=http://localhost:3020/api
V_DEVCONTAINERS_API_URL=http://localhost:3030/api
ALLOWED_ORIGINS=http://localhost:3021,http://localhost:5000,https://your-azure-frontend.azurestaticapps.net
```

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| PORT | Server port | 3023 | No |
| NODE_ENV | Environment | development | No |
| V_ANALYZER_API_URL | V-Analyzer backend URL | http://localhost:3020/api | Yes |
| V_DEVCONTAINERS_API_URL | V-DevContainers backend URL | http://localhost:3030/api | Yes |
| ALLOWED_ORIGINS | CORS allowed origins (comma-separated) | * | No |

## Running Locally

### Start Individual Service

```bash
npm start
```

### Start with Auto-reload (Development)

```bash
npm run dev
```

### Start All VirtuSphere Services

From the VirtuSphere root directory:

```bash
./start-virtusphere.sh
```

This will start:
1. V-Analyzer backend (port 3020)
2. V-DevContainers backend (port 3030)
3. VirtuSphere backend (port 3023)

### Stop All Services

```bash
./stop-virtusphere.sh
```

## API Endpoints

### Health & Info

#### GET /api/health
Returns the health status of the VirtuSphere backend.

**Response:**
```json
{
  "status": "healthy",
  "service": "VirtuSphere Backend",
  "timestamp": "2026-01-16T05:33:22.909Z",
  "version": "1.0.0"
}
```

#### GET /api/info
Returns information about the VirtuSphere platform and its components.

**Response:**
```json
{
  "name": "VirtuSphere",
  "description": "Analytics and Visualization Platform",
  "version": "1.0.0",
  "components": [
    {
      "name": "V-Analyzer",
      "description": "Grafana-style dashboards for simulation data",
      "apiUrl": "/api/v-analyzer"
    },
    {
      "name": "V-DevContainers",
      "description": "DevContainer generation tool",
      "apiUrl": "/api/v-devcontainers"
    }
  ]
}
```

#### GET /api/stats
Returns aggregated statistics from all sub-services.

**Response:**
```json
{
  "platform": "VirtuSphere",
  "timestamp": "2026-01-16T05:33:22.891Z",
  "services": {
    "v-analyzer": {
      "status": "healthy",
      "response": {
        "status": "healthy",
        "service": "V-Analyzer API"
      }
    },
    "v-devcontainers": {
      "status": "healthy",
      "response": {
        "status": "healthy",
        "service": "V-DevContainers API"
      }
    }
  }
}
```

### Proxy Endpoints

#### /api/v-analyzer/*
Proxies requests to the V-Analyzer backend.

**Example:**
```bash
# Get all dashboards
curl http://localhost:3023/api/v-analyzer/dashboards

# Get metrics
curl http://localhost:3023/api/v-analyzer/metrics
```

#### /api/v-devcontainers/*
Proxies requests to the V-DevContainers backend.

**Example:**
```bash
# Get all projects
curl http://localhost:3023/api/v-devcontainers/projects

# Get all components
curl http://localhost:3023/api/v-devcontainers/components
```

## Testing

### Manual Testing

Test the health endpoint:
```bash
curl http://localhost:3023/api/health
```

Test the info endpoint:
```bash
curl http://localhost:3023/api/info
```

Test the stats endpoint:
```bash
curl http://localhost:3023/api/stats
```

Test V-Analyzer proxy:
```bash
curl http://localhost:3023/api/v-analyzer/dashboards
```

Test V-DevContainers proxy:
```bash
curl http://localhost:3023/api/v-devcontainers/projects
```

### Automated Tests

```bash
npm test
```

## Deployment

### GCP App Engine

```bash
# From VirtuSphere root directory
gcloud app deploy app.yaml --project=YOUR_PROJECT_ID
```

### GCP Cloud Run

```bash
# From VirtuSphere root directory
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/virtusphere
gcloud run deploy virtusphere \
  --image gcr.io/YOUR_PROJECT_ID/virtusphere \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

See [GCP_DEPLOYMENT.md](../GCP_DEPLOYMENT.md) for detailed deployment instructions.

## CORS Configuration

The backend uses CORS middleware to allow requests from specified origins. Configure the `ALLOWED_ORIGINS` environment variable:

**Development:**
```
ALLOWED_ORIGINS=http://localhost:5000,http://localhost:3021
```

**Production:**
```
ALLOWED_ORIGINS=https://your-azure-frontend.azurestaticapps.net
```

## Troubleshooting

### Service Unavailable Errors

If you get "503 Service Unavailable" errors:

1. Check if sub-services are running:
   ```bash
   lsof -i :3020  # V-Analyzer
   lsof -i :3030  # V-DevContainers
   ```

2. Check logs for errors:
   ```bash
   tail -f /tmp/v-analyzer.log
   tail -f /tmp/v-devcontainers.log
   ```

3. Verify environment variables:
   ```bash
   echo $V_ANALYZER_API_URL
   echo $V_DEVCONTAINERS_API_URL
   ```

### CORS Errors

If you encounter CORS errors:

1. Verify `ALLOWED_ORIGINS` includes your frontend URL
2. Check browser console for specific CORS error messages
3. Ensure credentials mode matches your setup

### Port Already in Use

If port 3023 is already in use:

1. Find the process using the port:
   ```bash
   lsof -i :3023
   ```

2. Stop the process:
   ```bash
   kill <PID>
   ```

3. Or use a different port:
   ```bash
   PORT=3024 npm start
   ```

## Logging

The backend logs all requests to stdout:

```
2026-01-16T05:33:22.000Z - GET /api/health
2026-01-16T05:33:25.000Z - GET /api/stats
```

In production, logs are sent to GCP Cloud Logging:

```bash
# View logs in GCP
gcloud app logs tail --project=YOUR_PROJECT_ID
```

## Development

### Adding New Endpoints

1. Add route handler in `server.js`
2. Test locally
3. Update this README with endpoint documentation

### Adding New Services

1. Update environment variables to include new service URL
2. Add proxy endpoint in `server.js`
3. Update `/api/info` endpoint with new service info
4. Update `/api/stats` to include new service health check

## Support

For issues or questions:
- Check [INTEGRATION_SUMMARY.md](../INTEGRATION_SUMMARY.md)
- See [GCP_DEPLOYMENT.md](../GCP_DEPLOYMENT.md) for deployment issues
- Review main [README.md](../README.md) for VirtuSphere overview
