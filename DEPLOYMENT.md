# VirtuVerse Deployment Guide

This guide covers deploying the complete VirtuVerse system, which includes VirtuVerse (authentication), VirtuSpace (integration layer), EnviHub, and PlantHub.

## Architecture Overview

```
VirtuVerse (Port 5000/5001) - Authentication Layer
    └── VirtuSpace (Port 3003) - Integration Layer
        ├── EnviHub (Port 3000/3001) - Virtualization & Simulation
        └── PlantHub (Port 3004/3002) - Plant Simulation & Manufacturing
```

## Docker Deployment

### Prerequisites

- Docker and Docker Compose installed
- Minimum 4GB RAM
- 10GB available disk space

### Quick Start with Docker Compose

1. Create a `docker-compose.yml` in the root directory:

```yaml
version: '3.8'

services:
  # VirtuVerse Backend (Authentication)
  virtuverse-backend:
    build:
      context: ./VirtuVerse
      dockerfile: Dockerfile.backend
    ports:
      - "5001:5001"
    environment:
      - NODE_ENV=production
      - PORT=5001
      - JWT_SECRET=${JWT_SECRET}
    volumes:
      - virtuverse-data:/app/backend/database
    restart: unless-stopped

  # VirtuVerse Frontend
  virtuverse-frontend:
    build:
      context: ./VirtuVerse/frontend
      dockerfile: Dockerfile
    ports:
      - "5000:80"
    environment:
      - REACT_APP_API_URL=http://localhost:5001/api
      - REACT_APP_VIRTUSPACE_URL=http://localhost:3003
    depends_on:
      - virtuverse-backend
    restart: unless-stopped

  # VirtuSpace Backend
  virtuspace-backend:
    build:
      context: ./VirtuSpace
      dockerfile: Dockerfile.backend
    ports:
      - "3003:3003"
    environment:
      - NODE_ENV=production
      - PORT=3003
      - ENVIHUB_API_URL=http://envihub-backend:3001/api
      - PLANTHUB_API_URL=http://planthub-backend:3002/api
    restart: unless-stopped

  # VirtuSpace Frontend
  virtuspace-frontend:
    build:
      context: ./VirtuSpace/frontend
      dockerfile: Dockerfile
    ports:
      - "3005:80"
    environment:
      - REACT_APP_API_URL=http://localhost:3003/api
      - REACT_APP_ENVIHUB_URL=http://localhost:3000
      - REACT_APP_PLANTHUB_URL=http://localhost:3004
    depends_on:
      - virtuspace-backend
    restart: unless-stopped

  # EnviHub Backend
  envihub-backend:
    build:
      context: ./EnviHub
      dockerfile: Dockerfile.backend
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - PORT=3001
    restart: unless-stopped

  # EnviHub Frontend
  envihub-frontend:
    build:
      context: ./EnviHub/frontend
      dockerfile: Dockerfile
    ports:
      - "3000:80"
    environment:
      - REACT_APP_API_URL=http://localhost:3001/api
    depends_on:
      - envihub-backend
    restart: unless-stopped

  # PlantHub Backend
  planthub-backend:
    build:
      context: ./PlantHub
      dockerfile: Dockerfile.backend
    ports:
      - "3002:3002"
    environment:
      - NODE_ENV=production
      - PORT=3002
    restart: unless-stopped

  # PlantHub Frontend
  planthub-frontend:
    build:
      context: ./PlantHub/frontend
      dockerfile: Dockerfile
    ports:
      - "3004:80"
    environment:
      - REACT_APP_API_URL=http://localhost:3002/api
    depends_on:
      - planthub-backend
    restart: unless-stopped

volumes:
  virtuverse-data:

networks:
  default:
    name: virtuverse-network
```

2. Create a `.env` file:

```bash
JWT_SECRET=your_very_secure_secret_key_change_in_production
```

3. Build and start all services:

```bash
docker-compose up -d
```

4. Initialize admin user:

```bash
docker-compose exec virtuverse-backend npm run init-admin
```

5. Access the applications:
- VirtuVerse: http://localhost:5000
- VirtuSpace: http://localhost:3003
- EnviHub: http://localhost:3000
- PlantHub: http://localhost:3004

## Manual Deployment

### 1. Install Dependencies

```bash
# VirtuVerse
cd VirtuVerse
npm install
cd frontend && npm install && cd ..

# VirtuSpace
cd ../VirtuSpace
npm install
cd frontend && npm install && cd ..

# EnviHub
cd ../EnviHub
npm install
cd frontend && npm install && cd ..

# PlantHub
cd ../PlantHub
npm install
cd frontend && npm install && cd ..
```

### 2. Configure Environment Variables

Create `.env` files in each directory using the `.env.example` templates.

### 3. Build Frontends

```bash
# VirtuVerse Frontend
cd VirtuVerse/frontend && npm run build && cd ../..

# VirtuSpace Frontend
cd VirtuSpace/frontend && npm run build && cd ../..

# EnviHub Frontend
cd EnviHub/frontend && npm run build && cd ../..

# PlantHub Frontend
cd PlantHub/frontend && npm run build && cd ../..
```

### 4. Start Services

Use PM2 or similar process manager:

```bash
# Install PM2
npm install -g pm2

# Start all services
pm2 start VirtuVerse/backend/server.js --name virtuverse-api
pm2 start VirtuSpace/backend/server.js --name virtuspace-api
pm2 start EnviHub/backend/server.js --name envihub-api
pm2 start PlantHub/backend/server.js --name planthub-api

# Serve frontends with a web server like nginx
```

### 5. Initialize Admin User

```bash
cd VirtuVerse
npm run init-admin
```

## Production Considerations

### Security

1. **Change Default Credentials**: Update admin password immediately
2. **Use Strong JWT Secret**: Generate a strong random string
3. **Enable HTTPS**: Use SSL certificates (Let's Encrypt)
4. **Configure CORS**: Restrict origins in production
5. **Rate Limiting**: Implement rate limiting on auth endpoints
6. **Database Backups**: Regular backups of SQLite database

### Performance

1. **Reverse Proxy**: Use Nginx for load balancing
2. **Caching**: Implement Redis for session management
3. **CDN**: Serve static assets via CDN
4. **Monitoring**: Set up logging and monitoring (PM2, New Relic, etc.)

### Database Migration

For production, consider migrating from SQLite to PostgreSQL or MySQL:

```javascript
// Update VirtuVerse/backend/config/database.js
// Replace better-sqlite3 with pg or mysql2
```

## Nginx Configuration Example

```nginx
server {
    listen 80;
    server_name virtuverse.example.com;

    # VirtuVerse Frontend
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # VirtuVerse API
    location /api {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
    }
}
```

## Troubleshooting

### Database Issues

```bash
# Check database file permissions
ls -la VirtuVerse/backend/database/

# Reset database (development only)
rm VirtuVerse/backend/database/virtuverse.db
npm run init-admin
```

### Port Conflicts

```bash
# Check if ports are in use
netstat -tuln | grep -E ':(3000|3001|3002|3003|3004|5000|5001)'

# Kill processes if needed
lsof -ti:3001 | xargs kill -9
```

### CORS Issues

Update CORS configuration in each backend server.js file to include your production domain.

## Monitoring

### Health Checks

```bash
# Check all services
curl http://localhost:5001/api/health  # VirtuVerse
curl http://localhost:3003/api/health  # VirtuSpace
curl http://localhost:3001/api/health  # EnviHub
curl http://localhost:3002/api/health  # PlantHub
```

### Logs

```bash
# With PM2
pm2 logs virtuverse-api
pm2 logs virtuspace-api
pm2 logs envihub-api
pm2 logs planthub-api
```

## Backup and Recovery

### Database Backup

```bash
# Backup VirtuVerse database
cp VirtuVerse/backend/database/virtuverse.db virtuverse-backup-$(date +%Y%m%d).db

# Restore
cp virtuverse-backup-20231201.db VirtuVerse/backend/database/virtuverse.db
```

### Full System Backup

```bash
tar -czf virtuverse-full-backup-$(date +%Y%m%d).tar.gz \
  VirtuVerse VirtuSpace EnviHub PlantHub
```

## Support

For issues or questions, contact the development team or refer to the individual README files in each component directory.
