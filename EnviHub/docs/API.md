# EnviHub API Documentation

## Base URL
```
http://localhost:3001/api
```

## Authentication
Currently, the API does not require authentication. Future versions will implement JWT-based authentication.

## Endpoints

### Health Check

#### GET /health
Check the health status of the API.

**Response:**
```json
{
  "status": "healthy",
  "service": "EnviHub API"
}
```

---

## Tool Interface APIs

### GET /tools
Get all available simulation tools.

**Response:**
```json
[
  {
    "id": "carmaker",
    "name": "IPG CarMaker",
    "version": "12.0",
    "type": "vehicle-dynamics",
    "status": "active",
    "description": "Virtual test driving for chassis and vehicle dynamics simulation",
    "capabilities": ["vehicle-dynamics", "adas", "autonomous-driving"],
    "connectionStatus": "connected"
  }
]
```

### GET /tools/:id
Get details of a specific tool.

**Parameters:**
- `id` (path) - Tool identifier

**Response:**
```json
{
  "id": "carmaker",
  "name": "IPG CarMaker",
  "version": "12.0",
  "type": "vehicle-dynamics",
  "status": "active",
  "description": "Virtual test driving for chassis and vehicle dynamics simulation",
  "capabilities": ["vehicle-dynamics", "adas", "autonomous-driving"],
  "connectionStatus": "connected"
}
```

### POST /tools/:id/connect
Connect to a simulation tool.

**Parameters:**
- `id` (path) - Tool identifier

**Response:**
```json
{
  "message": "Connected to IPG CarMaker",
  "tool": { ... }
}
```

### POST /tools/:id/disconnect
Disconnect from a simulation tool.

**Parameters:**
- `id` (path) - Tool identifier

**Response:**
```json
{
  "message": "Disconnected from IPG CarMaker",
  "tool": { ... }
}
```

---

## Model APIs

### GET /models
Get all models with optional filtering.

**Query Parameters:**
- `tool` (optional) - Filter by tool (e.g., "carmaker")
- `type` (optional) - Filter by type (e.g., "vehicle-dynamics")
- `tag` (optional) - Filter by tag (e.g., "sedan")

**Response:**
```json
[
  {
    "id": "model-001",
    "name": "Sedan Vehicle Dynamics Model",
    "type": "vehicle-dynamics",
    "tool": "carmaker",
    "version": "1.0",
    "author": "Bosch Engineering",
    "created": "2024-01-15",
    "modified": "2024-02-20",
    "description": "Complete vehicle dynamics model for mid-size sedan",
    "tags": ["sedan", "vehicle-dynamics", "passenger-car"],
    "parameters": {
      "mass": 1500,
      "wheelbase": 2.7,
      "track": 1.6
    },
    "access": "internal"
  }
]
```

### GET /models/:id
Get details of a specific model.

**Parameters:**
- `id` (path) - Model identifier

**Response:**
```json
{
  "id": "model-001",
  "name": "Sedan Vehicle Dynamics Model",
  ...
}
```

### POST /models
Create a new model.

**Request Body:**
```json
{
  "name": "New Model",
  "type": "vehicle-dynamics",
  "tool": "carmaker",
  "version": "1.0",
  "author": "Engineer Name",
  "description": "Model description",
  "tags": ["tag1", "tag2"],
  "parameters": {},
  "access": "internal"
}
```

**Response:**
```json
{
  "id": "model-004",
  "name": "New Model",
  "created": "2024-03-20",
  "modified": "2024-03-20",
  ...
}
```

### PUT /models/:id
Update an existing model.

**Parameters:**
- `id` (path) - Model identifier

**Request Body:** (partial update supported)
```json
{
  "name": "Updated Model Name",
  "description": "Updated description"
}
```

**Response:**
```json
{
  "id": "model-001",
  "modified": "2024-03-20",
  ...
}
```

### DELETE /models/:id
Delete a model.

**Parameters:**
- `id` (path) - Model identifier

**Response:**
```json
{
  "message": "Model deleted",
  "model": { ... }
}
```

---

## Sharing APIs

### GET /sharing
Get all sharing records.

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

### GET /sharing/model/:modelId
Get sharing records for a specific model.

**Parameters:**
- `modelId` (path) - Model identifier

**Response:**
```json
[
  {
    "id": "share-001",
    "modelId": "model-001",
    ...
  }
]
```

### POST /sharing
Create a new sharing record.

**Request Body:**
```json
{
  "modelId": "model-001",
  "sharedWith": "Partner Name",
  "type": "oem",
  "permissions": ["read", "execute"],
  "expiryDate": "2024-12-31"
}
```

**Response:**
```json
{
  "id": "share-003",
  "sharedDate": "2024-03-20",
  "status": "active",
  ...
}
```

### DELETE /sharing/:id
Revoke a sharing record.

**Parameters:**
- `id` (path) - Sharing record identifier

**Response:**
```json
{
  "message": "Sharing revoked",
  "record": { ... }
}
```

### GET /sharing/internal
Get internal access records.

**Response:**
```json
[
  {
    "modelId": "model-001",
    "domain": "Chassis Systems",
    "accessLevel": "full",
    "users": ["user1@bosch.com", "user2@bosch.com"]
  }
]
```

### POST /sharing/internal
Grant internal access.

**Request Body:**
```json
{
  "modelId": "model-001",
  "domain": "Chassis Systems",
  "accessLevel": "full",
  "users": ["user1@bosch.com"]
}
```

**Response:**
```json
{
  "modelId": "model-001",
  "domain": "Chassis Systems",
  ...
}
```

---

## Error Responses

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "Error details"
}
```
