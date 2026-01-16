# VirtuVerse Architecture

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         VirtuVerse                               │
│                  (Authentication & Entry Point)                   │
│                                                                   │
│  Features:                                                        │
│  • User Registration & Login                                      │
│  • JWT Authentication                                             │
│  • Password Recovery                                              │
│  • Admin Management                                               │
│  • SQLite Database                                                │
│                                                                   │
│  Frontend (React): http://localhost:5000                         │
│  Backend (Express): http://localhost:5001                        │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ Authenticated Access
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                         VirtuSpace                               │
│                    (Integration Platform)                         │
│                                                                   │
│  Features:                                                        │
│  • Unified Dashboard                                              │
│  • Platform Integration                                           │
│  • Aggregated Stats                                               │
│  • Seamless Navigation                                            │
│                                                                   │
│  Frontend (React): http://localhost:3003 or 3005                 │
│  Backend (Express Proxy): http://localhost:3003                  │
└───────────┬─────────────────────────────┬───────────────────────┘
            │                             │
            │                             │
            ▼                             ▼
┌───────────────────────────┐  ┌──────────────────────────────────┐
│        EnviHub            │  │         PlantHub                  │
│  (Virtualization Tools)   │  │  (Manufacturing Tools)            │
│                           │  │                                   │
│  Features:                │  │  Features:                        │
│  • CarMaker Integration   │  │  • Plant Simulation               │
│  • Simulink Support       │  │  • Process Simulator              │
│  • Model Library          │  │  • Factory Planning               │
│  • Model Editor           │  │  • Production Optimizer           │
│  • Collaboration          │  │  • Manufacturing Models           │
│                           │  │                                   │
│  Frontend: localhost:3000 │  │  Frontend: localhost:3004         │
│  Backend: localhost:3001  │  │  Backend: localhost:3002          │
└───────────────────────────┘  └──────────────────────────────────┘
```

## Technology Stack

### Frontend
- **Framework**: React 18
- **Routing**: React Router 6
- **HTTP Client**: Axios
- **Build Tool**: Create React App
- **Styling**: CSS3

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Authentication**: JWT + bcryptjs
- **Database**: SQLite (development), PostgreSQL/MySQL (production)
- **Validation**: express-validator
- **CORS**: cors middleware

### Development Tools
- **Process Manager**: nodemon (development), PM2 (production)
- **Testing**: Jest, Supertest
- **Documentation**: Markdown

## Component Communication Flow

### 1. User Authentication Flow

```
User → VirtuVerse Frontend → VirtuVerse Backend API
                                      ↓
                              JWT Token Generated
                                      ↓
                              User Logged In
                                      ↓
                              Dashboard Access
```

### 2. VirtuSpace Access Flow

```
VirtuVerse Dashboard → "Launch VirtuSpace" Link
                              ↓
                    VirtuSpace Frontend Loads
                              ↓
            VirtuSpace Backend (Proxy Layer)
                    ↙               ↘
              EnviHub API      PlantHub API
```

### 3. API Proxy Flow

```
VirtuSpace Frontend
        ↓
VirtuSpace Backend (/api/envihub/*)
        ↓
EnviHub Backend (http://localhost:3001/api/*)
        ↓
Response → VirtuSpace → Frontend

VirtuSpace Frontend
        ↓
VirtuSpace Backend (/api/planthub/*)
        ↓
PlantHub Backend (http://localhost:3002/api/*)
        ↓
Response → VirtuSpace → Frontend
```

## Database Schema

### Users Table (VirtuVerse)

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME,
  is_active INTEGER DEFAULT 1
);
```

### Password Resets Table (VirtuVerse)

```sql
CREATE TABLE password_resets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  token TEXT NOT NULL,
  expires_at DATETIME NOT NULL,
  used INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## Port Allocation

| Service | Frontend | Backend | Cloud |
|---------|----------|---------|-------|
| VirtuVerse | 5000 | 5001 | Azure |
| VirtuSpace | 3005 | 3003 | Azure |
| EnviHub | 3000 | 3001 | Azure |
| PlantHub | 3004 | 3002 | Azure |
| VirtuSphere | Azure SWA | 3023 (8080 on GCP) | GCP |
| V-Analyzer | - | 3020 | GCP |
| V-DevContainers | - | 3030 | GCP |
| V-Orchestrator | 3011 | 3010 | Azure |

## Security Features

### Authentication
- JWT-based token authentication
- Bcrypt password hashing (10 rounds)
- Token expiration (7 days default)
- Secure cookie support (optional)

### Authorization
- Role-based access control (admin/user)
- Protected routes via middleware
- API endpoint protection

### Data Protection
- CORS configuration
- SQL injection prevention (parameterized queries)
- XSS protection (React escaping)
- HTTPS support (production)

## Scalability Considerations

### Horizontal Scaling
- Stateless backend services
- Load balancer support (Nginx)
- Session management via JWT (no server-side sessions)

### Vertical Scaling
- Efficient database queries
- Connection pooling
- Caching strategies (Redis optional)

### Database Migration
- SQLite for development
- PostgreSQL/MySQL for production
- Migration scripts available

## Deployment Architecture

### Development
```
Local Machine
├── VirtuVerse (Port 5000/5001)
├── VirtuSpace (Port 3003/3005)
├── EnviHub (Port 3000/3001)
├── PlantHub (Port 3004/3002)
└── VirtuSphere (Port 3021/3023)
    ├── V-Analyzer (Port 3020)
    └── V-DevContainers (Port 3030)
```

### Production (Hybrid Cloud)
```
Azure (Frontend + APIs)
├── VirtuVerse Studio Frontend (Azure Static Web Apps)
├── VirtuVerse Studio Backend (Azure VM/App Service)
├── VirtuSpace Frontend (Azure Static Web Apps)
└── VirtuSpace Backend (Azure VM/App Service)

GCP (VirtuSphere Backend Services)
└── VirtuSphere
    ├── VirtuSphere Backend API (App Engine/Cloud Run - Port 8080)
    │   └── API Gateway & Proxy
    ├── V-Analyzer Backend (Port 3020)
    │   └── Analytics & Dashboards
    └── V-DevContainers Backend (Port 3030)
        └── DevContainer Generation
```

### Production (Docker)
```
Docker Network
├── virtuverse-backend (Container)
├── virtuverse-frontend (Container)
├── virtuspace-backend (Container)
├── virtuspace-frontend (Container)
├── envihub-backend (Container)
├── envihub-frontend (Container)
├── planthub-backend (Container)
└── planthub-frontend (Container)
```

### Production (Traditional)
```
Server(s)
├── Nginx (Reverse Proxy & Load Balancer)
│   ├── virtuverse.example.com → VirtuVerse
│   ├── virtuspace.example.com → VirtuSpace
│   ├── envihub.example.com → EnviHub
│   └── planthub.example.com → PlantHub
└── PM2 (Process Manager)
    ├── VirtuVerse API
    ├── VirtuSpace API
    ├── EnviHub API
    └── PlantHub API
```

## API Endpoints

### VirtuVerse API (http://localhost:5001/api)

#### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password

#### Users (Admin only)
- `GET /users` - Get all users
- `PUT /users/:id/status` - Update user status

#### Health
- `GET /health` - Service health check

### VirtuSpace API (http://localhost:3003/api)

- `GET /health` - Service health check
- `GET /stats` - Aggregated stats from EnviHub and PlantHub
- `/envihub/*` - Proxy to EnviHub API
- `/planthub/*` - Proxy to PlantHub API

### EnviHub API (http://localhost:3001/api)

- `GET /health` - Service health check
- `GET /tools` - Get virtualization tools
- `GET /models` - Get simulation models
- `POST /models` - Create new model
- `GET /sharing` - Get shared models

### PlantHub API (http://localhost:3002/api)

- `GET /health` - Service health check
- `GET /plant-tools` - Get plant simulation tools
- `GET /plant-models` - Get plant models
- `POST /plant-models` - Create new plant model
- `GET /plant-sharing` - Get shared plant models

## File Structure

```
virtuverse/
├── VirtuVerse/                 # Main authentication app
│   ├── backend/
│   │   ├── config/            # Database configuration
│   │   ├── models/            # User and PasswordReset models
│   │   ├── routes/            # Auth and user routes
│   │   ├── middleware/        # Authentication middleware
│   │   ├── scripts/           # Admin init script
│   │   └── server.js          # Express server
│   └── frontend/
│       └── src/
│           ├── components/    # AuthContext
│           ├── pages/         # Login, Register, Dashboard, ForgotPassword
│           └── App.js
├── VirtuSpace/                # Integration platform
│   ├── backend/
│   │   └── server.js         # Proxy server
│   └── frontend/
│       └── src/
│           ├── components/   # Dashboard, Frames
│           └── App.js
├── EnviHub/                   # Virtualization tools
│   ├── backend/
│   │   ├── routes/          # Tool, Model, Sharing routes
│   │   └── server.js
│   └── frontend/
│       └── src/
│           ├── components/  # Dashboard, Tools, Models, Editor, Sharing
│           └── App.js
├── PlantHub/                  # Manufacturing tools
│   ├── backend/
│   │   ├── routes/          # Plant tool, model, sharing routes
│   │   └── server.js
│   └── frontend/
│       └── src/
│           ├── components/  # Dashboard, Tools, Models, Editor, Sharing
│           └── App.js
├── start-all.sh              # Quick start script
├── stop-all.sh               # Stop all services
├── GETTING_STARTED.md        # Getting started guide
├── DEPLOYMENT.md             # Deployment guide
└── README.md                 # Main documentation
```

## Environment Variables

### VirtuVerse
- `PORT`: Backend API port (default: 5001)
- `JWT_SECRET`: Secret for JWT signing
- `JWT_EXPIRE`: Token expiration time (default: 7d)
- `DB_PATH`: SQLite database path
- `FRONTEND_URL`: Frontend URL for CORS
- `VIRTUSPACE_URL`: VirtuSpace URL

### VirtuSpace
- `PORT`: Backend port (default: 3003)
- `ENVIHUB_API_URL`: EnviHub API URL
- `PLANTHUB_API_URL`: PlantHub API URL

### EnviHub
- `PORT`: Backend port (default: 3001)

### PlantHub
- `PORT`: Backend port (default: 3002)

### VirtuSphere (GCP Backend)
- `PORT`: Backend port (default: 3023, 8080 on GCP)
- `NODE_ENV`: Environment (production recommended)
- `V_ANALYZER_API_URL`: V-Analyzer backend URL
- `V_DEVCONTAINERS_API_URL`: V-DevContainers backend URL
- `ALLOWED_ORIGINS`: Comma-separated list of allowed origins for CORS

## Hybrid Cloud Architecture

VirtuSphere is deployed in a hybrid cloud configuration:

### Why Hybrid Cloud?

1. **Azure**: Hosts VirtuVerse Studio (authentication & main UI) and VirtuSpace (simulation platform)
2. **GCP**: Hosts VirtuSphere backend services (analytics & DevContainer generation)
3. **Benefits**:
   - Leverage best features of each cloud provider
   - Separation of concerns between platforms
   - Independent scaling of analytics services
   - Cost optimization by choosing optimal cloud for each workload

### Communication Flow

```
User → Azure (VirtuVerse Studio) → Click VirtuSphere Icon
  → Opens: REACT_APP_VIRTUSPHERE_URL (pointing to GCP)
    → GCP VirtuSphere Backend (API Gateway)
      → Proxies to V-Analyzer Backend
      → Proxies to V-DevContainers Backend
```

### CORS Configuration

For hybrid cloud deployment, ensure proper CORS settings:

**VirtuSphere Backend (.env or GCP environment)**:
```
ALLOWED_ORIGINS=https://your-azure-frontend.azurestaticapps.net
```

**VirtuVerse Studio Frontend (.env)**:
```
REACT_APP_VIRTUSPHERE_URL=https://your-gcp-project.appspot.com
```

### Deployment Documentation

- **VirtuSphere GCP Deployment**: See [VirtuSphere/GCP_DEPLOYMENT.md](VirtuSphere/GCP_DEPLOYMENT.md)
- **Azure Deployment**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Integration Summary**: See [VirtuSphere/INTEGRATION_SUMMARY.md](VirtuSphere/INTEGRATION_SUMMARY.md)

## Future Enhancements

1. **Email Integration**: Real email sending for password reset
2. **OAuth Support**: Google, Microsoft, GitHub authentication
3. **Real-time Collaboration**: WebSocket support
4. **Mobile Apps**: React Native applications
5. **Advanced Analytics**: Usage tracking and reporting
6. **API Gateway**: Centralized API management
7. **Microservices**: Further service decomposition
8. **Kubernetes**: Container orchestration
9. **CI/CD**: Automated testing and deployment
10. **Monitoring**: APM and logging services
