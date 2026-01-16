# VirtuSphere GCP Deployment Guide

This guide covers deploying VirtuSphere backend services to Google Cloud Platform (GCP) while the frontend remains deployed on Azure Static Web Apps.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Azure (Frontend)                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  VirtuVerse Studio (Azure Static Web Apps)           │  │
│  │  - Authentication UI                                  │  │
│  │  - Dashboard with VirtuSphere icon                    │  │
│  └──────────────────┬───────────────────────────────────┘  │
└─────────────────────┼──────────────────────────────────────┘
                      │
                      │ HTTPS Request
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    GCP (Backend)                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  VirtuSphere Backend (App Engine / Cloud Run)        │  │
│  │  - Port: 8080                                         │  │
│  │  - Main API Gateway                                   │  │
│  │  - Health checks                                      │  │
│  └──────────────────┬───────────────────────────────────┘  │
│                     │                                        │
│        ┌────────────┴─────────────┐                        │
│        │                          │                         │
│        ▼                          ▼                         │
│  ┌──────────┐              ┌──────────────┐               │
│  │V-Analyzer│              │V-DevContainers│               │
│  │Backend   │              │Backend        │               │
│  │Port: 3020│              │Port: 3030     │               │
│  └──────────┘              └──────────────┘               │
└─────────────────────────────────────────────────────────────┘
```

## Prerequisites

1. **GCP Account**: Active Google Cloud Platform account
2. **GCP Project**: Created GCP project
3. **gcloud CLI**: Installed and configured
4. **Node.js**: Version 18 or higher
5. **GitHub Repository**: Access to the repository

## Setup Steps

### 1. GCP Project Setup

```bash
# Set your project ID
export GCP_PROJECT_ID="your-project-id"

# Login to GCP
gcloud auth login

# Set the project
gcloud config set project $GCP_PROJECT_ID

# Enable required APIs
gcloud services enable appengine.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
```

### 2. Configure GitHub Secrets

Add the following secrets to your GitHub repository:

1. **GCP_PROJECT_ID**: Your GCP project ID
2. **GCP_REGION**: GCP region (e.g., `us-central1`)
3. **GCP_WORKLOAD_IDENTITY_PROVIDER**: Workload Identity Provider for authentication
4. **GCP_SERVICE_ACCOUNT**: Service account email

#### Setting up Workload Identity Federation

```bash
# Create a service account
gcloud iam service-accounts create github-actions \
    --display-name="GitHub Actions Service Account"

# Grant necessary roles
gcloud projects add-iam-policy-binding $GCP_PROJECT_ID \
    --member="serviceAccount:github-actions@${GCP_PROJECT_ID}.iam.gserviceaccount.com" \
    --role="roles/appengine.appAdmin"

gcloud projects add-iam-policy-binding $GCP_PROJECT_ID \
    --member="serviceAccount:github-actions@${GCP_PROJECT_ID}.iam.gserviceaccount.com" \
    --role="roles/cloudbuild.builds.builder"

# Create Workload Identity Pool
gcloud iam workload-identity-pools create "github-pool" \
    --project="${GCP_PROJECT_ID}" \
    --location="global" \
    --display-name="GitHub Actions Pool"

# Create Workload Identity Provider
gcloud iam workload-identity-pools providers create-oidc "github-provider" \
    --project="${GCP_PROJECT_ID}" \
    --location="global" \
    --workload-identity-pool="github-pool" \
    --display-name="GitHub Provider" \
    --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository" \
    --issuer-uri="https://token.actions.githubusercontent.com"

# Bind the service account
gcloud iam service-accounts add-iam-policy-binding \
    "github-actions@${GCP_PROJECT_ID}.iam.gserviceaccount.com" \
    --project="${GCP_PROJECT_ID}" \
    --role="roles/iam.workloadIdentityUser" \
    --member="principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github-pool/attribute.repository/YOUR_GITHUB_ORG/YOUR_REPO"
```

### 3. Deploy VirtuSphere to GCP

#### Option A: Deploy using GitHub Actions (Recommended)

1. Push changes to the `main` branch
2. The GitHub Actions workflow will automatically:
   - Install dependencies
   - Build frontends
   - Deploy to App Engine or Cloud Run

#### Option B: Manual Deployment to App Engine

```bash
# Navigate to VirtuSphere directory
cd VirtuSphere

# Install dependencies
npm run install:all

# Build frontends
npm run build:frontends

# Deploy to App Engine
gcloud app deploy app.yaml --project=$GCP_PROJECT_ID
```

#### Option C: Manual Deployment to Cloud Run

```bash
# Navigate to VirtuSphere directory
cd VirtuSphere

# Build the Docker image
gcloud builds submit --tag gcr.io/$GCP_PROJECT_ID/virtusphere

# Deploy to Cloud Run
gcloud run deploy virtusphere \
    --image gcr.io/$GCP_PROJECT_ID/virtusphere \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --set-env-vars NODE_ENV=production
```

### 4. Update VirtuVerse Studio Configuration

After deploying VirtuSphere to GCP, update the VirtuVerse Studio frontend environment variables:

1. Get your GCP deployment URL:
   - **App Engine**: `https://YOUR_PROJECT_ID.appspot.com`
   - **Cloud Run**: `https://virtusphere-HASH-uc.a.run.app`

2. Update Azure Static Web App configuration:
   ```bash
   # Set environment variable in Azure Static Web App
   REACT_APP_VIRTUSPHERE_URL=https://YOUR_GCP_URL
   ```

3. Or update the `.env` file in VirtuVerse-Studio/frontend:
   ```
   REACT_APP_VIRTUSPHERE_URL=https://YOUR_GCP_URL
   ```

### 5. Configure CORS

Ensure the VirtuSphere backend allows requests from your Azure frontend:

Update `VirtuSphere/backend/.env` or App Engine environment variables:

```
ALLOWED_ORIGINS=https://your-azure-frontend.azurestaticapps.net,http://localhost:5000
```

## Environment Variables

### VirtuSphere Backend

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| PORT | Server port | 8080 | No |
| NODE_ENV | Environment | production | Yes |
| V_ANALYZER_API_URL | V-Analyzer API URL | http://localhost:3020/api | Yes |
| V_DEVCONTAINERS_API_URL | V-DevContainers API URL | http://localhost:3030/api | Yes |
| ALLOWED_ORIGINS | CORS allowed origins | * | Yes |

### V-Analyzer Backend

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| PORT | Server port | 3020 | No |
| NODE_ENV | Environment | development | No |

### V-DevContainers Backend

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| PORT | Server port | 3030 | No |
| NODE_ENV | Environment | development | No |

## Health Checks

VirtuSphere provides health check endpoints:

- **Main Backend**: `GET /api/health`
- **Platform Info**: `GET /api/info`
- **Aggregated Stats**: `GET /api/stats`

Test the deployment:

```bash
# Health check
curl https://YOUR_GCP_URL/api/health

# Platform info
curl https://YOUR_GCP_URL/api/info

# Aggregated stats
curl https://YOUR_GCP_URL/api/stats
```

## Monitoring and Logging

### View Logs

```bash
# App Engine logs
gcloud app logs tail --project=$GCP_PROJECT_ID

# Cloud Run logs
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=virtusphere" \
    --limit 50 \
    --project=$GCP_PROJECT_ID
```

### Monitoring

Access monitoring dashboards:
- **App Engine**: https://console.cloud.google.com/appengine
- **Cloud Run**: https://console.cloud.google.com/run

## Troubleshooting

### Issue: CORS errors when accessing from Azure frontend

**Solution**: Ensure `ALLOWED_ORIGINS` includes your Azure Static Web App URL

```bash
gcloud app deploy --set-env-vars ALLOWED_ORIGINS=https://your-azure-app.azurestaticapps.net
```

### Issue: Service unavailable errors

**Solution**: Check if all services are running:

```bash
# Check service health
curl https://YOUR_GCP_URL/api/health
curl https://YOUR_GCP_URL/api/stats
```

### Issue: Build failures

**Solution**: Ensure all dependencies are correctly installed and check logs:

```bash
gcloud builds list --project=$GCP_PROJECT_ID
gcloud builds log BUILD_ID --project=$GCP_PROJECT_ID
```

## Cost Optimization

1. **App Engine**: Use automatic scaling with appropriate min/max instances
2. **Cloud Run**: Set appropriate CPU and memory limits
3. **Cold Start**: Consider always-on instances for critical services

## Security Best Practices

1. **Enable HTTPS**: Always use HTTPS in production
2. **CORS Configuration**: Restrict CORS to known origins
3. **Authentication**: Implement authentication for sensitive endpoints
4. **Environment Variables**: Never commit secrets to the repository
5. **IAM Roles**: Follow principle of least privilege

## Rolling Back

If you need to rollback a deployment:

```bash
# App Engine
gcloud app versions list --project=$GCP_PROJECT_ID
gcloud app services set-traffic default --splits=VERSION=1 --project=$GCP_PROJECT_ID

# Cloud Run
gcloud run services update-traffic virtusphere --to-revisions=REVISION=100 --region=us-central1 --project=$GCP_PROJECT_ID
```

## Next Steps

1. Set up monitoring and alerting
2. Configure custom domain
3. Implement caching strategies
4. Set up CI/CD pipelines
5. Add integration tests

## Support

For issues or questions:
- Check GCP documentation: https://cloud.google.com/docs
- Review GitHub Actions logs
- Contact the development team
