# Use official Node.js runtime as base image
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./backend/
COPY V-Analyzer/package*.json ./V-Analyzer/
COPY V-DevContainers/backend/package*.json ./V-DevContainers/backend/

# Install backend dependencies
RUN cd backend && npm ci --only=production && \
    cd ../V-Analyzer && npm ci --only=production && \
    cd ../V-DevContainers/backend && npm ci --only=production

# Copy backend source code
COPY backend ./backend
COPY V-Analyzer/backend ./V-Analyzer/backend
COPY V-DevContainers/backend ./V-DevContainers/backend

# Build stage for V-Analyzer frontend
FROM node:18-alpine AS v-analyzer-build
WORKDIR /app
COPY V-Analyzer/frontend/package*.json ./
RUN npm ci
COPY V-Analyzer/frontend ./
RUN npm run build

# Build stage for V-DevContainers frontend
FROM node:18-alpine AS v-devcontainers-build
WORKDIR /app
COPY V-DevContainers/frontend/package*.json ./
RUN npm ci
COPY V-DevContainers/frontend ./
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy backend dependencies and code from base stage
COPY --from=base /app ./

# Copy built frontends
COPY --from=v-analyzer-build /app/build ./V-Analyzer/frontend/build
COPY --from=v-devcontainers-build /app/build ./V-DevContainers/frontend/build

# Expose port
EXPOSE 8080

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Start the backend server
CMD ["node", "backend/server.js"]
