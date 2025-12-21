# PlantHub API Documentation

## Base URL

```
http://localhost:3002/api
```

## Endpoints

### Health Check

#### GET /health

Check the health status of the API.

**Response:**
```json
{
  "status": "healthy",
  "service": "PlantHub API"
}
```

---

### Tools API

#### GET /tools

Get list of all available plant modeling tools.

**Response:**
```json
[
  {
    "id": "simulink",
    "name": "MATLAB Simulink",
    "version": "2023b",
    "type": "plant-modeling",
    "status": "active",
    "description": "Block diagram environment for modeling physical and mathematical plant models",
    "capabilities": ["physical-modeling", "mathematical-modeling", "control-systems", "signal-processing"],
    "connectionStatus": "connected"
  }
]
```

#### GET /tools/:id

Get details of a specific tool.

**Parameters:**
- `id` (string): Tool identifier

**Response:**
```json
{
  "id": "simulink",
  "name": "MATLAB Simulink",
  "version": "2023b",
  "type": "plant-modeling",
  "status": "active",
  "description": "Block diagram environment for modeling physical and mathematical plant models",
  "capabilities": ["physical-modeling", "mathematical-modeling", "control-systems", "signal-processing"],
  "connectionStatus": "connected"
}
```

#### POST /tools/:id/connect

Connect to a specific tool.

**Parameters:**
- `id` (string): Tool identifier

**Response:**
```json
{
  "message": "Connected to MATLAB Simulink",
  "tool": { ... }
}
```

#### POST /tools/:id/disconnect

Disconnect from a specific tool.

**Parameters:**
- `id` (string): Tool identifier

**Response:**
```json
{
  "message": "Disconnected from MATLAB Simulink",
  "tool": { ... }
}
```

---

### Models API

#### GET /models

Get list of all plant models with optional filtering.

**Query Parameters:**
- `tool` (string, optional): Filter by tool (e.g., "simulink", "modelica", "amesim")
- `type` (string, optional): Filter by type (e.g., "sensor", "actuator", "physical", "mathematical")
- `tag` (string, optional): Filter by tag

**Response:**
```json
[
  {
    "id": "model-001",
    "name": "Temperature Sensor Model",
    "type": "sensor",
    "tool": "simulink",
    "version": "1.0",
    "author": "Bosch Plant Modeling Team",
    "created": "2024-01-15",
    "modified": "2024-02-20",
    "description": "High-precision temperature sensor model with noise characteristics",
    "tags": ["sensor", "temperature", "measurement"],
    "parameters": {
      "range": "-40 to 150°C",
      "accuracy": "±0.5°C",
      "responseTime": "1s"
    },
    "access": "internal"
  }
]
```

#### GET /models/:id

Get details of a specific model.

**Parameters:**
- `id` (string): Model identifier

**Response:**
```json
{
  "id": "model-001",
  "name": "Temperature Sensor Model",
  "type": "sensor",
  "tool": "simulink",
  "version": "1.0",
  "author": "Bosch Plant Modeling Team",
  "created": "2024-01-15",
  "modified": "2024-02-20",
  "description": "High-precision temperature sensor model with noise characteristics",
  "tags": ["sensor", "temperature", "measurement"],
  "parameters": {
    "range": "-40 to 150°C",
    "accuracy": "±0.5°C",
    "responseTime": "1s"
  },
  "access": "internal"
}
```

#### POST /models

Create a new plant model.

**Request Body:**
```json
{
  "name": "New Sensor Model",
  "type": "sensor",
  "tool": "simulink",
  "version": "1.0",
  "description": "Description of the model",
  "tags": ["sensor", "custom"],
  "parameters": {},
  "access": "internal"
}
```

**Response:**
```json
{
  "id": "model-005",
  "name": "New Sensor Model",
  "type": "sensor",
  "tool": "simulink",
  "version": "1.0",
  "description": "Description of the model",
  "tags": ["sensor", "custom"],
  "parameters": {},
  "access": "internal",
  "created": "2024-03-25",
  "modified": "2024-03-25"
}
```

#### PUT /models/:id

Update an existing model.

**Parameters:**
- `id` (string): Model identifier

**Request Body:** (same as POST)

**Response:** Updated model object

#### DELETE /models/:id

Delete a model.

**Parameters:**
- `id` (string): Model identifier

**Response:**
```json
{
  "message": "Model deleted",
  "model": { ... }
}
```

---

### Sharing API

#### GET /sharing

Get list of all sharing records.

**Query Parameters:**
- `includeRevoked` (boolean, optional): Include revoked shares (default: false)

**Response:**
```json
[
  {
    "id": "share-001",
    "modelId": "model-001",
    "sharedWith": "OEM Partner A",
    "type": "oem",
    "permissions": ["read", "execute"],
    "sharedDate": "2024-03-01",
    "expiryDate": "2024-12-31",
    "status": "active"
  }
]
```

#### GET /sharing/model/:modelId

Get sharing records for a specific model.

**Parameters:**
- `modelId` (string): Model identifier

**Query Parameters:**
- `includeRevoked` (boolean, optional): Include revoked shares (default: false)

**Response:** Array of sharing records

#### POST /sharing

Create a new sharing record.

**Request Body:**
```json
{
  "modelId": "model-001",
  "sharedWith": "Partner Name",
  "type": "oem",
  "permissions": ["read"],
  "expiryDate": "2024-12-31"
}
```

**Response:**
```json
{
  "id": "share-003",
  "modelId": "model-001",
  "sharedWith": "Partner Name",
  "type": "oem",
  "permissions": ["read"],
  "sharedDate": "2024-03-25",
  "expiryDate": "2024-12-31",
  "status": "active"
}
```

#### DELETE /sharing/:id

Revoke a sharing record (soft delete).

**Parameters:**
- `id` (string): Sharing record identifier

**Response:**
```json
{
  "message": "Sharing revoked",
  "record": { ... }
}
```

#### GET /sharing/internal

Get internal access records.

**Response:**
```json
[
  {
    "modelId": "model-001",
    "domain": "Sensor Systems",
    "accessLevel": "full",
    "users": ["user1@bosch.com", "user2@bosch.com"]
  }
]
```

#### POST /sharing/internal

Grant internal access.

**Request Body:**
```json
{
  "modelId": "model-001",
  "domain": "Department Name",
  "accessLevel": "full",
  "users": ["user@bosch.com"]
}
```

**Response:** Created internal access record

---

## Error Responses

All endpoints may return error responses:

**404 Not Found:**
```json
{
  "error": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error"
}
```
