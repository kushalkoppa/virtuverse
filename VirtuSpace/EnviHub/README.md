# EnviHub Platform

EnviHub is a comprehensive platform within VirtuSpace that provides unified access to virtualization and simulation tools with **SmartHarness** AI assistance for model reusability and compatibility checking.

## Overview

EnviHub serves as a central hub for:
- **Tool Integration**: Interfaces to tools like IPG CarMaker and other simulation tools
- **Model Library**: Storage and management of simulation models
- **Collaboration**: Share models with external OEMs, suppliers, and tool vendors
- **Internal Access**: Enable other Bosch domains to access and use models
- **Model Management**: Select, edit, and version control simulation models
- **SmartHarness**: AI-powered model reusability and compatibility analysis

## Features

### 1. Tool Interfaces
- IPG CarMaker integration
- Extensible architecture for additional tool integrations
- Unified API for tool communication

### 2. Model Library
- Centralized storage for simulation models
- Version control and history tracking
- Model metadata and tagging
- Search and filtering capabilities

### 3. Collaboration & Sharing
- External sharing with OEMs and suppliers
- Role-based access control
- Model permissions management
- Secure sharing mechanisms

### 4. Model Editor
- Visual model editor interface
- Parameter configuration
- Model validation
- Preview and testing capabilities

### 5. SmartHarness - Model Reusability & Compatibility Assistant
SmartHarness in EnviHub provides:
- **Model Reusability Checking**: Verify if models can be reused in different tools
- **Cross-Tool Compatibility**: Check if a model opened in one tool can work in another
- **Interface Details Analysis**: 
  - Interface direction (input/output/bidirectional)
  - Data types and formats
  - Source tool identification (which tool the model was developed/compiled in)
- **Simulation Context Scoring**: Rate model suitability for specific simulation scenarios
- **Tool Migration Guidance**: Assist in migrating models between different simulation tools
- **Version Compatibility**: Check compatibility across different tool versions
- **Smart Recommendations**: Suggest optimal tool and configuration for specific models

## Architecture

EnviHub is built as a modular platform with the following components:
- **Frontend**: React-based web interface
- **Backend**: RESTful API services
- **Model Store**: Database for model storage
- **Integration Layer**: Connectors for various tools
- **Authentication**: User and permission management

## Getting Started

See the individual component documentation in their respective directories.

## UI Screenshots

### EnviHub Dashboard
![EnviHub Dashboard](docs/screenshots/envihub-dashboard.png)
*Main EnviHub interface with model library and tool integrations*

### SmartHarness Model Compatibility Check
![SmartHarness Compatibility](docs/screenshots/envihub-smartharness-compatibility.png)
*SmartHarness analyzing model compatibility across different simulation tools*

### Model Library with Reusability Scores
![Model Library](docs/screenshots/envihub-model-library.png)
*Model library showing SmartHarness reusability scores and recommendations*

### Interface Analysis Dashboard
![Interface Analysis](docs/screenshots/envihub-interface-analysis.png)
*Detailed interface analysis showing direction, datatype, and source tool information*

### Tool Integration Interface
![Tool Integration](docs/screenshots/envihub-tool-integration.png)
*Integration interface for CarMaker, Simulink, and other simulation tools*

> **Note**: Place actual screenshots in `EnviHub/docs/screenshots/` directory once deployed.
