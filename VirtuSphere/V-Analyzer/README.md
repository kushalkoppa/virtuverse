# V-Analyzer

V-Analyzer is a dashboard and analytics platform within VirtuSphere that provides visualization of simulation data and platform metrics using Grafana-style dashboards.

## Overview

V-Analyzer provides:
- **Simulation Data Visualization**: Dashboards for open-loop and closed-loop simulation results
- **Platform Metrics**: Usage statistics and performance metrics for VirtuVerse Studio
- **Real-time Monitoring**: Live metrics from V-Orchestrator simulations
- **Historical Analysis**: Trend analysis and historical data visualization

## Features

### 1. Simulation Dashboards
- Open-loop simulation results
- Closed-loop simulation convergence metrics
- Parameter comparison charts
- Result correlation analysis

### 2. Platform Usage Metrics
- User activity tracking
- Resource utilization
- Platform health monitoring
- Service availability metrics

### 3. Custom Dashboards
- Create custom visualization panels
- Configure data sources
- Build custom queries
- Share dashboards with team

### 4. Integration
- Receives data from V-Orchestrator
- Connects to EnviHub and PlantHub for metrics
- Integrates with VirtuVerse Studio authentication

## Architecture

V-Analyzer provides:
- Frontend: React-based dashboard UI with charting libraries
- Backend: Node.js/Express API for data aggregation
- Data Storage: Time-series data storage for metrics
- Integration: REST APIs to simulation platforms

## Dashboard Types

1. **Simulation Results Dashboard**
   - Time-series plots of simulation outputs
   - Parameter sweep visualizations
   - Comparison charts

2. **Platform Health Dashboard**
   - Service uptime metrics
   - Response time tracking
   - Error rate monitoring

3. **Usage Analytics Dashboard**
   - User activity heatmaps
   - Feature usage statistics
   - Peak usage times

## Getting Started

See the main VirtuSphere documentation for setup instructions.
