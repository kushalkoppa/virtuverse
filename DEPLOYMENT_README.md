# VirtuVerse Platform - Azure Deployment Ready 🚀

## Quick Start

This repository contains the complete backend implementation for VirtuVerse Studio, VirtuSpace, and VirtuSphere, ready for direct deployment to Microsoft Azure.

### One-Command Deployment

```bash
# Login to Azure
az login

# Deploy everything
./deploy-azure.sh

# Validate deployment
./validate-deployment.sh
```

**VirtuVerse Studio will be available at**: `https://virtuverse-studio.azurewebsites.net`

## What's Included

### ✅ Complete Backend Services

1. **VirtuVerse Studio** (Port 5001)
   - User authentication (register, login)
   - Workspace management (CRUD)
   - Project management (CRUD)
   - Service integration hub
   - Health monitoring

2. **VirtuSpace** (Port 3003)
   - Model management
   - Tool integration
   - Configuration management
   - AI agent integration
   - External connections (JFrog, GitHub)

3. **VirtuSphere V-Analyzer** (Port 3020)
   - Dashboard management
   - Real-time metrics
   - Time-series analytics
   - Platform monitoring

4. **VirtuSphere V-DevContainers** (Port 3030)
   - DevContainer configuration
   - Component selection
   - Base image management
   - Feature management
   - JSON generation

### ✅ Azure Deployment Configuration

- **ARM Templates**: Infrastructure as Code for all services
- **Deployment Script**: Automated one-command deployment
- **Validation Script**: Post-deployment health checks
- **Environment Configuration**: Production-ready settings

### ✅ Documentation

- **API_DOCUMENTATION.md**: Complete API reference with examples
- **AZURE_DEPLOYMENT_GUIDE.md**: Comprehensive deployment guide
- **BACKEND_IMPLEMENTATION_SUMMARY.md**: Implementation overview
- **SECURITY_SUMMARY.md**: Security analysis and recommendations

## Local Development

### Prerequisites

- Node.js 18+
- npm

### Start All Services

```bash
# VirtuVerse Studio
cd VirtuVerse-Studio
mkdir -p backend/database
npm install
npm start

# VirtuSpace
cd VirtuSpace/backend
npm install
npm start

# VirtuSphere V-Analyzer
cd VirtuSphere/V-Analyzer
npm install
npm start

# VirtuSphere V-DevContainers
cd VirtuSphere/V-DevContainers/backend
npm install
npm start
```

### Test Endpoints

```bash
# Health checks
curl http://localhost:5001/api/health
curl http://localhost:3003/api/health
curl http://localhost:3020/api/health
curl http://localhost:3030/api/health
```

## Azure Deployment

### Option 1: Automated Deployment (Recommended)

```bash
# Deploy with default settings
./deploy-azure.sh
```

### Option 2: Custom Deployment

```bash
# Set custom configuration
export RESOURCE_GROUP="my-virtuverse-rg"
export LOCATION="westus2"
export VIRTUVERSE_STUDIO_APP="my-studio"

# Deploy
./deploy-azure.sh
```

### Deployment URLs

After deployment, your services will be available at:

- **VirtuVerse Studio**: `https://<app-name>.azurewebsites.net`
- **VirtuSpace**: `https://<app-name>.azurewebsites.net`
- **VirtuSphere V-Analyzer**: `https://<app-name>.azurewebsites.net`
- **VirtuSphere V-DevContainers**: `https://<app-name>.azurewebsites.net`

## Validation

After deployment, validate all services:

```bash
./validate-deployment.sh
```

This script checks:
- ✅ Service availability
- ✅ Health endpoints
- ✅ Integration connectivity
- ✅ Azure App Service status

## API Examples

### Register User

```bash
curl -X POST https://virtuverse-studio.azurewebsites.net/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword",
    "name": "John Doe"
  }'
```

### Login

```bash
curl -X POST https://virtuverse-studio.azurewebsites.net/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword"
  }'
```

### Create Workspace

```bash
curl -X POST https://virtuverse-studio.azurewebsites.net/api/workspaces \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "name": "My Workspace",
    "description": "Development workspace",
    "type": "simulation"
  }'
```

### Check Integration Status

```bash
curl https://virtuverse-studio.azurewebsites.net/api/integrations/status \
  -H "Authorization: Bearer <your-token>"
```

## Key Features

### VirtuVerse Studio
- 🔐 JWT-based authentication
- 📁 Workspace and project management
- 🔗 Service integration hub
- 📊 Metrics aggregation
- 🏥 Health monitoring

### VirtuSpace
- 📦 Model management
- 🔧 Tool integration
- ⚙️ Configuration management
- 🤖 AI agent integration
- 🔌 External connections

### VirtuSphere
- 📈 Real-time analytics
- 📊 Dashboard management
- 🐳 DevContainer generation
- 🔍 Platform monitoring
- 📉 Time-series data

## Architecture

```
┌─────────────────────────────────────────┐
│         Azure Resource Group            │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │    VirtuVerse Studio             │  │
│  │    Authentication & Management    │  │
│  └──────────────┬───────────────────┘  │
│                 │                       │
│  ┌──────────────▼───────────────────┐  │
│  │    VirtuSpace                    │  │
│  │    Model & Tool Integration      │  │
│  └──────────────┬───────────────────┘  │
│                 │                       │
│  ┌──────────────▼───────────────────┐  │
│  │    VirtuSphere                   │  │
│  │    Analytics & DevContainers     │  │
│  └──────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

## Security

### Current Status
- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ Input validation
- ✅ SQL injection prevention
- ✅ HTTPS enforcement
- ⚠️ Rate limiting (recommended for production)

### Production Recommendations
1. Implement rate limiting
2. Use strong JWT secret
3. Enable Application Insights
4. Configure database backups
5. Add security headers (helmet.js)

See **SECURITY_SUMMARY.md** for detailed analysis.

## Troubleshooting

### Deployment Issues

```bash
# Check Azure CLI login
az account show

# View deployment logs
az webapp log tail --resource-group virtuverse-rg --name virtuverse-studio

# Restart services
az webapp restart --resource-group virtuverse-rg --name virtuverse-studio
```

### Local Development Issues

```bash
# Database directory missing
mkdir -p VirtuVerse-Studio/backend/database

# Port already in use
lsof -ti:5001 | xargs kill -9

# Dependencies missing
npm install
```

## Documentation

| Document | Description |
|----------|-------------|
| [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) | Complete API reference |
| [AZURE_DEPLOYMENT_GUIDE.md](./AZURE_DEPLOYMENT_GUIDE.md) | Deployment guide |
| [BACKEND_IMPLEMENTATION_SUMMARY.md](./BACKEND_IMPLEMENTATION_SUMMARY.md) | Implementation details |
| [SECURITY_SUMMARY.md](./SECURITY_SUMMARY.md) | Security analysis |

## Support

For issues or questions:
- Review documentation in this repository
- Check Azure App Service logs
- Consult [Azure documentation](https://docs.microsoft.com/azure/app-service/)

## License

ISC

## Contributing

This is a complete implementation ready for deployment. Contributions welcome for:
- Rate limiting implementation
- Additional security features
- Performance optimizations
- Test coverage improvements

---

**Status**: ✅ Ready for Deployment  
**Last Updated**: January 30, 2026  
**Version**: 1.0.0
