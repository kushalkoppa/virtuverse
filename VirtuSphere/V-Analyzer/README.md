# V-Analyzer

V-Analyzer is a dashboard and analytics platform within VirtuSphere that provides visualization of simulation data and platform metrics using Grafana-style dashboards with **SmartHarness** AI-powered insights.

## Overview

V-Analyzer provides:
- **Simulation Data Visualization**: Dashboards for open-loop and closed-loop simulation results
- **Platform Metrics**: Usage statistics and performance metrics for VirtuVerse Studio
- **Real-time Monitoring**: Live metrics from V-Orchestrator simulations
- **Historical Analysis**: Trend analysis and historical data visualization
- **SmartHarness Insights**: AI-powered recommendations and anomaly detection

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

### 5. SmartHarness Integration
SmartHarness in V-Analyzer provides:
- **Intelligent Insights**: AI-powered analysis of simulation results and patterns
- **Anomaly Detection**: Automatic identification of unusual metrics or performance issues
- **Predictive Analytics**: Forecast future trends based on historical data
- **Optimization Recommendations**: Suggest improvements for simulation performance
- **Contextual Scoring**: Evaluate dashboard effectiveness and data quality
- **Smart Alerts**: AI-driven alerting for critical metrics and thresholds
- **Correlation Analysis**: Identify relationships between different metrics and simulations

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

## UI Screenshots

### V-Analyzer Main Dashboard
![V-Analyzer Dashboard](docs/screenshots/v-analyzer-main-dashboard.png)
*Main analytics dashboard with simulation results and platform metrics*

### SmartHarness Insights Panel
![SmartHarness Insights](docs/screenshots/v-analyzer-smartharness-insights.png)
*SmartHarness providing AI-powered insights and recommendations*

### Simulation Results Visualization
![Simulation Results](docs/screenshots/v-analyzer-simulation-results.png)
*Detailed visualization of open-loop and closed-loop simulation results*

### Platform Metrics Dashboard
![Platform Metrics](docs/screenshots/v-analyzer-platform-metrics.png)
*Real-time monitoring of VirtuVerse platform health and usage*

### Custom Dashboard Builder
![Dashboard Builder](docs/screenshots/v-analyzer-dashboard-builder.png)
*Custom dashboard creation with SmartHarness suggestions*

### Anomaly Detection View
![Anomaly Detection](docs/screenshots/v-analyzer-anomaly-detection.png)
*SmartHarness identifying anomalies and performance issues*

> **Note**: Place actual screenshots in `V-Analyzer/docs/screenshots/` directory once deployed.
