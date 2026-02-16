# VirtuVerse Studio Deployment Guide

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Environment Configuration](#environment-configuration)
3. [Docker Deployment](#docker-deployment)
4. [Cloud Deployment](#cloud-deployment)
5. [CI/CD Setup](#cicd-setup)
6. [Monitoring and Logging](#monitoring-and-logging)
7. [Backup and Recovery](#backup-and-recovery)
8. [Troubleshooting](#troubleshooting)

## Pre-Deployment Checklist

Before deploying to production, ensure you have:

- [ ] Tested all functionality in staging environment
- [ ] Updated all environment variables for production
- [ ] Changed default admin credentials
- [ ] Set up SSL/TLS certificates
- [ ] Configured proper CORS settings
- [ ] Set up database backup system
- [ ] Configured logging and monitoring
- [ ] Performed security audit
- [ ] Created deployment runbook
- [ ] Set up rollback procedure

## Environment Configuration

### Production Environment Variables

Create a `.env.production` file:

```env
# Server Configuration
PORT=5001
NODE_ENV=production

# Frontend URL (use your actual domain)
FRONTEND_URL=https://virtuverse-studio.yourdomain.com

# JWT Configuration (use a strong, unique secret)
JWT_SECRET=<generate-a-secure-random-string-here>
JWT_EXPIRE=24h

# Database Configuration
DB_PATH=/var/lib/virtuverse/database/virtuverse.db
# OR for MongoDB
# MONGODB_URI=mongodb://username:password@host:port/database

# Email Configuration
EMAIL_HOST=smtp.yourdomain.com
EMAIL_PORT=587
EMAIL_SECURE=true
EMAIL_USER=noreply@yourdomain.com
EMAIL_PASSWORD=<your-email-password>
EMAIL_FROM=VirtuVerse Studio <noreply@yourdomain.com>

# Platform URLs
VIRTUSPACE_URL=https://virtuspace.yourdomain.com
VIRTUSPHERE_URL=https://virtusphere.yourdomain.com
VIRTUMIND_URL=https://virtumind.yourdomain.com

# Security
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
LOG_FILE=/var/log/virtuverse/app.log
```

### Generating Secure Secrets

```bash
# Generate JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Or using OpenSSL
openssl rand -hex 64
```

## Docker Deployment

### Dockerfile

Create `Dockerfile` in the project root:

```dockerfile
# Multi-stage build for optimization
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY frontend/package*.json ./frontend/

# Install dependencies
RUN npm ci --only=production
RUN cd frontend && npm ci --only=production

# Copy application files
COPY . .

# Build frontend
RUN cd frontend && npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/backend ./backend
COPY --from=builder /app/frontend/build ./frontend/build
COPY --from=builder /app/package.json ./

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Set permissions
RUN chown -R nodejs:nodejs /app
RUN mkdir -p /var/lib/virtuverse/database && \
    chown -R nodejs:nodejs /var/lib/virtuverse

USER nodejs

# Expose port
EXPOSE 5001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5001/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start application
CMD ["node", "backend/server.js"]
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  virtuverse-studio:
    build: .
    container_name: virtuverse-studio
    ports:
      - "5001:5001"
    environment:
      - NODE_ENV=production
    env_file:
      - .env.production
    volumes:
      - virtuverse-db:/var/lib/virtuverse/database
      - virtuverse-logs:/var/log/virtuverse
    restart: unless-stopped
    networks:
      - virtuverse-network

  nginx:
    image: nginx:alpine
    container_name: virtuverse-nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
      - ./frontend/build:/usr/share/nginx/html:ro
    depends_on:
      - virtuverse-studio
    restart: unless-stopped
    networks:
      - virtuverse-network

volumes:
  virtuverse-db:
  virtuverse-logs:

networks:
  virtuverse-network:
    driver: bridge
```

### Nginx Configuration

Create `nginx.conf`:

```nginx
events {
    worker_connections 1024;
}

http {
    upstream virtuverse-api {
        server virtuverse-studio:5001;
    }

    server {
        listen 80;
        server_name virtuverse-studio.yourdomain.com;
        
        # Redirect to HTTPS
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name virtuverse-studio.yourdomain.com;

        # SSL Configuration
        ssl_certificate /etc/nginx/ssl/certificate.crt;
        ssl_certificate_key /etc/nginx/ssl/private.key;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;

        # Frontend
        location / {
            root /usr/share/nginx/html;
            try_files $uri $uri/ /index.html;
            
            # Security headers
            add_header X-Frame-Options "SAMEORIGIN" always;
            add_header X-Content-Type-Options "nosniff" always;
            add_header X-XSS-Protection "1; mode=block" always;
        }

        # Backend API
        location /api/ {
            proxy_pass http://virtuverse-api;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

### Deploy with Docker

```bash
# Build and start containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Update deployment
docker-compose pull
docker-compose up -d --force-recreate
```

## Cloud Deployment

### Azure Deployment

#### Prerequisites
- Azure account
- Azure CLI installed

#### Steps

1. **Create Resource Group**

```bash
az group create --name virtuverse-rg --location eastus
```

2. **Create App Service Plan**

```bash
az appservice plan create \
  --name virtuverse-plan \
  --resource-group virtuverse-rg \
  --sku B1 \
  --is-linux
```

3. **Create Web App**

```bash
az webapp create \
  --resource-group virtuverse-rg \
  --plan virtuverse-plan \
  --name virtuverse-studio \
  --runtime "NODE|18-lts"
```

4. **Configure Application Settings**

```bash
az webapp config appsettings set \
  --resource-group virtuverse-rg \
  --name virtuverse-studio \
  --settings \
    NODE_ENV=production \
    JWT_SECRET=<your-secret> \
    FRONTEND_URL=https://virtuverse-studio.azurewebsites.net
```

5. **Deploy Application**

```bash
# Using Azure CLI
az webapp deployment source config-local-git \
  --name virtuverse-studio \
  --resource-group virtuverse-rg

git remote add azure <git-url>
git push azure main

# Or using ZIP deploy
zip -r deploy.zip . -x "*.git*" "node_modules/*"
az webapp deployment source config-zip \
  --resource-group virtuverse-rg \
  --name virtuverse-studio \
  --src deploy.zip
```

### AWS Deployment

#### Using Elastic Beanstalk

1. **Install EB CLI**

```bash
pip install awsebcli
```

2. **Initialize EB Application**

```bash
eb init -p node.js-18 virtuverse-studio
```

3. **Create Environment**

```bash
eb create production-env
```

4. **Set Environment Variables**

```bash
eb setenv NODE_ENV=production JWT_SECRET=<your-secret>
```

5. **Deploy**

```bash
eb deploy
```

### GCP Deployment

#### Using App Engine

1. **Create `app.yaml`**

```yaml
runtime: nodejs18
instance_class: F2

env_variables:
  NODE_ENV: "production"
  JWT_SECRET: "<your-secret>"

handlers:
  - url: /api/.*
    script: auto
    secure: always
    
  - url: /.*
    static_files: frontend/build/index.html
    upload: frontend/build/index.html
    secure: always
```

2. **Deploy**

```bash
gcloud app deploy
```

## CI/CD Setup

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          npm ci
          cd frontend && npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build frontend
        run: cd frontend && npm run build
      
      - name: Build Docker image
        run: docker build -t virtuverse-studio:${{ github.sha }} .
      
      - name: Push to registry
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push virtuverse-studio:${{ github.sha }}
      
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /opt/virtuverse
            docker-compose pull
            docker-compose up -d --force-recreate
```

## Monitoring and Logging

### Application Logging

Install Winston for structured logging:

```bash
npm install winston
```

Configure logger in `backend/config/logger.js`:

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: 'logs/combined.log' 
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;
```

### Health Monitoring

Set up health check endpoints:

```javascript
// In server.js
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});

app.get('/api/health/detailed', authMiddleware, (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    cpu: process.cpuUsage(),
    database: checkDatabaseConnection(),
    timestamp: Date.now()
  });
});
```

### Monitoring Tools

**Recommended tools:**
- **Prometheus + Grafana** - Metrics and dashboards
- **ELK Stack** - Log aggregation and analysis
- **Sentry** - Error tracking
- **Datadog** - All-in-one monitoring

## Backup and Recovery

### Database Backup

**Automated backup script** (`scripts/backup-db.sh`):

```bash
#!/bin/bash

BACKUP_DIR="/var/backups/virtuverse"
DB_PATH="/var/lib/virtuverse/database/virtuverse.db"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/virtuverse_$TIMESTAMP.db"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup database
cp $DB_PATH $BACKUP_FILE

# Compress backup
gzip $BACKUP_FILE

# Keep only last 30 days of backups
find $BACKUP_DIR -name "*.gz" -mtime +30 -delete

echo "Backup completed: $BACKUP_FILE.gz"
```

**Cron job** for daily backups:

```bash
# Add to crontab
0 2 * * * /opt/virtuverse/scripts/backup-db.sh
```

### Recovery Procedure

1. **Stop Application**

```bash
docker-compose down
```

2. **Restore Database**

```bash
gunzip backup_file.db.gz
cp backup_file.db /var/lib/virtuverse/database/virtuverse.db
```

3. **Start Application**

```bash
docker-compose up -d
```

4. **Verify**

```bash
curl http://localhost:5001/api/health
```

## Troubleshooting

### Common Issues

#### Container Won't Start

**Check logs:**
```bash
docker-compose logs virtuverse-studio
```

**Common causes:**
- Port already in use
- Environment variables missing
- Database file permissions

#### Database Connection Errors

**Check database file:**
```bash
ls -la /var/lib/virtuverse/database/
```

**Fix permissions:**
```bash
chown -R nodejs:nodejs /var/lib/virtuverse/database/
chmod 644 /var/lib/virtuverse/database/virtuverse.db
```

#### High Memory Usage

**Check memory:**
```bash
docker stats virtuverse-studio
```

**Restart container:**
```bash
docker-compose restart virtuverse-studio
```

### Performance Optimization

1. **Enable caching**
2. **Optimize database queries**
3. **Use CDN for static assets**
4. **Enable gzip compression**
5. **Implement rate limiting**

---

**Last Updated**: December 2024  
**Version**: 1.0.0
