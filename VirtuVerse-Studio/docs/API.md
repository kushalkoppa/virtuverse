# VirtuVerse Studio API Reference

## Overview

VirtuVerse Studio provides a RESTful API for authentication, user management, and platform integration. All endpoints return JSON responses and require proper authentication where specified.

**Base URL**: `http://localhost:5001/api` (development)  
**Production URL**: `https://virtuverse-studio.example.com/api`

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the `Authorization` header:

```
Authorization: Bearer <your-jwt-token>
```

## API Endpoints

### Authentication Endpoints

#### POST /auth/login

Authenticate a user and receive a JWT token.

**Request**

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response**

```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user"
  }
}
```

**Status Codes**
- `200` - Login successful
- `401` - Invalid credentials
- `400` - Validation error
- `500` - Server error

---

#### POST /auth/register

Register a new user account.

**Request**

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "SecurePassword123!",
  "firstName": "Jane",
  "lastName": "Smith"
}
```

**Response**

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 2,
    "email": "newuser@example.com",
    "firstName": "Jane",
    "lastName": "Smith",
    "role": "user"
  }
}
```

**Validation Rules**
- `email`: Required, valid email format, unique
- `password`: Required, minimum 8 characters, must contain uppercase, lowercase, number, and special character
- `firstName`: Optional
- `lastName`: Optional

**Status Codes**
- `201` - User created successfully
- `400` - Validation error or email already exists
- `500` - Server error

---

#### POST /auth/forgot-password

Request a password reset email.

**Request**

```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Response**

```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

**Status Codes**
- `200` - Reset email sent (or user not found, same response for security)
- `400` - Validation error
- `500` - Server error

---

#### POST /auth/reset-password

Reset password using token from email.

**Request**

```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "abc123def456...",
  "newPassword": "NewSecurePassword123!"
}
```

**Response**

```json
{
  "success": true,
  "message": "Password reset successful"
}
```

**Status Codes**
- `200` - Password reset successful
- `400` - Invalid or expired token, validation error
- `500` - Server error

---

#### GET /auth/verify-token

Verify if a JWT token is valid.

**Request**

```http
GET /api/auth/verify-token
Authorization: Bearer <your-jwt-token>
```

**Response**

```json
{
  "valid": true,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "user"
  }
}
```

**Status Codes**
- `200` - Token is valid
- `401` - Token is invalid or expired

---

### User Management Endpoints

#### GET /users/profile

Get the current user's profile.

**Authentication**: Required

**Request**

```http
GET /api/users/profile
Authorization: Bearer <your-jwt-token>
```

**Response**

```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00Z",
    "lastLogin": "2024-12-23T08:15:00Z"
  }
}
```

**Status Codes**
- `200` - Profile retrieved successfully
- `401` - Unauthorized (invalid token)
- `404` - User not found
- `500` - Server error

---

#### PUT /users/profile

Update the current user's profile.

**Authentication**: Required

**Request**

```http
PUT /api/users/profile
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Updated",
  "email": "newemail@example.com"
}
```

**Response**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "id": 1,
    "email": "newemail@example.com",
    "firstName": "John",
    "lastName": "Updated",
    "role": "user"
  }
}
```

**Status Codes**
- `200` - Profile updated successfully
- `400` - Validation error or email already in use
- `401` - Unauthorized
- `500` - Server error

---

#### GET /users (Admin Only)

List all users in the system.

**Authentication**: Required (Admin role)

**Request**

```http
GET /api/users
Authorization: Bearer <admin-jwt-token>
```

**Response**

```json
{
  "success": true,
  "users": [
    {
      "id": 1,
      "email": "user1@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "createdAt": "2024-01-15T10:30:00Z",
      "lastLogin": "2024-12-23T08:15:00Z"
    },
    {
      "id": 2,
      "email": "admin@example.com",
      "firstName": "Admin",
      "lastName": "User",
      "role": "admin",
      "createdAt": "2024-01-01T00:00:00Z",
      "lastLogin": "2024-12-23T14:00:00Z"
    }
  ],
  "total": 2
}
```

**Status Codes**
- `200` - Users retrieved successfully
- `401` - Unauthorized
- `403` - Forbidden (not an admin)
- `500` - Server error

---

#### DELETE /users/:id (Admin Only)

Delete a user from the system.

**Authentication**: Required (Admin role)

**Request**

```http
DELETE /api/users/2
Authorization: Bearer <admin-jwt-token>
```

**Response**

```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

**Status Codes**
- `200` - User deleted successfully
- `400` - Cannot delete own account
- `401` - Unauthorized
- `403` - Forbidden (not an admin)
- `404` - User not found
- `500` - Server error

---

### Platform Integration Endpoints

#### GET /virtuspace-access

Get access credentials for VirtuSpace platform.

**Authentication**: Required

**Request**

```http
GET /api/virtuspace-access
Authorization: Bearer <your-jwt-token>
```

**Response**

```json
{
  "virtuSpaceUrl": "http://localhost:3003",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "user"
  }
}
```

**Status Codes**
- `200` - Access credentials provided
- `401` - Unauthorized
- `500` - Server error

---

#### GET /health

Health check endpoint (no authentication required).

**Request**

```http
GET /api/health
```

**Response**

```json
{
  "status": "healthy",
  "service": "VirtuVerse API",
  "timestamp": "2024-12-23T14:30:00.000Z"
}
```

**Status Codes**
- `200` - Service is healthy

---

## Error Responses

All error responses follow a consistent format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### Common Error Codes

| Status Code | Description |
|-------------|-------------|
| 400 | Bad Request - Invalid input or validation error |
| 401 | Unauthorized - Missing or invalid authentication |
| 403 | Forbidden - Authenticated but not authorized |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 500 | Internal Server Error - Server-side error |

## Rate Limiting

*Currently not implemented, planned for future release*

Expected rate limits:
- **Authentication endpoints**: 5 requests per minute per IP
- **General API**: 100 requests per minute per authenticated user
- **Admin endpoints**: 200 requests per minute

## Versioning

The API is currently at version 1.0. Future versions will be accessible via URL path:

- v1: `/api/...` (current)
- v2: `/api/v2/...` (future)

## CORS

CORS is enabled for the configured frontend URL. Default development:
- `http://localhost:5000`

Production CORS must be configured via environment variables.

## Authentication Flow

### 1. Login Flow

```
Client                           Server
  |                                |
  |-- POST /auth/login ----------->|
  |   (email, password)            |
  |                                |
  |<-- JWT Token + User Info ------|
  |                                |
  |-- Store Token (localStorage) --|
```

### 2. Authenticated Request Flow

```
Client                           Server
  |                                |
  |-- GET /users/profile --------->|
  |   Authorization: Bearer <token>|
  |                                |
  |<-- Validate Token -------------|
  |                                |
  |<-- User Data ------------------|
```

### 3. Token Expiration Flow

```
Client                           Server
  |                                |
  |-- Request with expired token ->|
  |                                |
  |<-- 401 Unauthorized ----------|
  |                                |
  |-- Redirect to Login ---------->|
```

## Code Examples

### JavaScript/Node.js

```javascript
// Login
const login = async (email, password) => {
  const response = await fetch('http://localhost:5001/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  if (data.success) {
    localStorage.setItem('token', data.token);
    return data.user;
  }
  throw new Error(data.message);
};

// Authenticated request
const getProfile = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:5001/api/users/profile', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  return await response.json();
};
```

### Python

```python
import requests

# Login
def login(email, password):
    response = requests.post(
        'http://localhost:5001/api/auth/login',
        json={'email': email, 'password': password}
    )
    data = response.json()
    
    if data['success']:
        return data['token'], data['user']
    raise Exception(data['message'])

# Authenticated request
def get_profile(token):
    response = requests.get(
        'http://localhost:5001/api/users/profile',
        headers={'Authorization': f'Bearer {token}'}
    )
    return response.json()
```

### cURL

```bash
# Login
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"SecurePassword123!"}'

# Get Profile
curl -X GET http://localhost:5001/api/users/profile \
  -H "Authorization: Bearer <your-jwt-token>"
```

## Testing

Use the following test credentials in development:

```
Email: admin@virtuverse.com
Password: Admin@123
Role: admin
```

## WebSocket API (Future)

*Planned for future release*

Real-time updates will be available via WebSocket connection:

```javascript
const socket = io('http://localhost:5001', {
  auth: {
    token: 'your-jwt-token'
  }
});

socket.on('user-update', (data) => {
  console.log('User updated:', data);
});
```

---

**Last Updated**: December 2024  
**API Version**: 1.0.0
