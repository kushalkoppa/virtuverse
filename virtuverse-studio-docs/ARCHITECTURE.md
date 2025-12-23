# VirtuVerse Studio Architecture

## Overview

VirtuVerse Studio is built on a modern, microservices-inspired architecture with a clear separation between frontend and backend concerns. This document provides a comprehensive overview of the system architecture, component interactions, and design decisions.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Internet/Users                           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│               Frontend (React SPA)                           │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │   Login    │  │  Register  │  │  Dashboard │           │
│  └────────────┘  └────────────┘  └────────────┘           │
│         │                │               │                   │
│         └────────────────┴───────────────┘                  │
│                         │                                    │
│                  AuthContext                                 │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS/REST API
                         │
┌────────────────────────┴────────────────────────────────────┐
│              Backend (Express.js)                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              API Layer                                │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐    │  │
│  │  │Auth Routes │  │User Routes │  │Integration │    │  │
│  │  └────────────┘  └────────────┘  └────────────┘    │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Business Logic Layer                        │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐    │  │
│  │  │   Auth     │  │    User    │  │   Token    │    │  │
│  │  │  Service   │  │   Service  │  │  Service   │    │  │
│  │  └────────────┘  └────────────┘  └────────────┘    │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            Data Access Layer                          │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐    │  │
│  │  │   User     │  │  Password  │  │   Session  │    │  │
│  │  │   Model    │  │ Reset Model│  │   Model    │    │  │
│  │  └────────────┘  └────────────┘  └────────────┘    │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Database (SQLite/MongoDB)                       │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │   Users    │  │  Password  │  │  Sessions  │           │
│  │   Table    │  │   Resets   │  │   Table    │           │
│  └────────────┘  └────────────┘  └────────────┘           │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│          External Platform Integrations                      │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐           │
│  │ VirtuSpace │  │ VirtuSphere│  │ VirtuMind  │           │
│  └────────────┘  └────────────┘  └────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

## Component Details

### Frontend Layer

#### Technology Stack
- **React** 18.x - UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management

#### Key Components

**1. Authentication Context (`AuthContext.js`)**
```javascript
// Manages authentication state globally
- User session management
- Token storage and refresh
- Auto-logout on token expiration
```

**2. Pages**
- **Login** - User authentication
- **Register** - New user registration
- **Dashboard** - Main platform selection interface
- **ForgotPassword** - Password recovery

**3. Protected Routes**
- Validates JWT token before rendering
- Redirects to login if unauthenticated
- Maintains user session across navigation

### Backend Layer

#### Technology Stack
- **Node.js** - Runtime environment
- **Express.js** 4.x - Web framework
- **Better-sqlite3** - Database (development)
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **nodemailer** - Email service

#### API Architecture

**1. Routes Layer (`/routes`)**

```javascript
// Authentication Routes (/api/auth)
POST   /login          - User login
POST   /register       - User registration
POST   /forgot-password - Password reset request
POST   /reset-password  - Password reset execution
GET    /verify-token   - Token validation

// User Routes (/api/users)
GET    /profile        - Get user profile
PUT    /profile        - Update user profile
GET    /               - List all users (admin)
DELETE /:id           - Delete user (admin)
```

**2. Middleware Layer (`/middleware`)**

```javascript
// Authentication Middleware
authMiddleware(req, res, next)
  - Validates JWT token
  - Extracts user information
  - Attaches user to request object
  - Returns 401 if invalid

// Role-based Access Control
adminMiddleware(req, res, next)
  - Checks user role
  - Allows only admin users
  - Returns 403 if unauthorized
```

**3. Models Layer (`/models`)**

**User Model**
```javascript
{
  id: INTEGER PRIMARY KEY AUTOINCREMENT,
  email: TEXT UNIQUE NOT NULL,
  password: TEXT NOT NULL,  // bcrypt hashed
  firstName: TEXT,
  lastName: TEXT,
  role: TEXT DEFAULT 'user',  // 'user' or 'admin'
  createdAt: DATETIME DEFAULT CURRENT_TIMESTAMP,
  lastLogin: DATETIME
}
```

**PasswordReset Model**
```javascript
{
  id: INTEGER PRIMARY KEY AUTOINCREMENT,
  userId: INTEGER FOREIGN KEY,
  token: TEXT UNIQUE NOT NULL,
  expiresAt: DATETIME NOT NULL,
  used: BOOLEAN DEFAULT 0,
  createdAt: DATETIME DEFAULT CURRENT_TIMESTAMP
}
```

### Database Layer

#### SQLite (Development)
- Lightweight, file-based database
- Located at `backend/database/virtuverse.db`
- Automatically initialized on first run
- Schema migrations managed manually

#### MongoDB (Production - Optional)
- Document-based NoSQL database
- Better scalability for production
- Easily switchable via environment configuration

#### Schema Design

**Users Collection/Table**
- Primary entity for authentication
- Stores hashed passwords (bcrypt)
- Role-based access control fields
- Audit fields (createdAt, lastLogin)

**PasswordResets Collection/Table**
- Temporary tokens for password recovery
- Expiration mechanism (1 hour)
- Single-use tokens
- Garbage collection for expired tokens

## Data Flow

### Authentication Flow

```
1. User Login Request
   ↓
2. Frontend validates input
   ↓
3. POST /api/auth/login
   ↓
4. Backend validates credentials
   ↓
5. Hash password comparison (bcrypt)
   ↓
6. Generate JWT token (24h expiry)
   ↓
7. Return token + user info
   ↓
8. Frontend stores token (localStorage)
   ↓
9. Include token in subsequent requests
```

### Platform Access Flow

```
1. User authenticated in VirtuVerse Studio
   ↓
2. User selects platform (VirtuSpace/VirtuSphere/VirtuMind)
   ↓
3. Frontend requests platform access token
   ↓
4. Backend validates user session
   ↓
5. Generate platform-specific access token
   ↓
6. Return platform URL + access token
   ↓
7. Redirect user to platform with token
   ↓
8. Platform validates token with VirtuVerse Studio
   ↓
9. Platform grants access
```

### Password Reset Flow

```
1. User requests password reset
   ↓
2. POST /api/auth/forgot-password
   ↓
3. Generate unique reset token
   ↓
4. Store token with 1h expiration
   ↓
5. Send email with reset link
   ↓
6. User clicks link
   ↓
7. Frontend validates token
   ↓
8. User enters new password
   ↓
9. POST /api/auth/reset-password
   ↓
10. Validate token and expiry
   ↓
11. Hash new password
   ↓
12. Update user password
   ↓
13. Invalidate reset token
```

## Security Architecture

### Authentication Security

**1. Password Security**
- **Hashing**: bcrypt with salt rounds (10)
- **Validation**: Minimum 8 characters, complexity requirements
- **Storage**: Never store plaintext passwords
- **Transmission**: HTTPS only

**2. JWT Token Security**
- **Algorithm**: HS256 (HMAC SHA-256)
- **Expiry**: 24 hours (configurable)
- **Secret**: Environment-based, never committed
- **Payload**: Minimal user info (id, email, role)

**3. Session Management**
- **Token Storage**: localStorage (frontend)
- **Token Validation**: Every API request
- **Auto-logout**: On token expiration
- **Refresh**: Manual re-login required

### API Security

**1. CORS Protection**
```javascript
cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
})
```

**2. Input Validation**
- Express-validator middleware
- Sanitization of all inputs
- SQL injection prevention
- XSS attack prevention

**3. Rate Limiting** (Recommended)
```javascript
// To be implemented
rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})
```

### Database Security

**1. Connection Security**
- Parameterized queries (prepared statements)
- Input sanitization
- SQL injection prevention

**2. Data Encryption**
- Passwords: bcrypt hashing
- Sensitive data: AES-256 encryption (optional)
- Tokens: Securely generated random strings

## Scalability Considerations

### Horizontal Scaling

**Load Balancing**
```
                    Load Balancer
                         │
        ┌────────────────┼────────────────┐
        │                │                │
    Backend 1        Backend 2        Backend 3
        │                │                │
        └────────────────┴────────────────┘
                         │
                    Database Cluster
```

### Vertical Scaling

- Increase server resources (CPU, RAM)
- Optimize database queries
- Implement caching (Redis)
- CDN for static assets

### Microservices Migration Path

Future considerations for breaking into microservices:

1. **Auth Service** - Authentication and authorization
2. **User Service** - User management
3. **Integration Service** - Platform integrations
4. **Email Service** - Notification handling

## Monitoring and Logging

### Application Logs

```javascript
// Winston logger configuration
{
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
}
```

### Metrics to Monitor

- API response times
- Authentication success/failure rates
- Database query performance
- Memory and CPU usage
- Active user sessions

## Deployment Architecture

### Development Environment

```
Developer Machine
  ├── Frontend (localhost:5000)
  ├── Backend (localhost:5001)
  └── SQLite Database (file-based)
```

### Production Environment

```
Cloud Provider (Azure/AWS/GCP)
  ├── Frontend (Static hosting / CDN)
  ├── Backend (Container / VM)
  │   └── Multiple instances (Load balanced)
  ├── Database (Managed service)
  └── Cache (Redis - optional)
```

## Technology Decisions

### Why React?
- Component-based architecture
- Large ecosystem
- Virtual DOM for performance
- Strong community support

### Why Express.js?
- Lightweight and flexible
- Middleware architecture
- Wide adoption
- Easy to learn and maintain

### Why SQLite for Development?
- No setup required
- File-based (easy backup)
- Fast for small datasets
- Easy migration to other databases

### Why JWT?
- Stateless authentication
- Scales horizontally
- Works across domains
- Industry standard

## Future Enhancements

1. **OAuth Integration** - Google, Microsoft, GitHub login
2. **Two-Factor Authentication** - Enhanced security
3. **API Rate Limiting** - Prevent abuse
4. **Caching Layer** - Redis for session management
5. **WebSocket Support** - Real-time notifications
6. **GraphQL API** - Alternative to REST
7. **Microservices** - Service decomposition
8. **Kubernetes** - Container orchestration

---

**Last Updated**: December 2024  
**Version**: 1.0.0
