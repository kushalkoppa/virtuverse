# Plant Model Management Backend API Documentation

## Overview

This backend provides comprehensive plant model management capabilities including storage, metadata extraction, versioning, and tool integration.

## Base URL
```
http://localhost:3002/api
```

## Endpoints

### 1. Get All Plant Models
```
GET /plant-models
```

**Response:**
```json
[
  {
    "id": "PM-L9C8XYZ-A1B2C",
    "name": "Assembly Line Model",
    "description": "Complete assembly line simulation model",
    "type": "Plant Simulation",
    "version": "1.0.0",
    "filePath": "/path/to/file.spp",
    "fileSize": 1024,
    "status": "active",
    "metadata": {
      "author": "John Doe",
      "modifiedDate": "2024-01-01T00:00:00.000Z",
      "sourceTool": "Plant Simulation",
      "interfaces": [
        {
          "name": "ConveyorSpeed",
          "dataType": "double",
          "direction": "input",
          "unit": "m/s"
        }
      ],
      "compatibility": {
        "environmentModels": 85,
        "virtualECUs": 70,
        "plantModels": 90
      }
    },
    "versionHistory": [],
    "parentVersion": null,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "lastModified": "2024-01-01T00:00:00.000Z"
  }
]
```

### 2. Get Specific Plant Model
```
GET /plant-models/:id
```

**Parameters:**
- `id` (string): Unique model identifier

**Response:**
Same as individual model object above

### 3. Get Model Metadata
```
GET /plant-models/:id/metadata
```

**Response:**
```json
{
  "author": "John Doe",
  "modifiedDate": "2024-01-01T00:00:00.000Z",
  "sourceTool": "Plant Simulation",
  "interfaces": [
    {
      "name": "ConveyorSpeed",
      "dataType": "double",
      "direction": "input",
      "unit": "m/s"
    }
  ],
  "compatibility": {
    "environmentModels": 85,
    "virtualECUs": 70,
    "plantModels": 90
  }
}
```

### 4. Get Version History
```
GET /plant-models/:id/versions
```

**Response:**
```json
{
  "currentVersion": "1.0.1",
  "versionHistory": [
    {
      "version": "1.0.0",
      "timestamp": "2024-01-01T00:00:00.000Z",
      "changes": "Initial version"
    }
  ]
}
```

### 5. Create New Plant Model
```
POST /plant-models
```

**Request Body (JSON):**
```json
{
  "name": "New Plant Model",
  "description": "Model description",
  "type": "Plant Simulation",
  "version": "1.0.0"
}
```

**Request with File Upload (multipart/form-data):**
```
name: New Plant Model
description: Model description
type: Plant Simulation
modelFile: [binary file data]
```

**Response:**
```json
{
  "message": "Plant model created successfully",
  "model": {
    "id": "PM-ML5IM6J1-WC5WP",
    "name": "New Plant Model",
    ...
  }
}
```

### 6. Update Plant Model (Creates New Version)
```
PUT /plant-models/:id
```

**Request Body:**
```json
{
  "description": "Updated description",
  "changeDescription": "What changed in this version"
}
```

**Response:**
```json
{
  "message": "Plant model updated with new version",
  "model": {
    "version": "1.0.1",
    ...
  }
}
```

### 7. Delete Plant Model
```
DELETE /plant-models/:id
```

**Response:**
```
204 No Content
```

### 8. Open Model in External Tool
```
POST /plant-models/:id/open-tool
```

**Request Body:**
```json
{
  "toolName": "Plant Simulation"
}
```

**Response:**
```json
{
  "message": "Model opened in external tool",
  "success": true,
  "sessionId": "session_1234567890_abcdef",
  "toolName": "Plant Simulation",
  "filePath": "/path/to/model.spp",
  "commandPreview": "\"plantsim\" \"/path/to/model.spp\""
}
```

### 9. Save Edited Model from Tool
```
POST /plant-models/:id/save-from-tool
```

**Request (multipart/form-data):**
```
editedFile: [binary file data]
changeDescription: "What changed in this version"
```

**Response:**
```json
{
  "message": "Edited model saved as new version",
  "model": {
    "version": "1.0.1",
    ...
  }
}
```

### 10. Get Available Tools
```
GET /plant-models/tools/available
```

**Response:**
```json
[
  {
    "name": "Plant Simulation",
    "executable": "plantsim",
    "supportedExtensions": [".spp", ".pss"]
  },
  {
    "name": "Process Simulator",
    "executable": "procsim",
    "supportedExtensions": [".mdl", ".sim"]
  }
]
```

## Features

### 1. Unique ID Generation
- Each model gets a unique ID in format: `PM-[timestamp]-[random]`
- IDs are guaranteed to be unique across the system

### 2. Metadata Extraction
When a model file is uploaded, the system automatically extracts:
- **Author**: From file metadata or system default
- **Modified Date**: File modification timestamp
- **Source Tool**: Detected from file extension
  - `.spp`, `.pss` → Plant Simulation
  - `.mdl`, `.sim` → Process Simulator
  - `.mat`, `.slx` → MATLAB/Simulink
  - `.fmu` → FMI-compatible Tool
- **Interfaces**: Input/output interface definitions with data types
- **Compatibility Percentages**: Calculated compatibility with:
  - Environment models (0-100%)
  - Virtual ECUs (0-100%)
  - Other plant models (0-100%)

### 3. Versioning System
- Semantic versioning (Major.Minor.Patch)
- Each update creates a new version (increments patch number)
- Version history tracks all changes with timestamps
- Parent version tracking maintains lineage

### 4. Tool Integration
- Register multiple external tools
- Open models in appropriate tool based on file type
- Track tool sessions
- Save edited models back with new versions

## Error Responses

All endpoints return appropriate HTTP status codes:
- `200 OK` - Successful request
- `201 Created` - Resource created successfully
- `204 No Content` - Successful deletion
- `400 Bad Request` - Invalid input
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

**Error Response Format:**
```json
{
  "error": "Error message",
  "details": "Detailed error information"
}
```

## File Upload Limits
- Maximum file size: 100 MB
- Supported file types: `.spp`, `.pss`, `.sim`, `.mdl`, `.xml`, `.json`, `.fmu`, `.mat`, `.slx`

## Environment Variables

Configure tool paths in `.env`:
```
PLANT_SIM_PATH=/path/to/plantsim
PROCESS_SIM_PATH=/path/to/procsim
MATLAB_PATH=/path/to/matlab
DEFAULT_AUTHOR=System
```

## Testing

Run the test suite:
```bash
npm test
```

## Example Usage

### Creating and Updating a Model

1. Create a model:
```bash
curl -X POST http://localhost:3002/api/plant-models \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Plant Model",
    "description": "Test model",
    "type": "Plant Simulation"
  }'
```

2. Upload a file for the model:
```bash
curl -X POST http://localhost:3002/api/plant-models \
  -F "name=My Plant Model" \
  -F "description=Test model" \
  -F "modelFile=@model.spp"
```

3. Update the model (creates version 1.0.1):
```bash
curl -X PUT http://localhost:3002/api/plant-models/PM-XXX-YYY \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Updated model",
    "changeDescription": "Fixed bug in interface"
  }'
```

4. Check version history:
```bash
curl http://localhost:3002/api/plant-models/PM-XXX-YYY/versions
```

### Tool Integration Workflow

1. Get available tools:
```bash
curl http://localhost:3002/api/plant-models/tools/available
```

2. Open model in tool:
```bash
curl -X POST http://localhost:3002/api/plant-models/PM-XXX-YYY/open-tool \
  -H "Content-Type: application/json" \
  -d '{"toolName": "Plant Simulation"}'
```

3. Edit the model in the external tool

4. Save the edited model:
```bash
curl -X POST http://localhost:3002/api/plant-models/PM-XXX-YYY/save-from-tool \
  -F "editedFile=@edited_model.spp" \
  -F "changeDescription=Updated parameters"
```

## Notes

- This is a placeholder implementation using in-memory storage
- In production, use a proper database (MongoDB, PostgreSQL, etc.)
- Metadata extraction uses heuristics and placeholders
- Tool integration commands are prepared but not executed in this implementation
- File uploads are stored in `backend/uploads/` directory
