# VirtuVerse Studio Development Guide

## Table of Contents

1. [Development Environment Setup](#development-environment-setup)
2. [Project Structure](#project-structure)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Testing](#testing)
6. [Debugging](#debugging)
7. [Common Tasks](#common-tasks)

## Development Environment Setup

### Prerequisites

Install the following tools:

- **Node.js**: v14.x or higher (v18.x recommended)
- **npm**: v6.x or higher (comes with Node.js)
- **Git**: Latest version
- **Code Editor**: VS Code (recommended) with extensions:
  - ESLint
  - Prettier
  - ES7+ React/Redux/React-Native snippets
  - Thunder Client (for API testing)

### Initial Setup

1. **Clone the Repository**

```bash
git clone https://github.com/kushalkoppa/virtuverse.git
cd virtuverse/VirtuVerse-Studio
```

2. **Install Backend Dependencies**

```bash
npm install
```

3. **Install Frontend Dependencies**

```bash
cd frontend
npm install
cd ..
```

4. **Set Up Environment Variables**

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:5000

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=24h

# Database Configuration
DB_PATH=./backend/database/virtuverse.db

# Email Configuration (for password reset)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-email-password
EMAIL_FROM=noreply@virtuverse.com

# Platform URLs
VIRTUSPACE_URL=http://localhost:3003
VIRTUSPHERE_URL=http://localhost:3004
VIRTUMIND_URL=http://localhost:3005
```

5. **Initialize Database with Admin User**

```bash
npm run init-admin
```

This creates an admin user:
- Email: `admin@virtuverse.com`
- Password: `Admin@123`

6. **Start Development Server**

```bash
npm run dev
```

This starts both backend (port 5001) and frontend (port 5000).

### VS Code Configuration

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "javascript.preferences.quoteStyle": "single",
  "typescript.preferences.quoteStyle": "single"
}
```

## Project Structure

```
VirtuVerse-Studio/
├── backend/                 # Backend application
│   ├── config/             # Configuration files
│   │   └── database.js     # Database setup
│   ├── middleware/         # Express middleware
│   │   └── auth.js         # Authentication middleware
│   ├── models/             # Data models
│   │   ├── User.js         # User model
│   │   └── PasswordReset.js # Password reset model
│   ├── routes/             # API routes
│   │   ├── auth.js         # Auth endpoints
│   │   └── users.js        # User endpoints
│   ├── scripts/            # Utility scripts
│   │   └── initAdmin.js    # Admin initialization
│   ├── database/           # SQLite database files
│   └── server.js           # Main server file
├── frontend/               # Frontend application
│   ├── public/             # Static files
│   ├── src/                # Source code
│   │   ├── components/     # React components
│   │   │   └── AuthContext.js # Auth context
│   │   ├── pages/          # Page components
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   └── ForgotPassword.js
│   │   ├── App.js          # Main app component
│   │   ├── index.js        # Entry point
│   │   └── config.js       # Frontend config
│   └── package.json        # Frontend dependencies
├── docs/                   # Documentation
├── .env.example            # Example environment file
├── .gitignore              # Git ignore rules
├── package.json            # Backend dependencies
└── README.md               # Project readme
```

## Development Workflow

### Git Workflow

1. **Create Feature Branch**

```bash
git checkout -b feature/your-feature-name
```

2. **Make Changes**
   - Write code
   - Test locally
   - Commit frequently

3. **Commit Changes**

```bash
git add .
git commit -m "feat: add user profile update functionality"
```

**Commit Message Format:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test changes
- `chore:` Build/config changes

4. **Push to Remote**

```bash
git push origin feature/your-feature-name
```

5. **Create Pull Request**
   - Open PR on GitHub
   - Request review
   - Address feedback
   - Merge when approved

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- backend/routes/auth.test.js

# Run with coverage
npm test -- --coverage
```

### Linting and Formatting

```bash
# Run ESLint
npm run lint

# Fix lint issues automatically
npm run lint:fix

# Format code with Prettier
npm run format
```

## Coding Standards

### JavaScript/Node.js

**Naming Conventions:**
- `camelCase` for variables and functions
- `PascalCase` for classes and components
- `UPPER_SNAKE_CASE` for constants
- Descriptive names (avoid single letters except loops)

**Example:**

```javascript
// Good
const userEmail = 'user@example.com';
const getUserProfile = () => { /* ... */ };
class UserService { /* ... */ }
const MAX_LOGIN_ATTEMPTS = 5;

// Bad
const e = 'user@example.com';
const x = () => { /* ... */ };
class userservice { /* ... */ }
const maxLoginAttempts = 5;
```

**Code Style:**
- Use `const` by default, `let` when reassignment needed
- Never use `var`
- Use arrow functions for callbacks
- Use template literals for string interpolation
- Always use semicolons
- Single quotes for strings

**Example:**

```javascript
// Good
const greet = (name) => {
  return `Hello, ${name}!`;
};

// Bad
var greet = function(name) {
  return "Hello, " + name + "!"
}
```

### React/JSX

**Component Structure:**

```javascript
import React, { useState, useEffect } from 'react';

const MyComponent = ({ prop1, prop2 }) => {
  // State
  const [state, setState] = useState(initial);
  
  // Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  // Handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default MyComponent;
```

**Best Practices:**
- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic to custom hooks
- Use prop-types or TypeScript for type checking

### API Development

**Route Structure:**

```javascript
router.post('/endpoint', [
  // Validation middleware
  body('field').notEmpty().withMessage('Field is required'),
], async (req, res) => {
  try {
    // Validate
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }
    
    // Business logic
    const result = await someOperation();
    
    // Success response
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    // Error handling
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});
```

## Testing

### Unit Tests

**Backend Test Example:**

```javascript
const request = require('supertest');
const app = require('../server');

describe('Auth API', () => {
  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'Password123!'
        });
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.token).toBeDefined();
    });
    
    it('should reject invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        });
      
      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });
});
```

**Frontend Test Example:**

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
  it('renders login form', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
  
  it('submits form with valid data', async () => {
    const mockLogin = jest.fn();
    render(<Login onLogin={mockLogin} />);
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'Password123!' }
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'Password123!');
  });
});
```

## Debugging

### Backend Debugging

**Using Node Inspector:**

```bash
# Start with debugging enabled
node --inspect backend/server.js

# Or with nodemon
nodemon --inspect backend/server.js
```

**VS Code Debug Configuration** (`.vscode/launch.json`):

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Backend",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/backend/server.js",
      "env": {
        "NODE_ENV": "development"
      }
    }
  ]
}
```

**Console Logging:**

```javascript
// Use appropriate log levels
console.log('Info message');
console.error('Error message');
console.warn('Warning message');
console.debug('Debug message');

// Use structured logging
console.log('User login attempt', { 
  email, 
  timestamp: new Date() 
});
```

### Frontend Debugging

**React DevTools:**
- Install React Developer Tools browser extension
- Inspect component hierarchy
- View props and state
- Track component re-renders

**Console Logging:**

```javascript
// Log render cycles
useEffect(() => {
  console.log('Component mounted/updated', { props, state });
}, [props, state]);

// Log event handlers
const handleClick = () => {
  console.log('Button clicked', event);
  // Handler logic
};
```

## Common Tasks

### Adding a New API Endpoint

1. **Define Route** in `backend/routes/`:

```javascript
router.post('/new-endpoint', authMiddleware, async (req, res) => {
  // Implementation
});
```

2. **Add Validation** using express-validator

3. **Implement Business Logic**

4. **Write Tests**

5. **Update API Documentation**

### Adding a New Page

1. **Create Component** in `frontend/src/pages/`:

```javascript
const NewPage = () => {
  return <div>New Page</div>;
};
export default NewPage;
```

2. **Add Route** in `App.js`:

```javascript
<Route path="/new-page" element={<NewPage />} />
```

3. **Update Navigation** if needed

4. **Write Tests**

### Database Migrations

For schema changes:

1. **Backup Database**

```bash
cp backend/database/virtuverse.db backend/database/virtuverse.db.backup
```

2. **Write Migration Script** in `backend/scripts/migrations/`:

```javascript
const db = require('../config/database');

db.exec(`
  ALTER TABLE users ADD COLUMN new_field TEXT;
`);
```

3. **Test Migration** on development database

4. **Document Changes** in migration notes

### Updating Dependencies

```bash
# Check outdated packages
npm outdated

# Update specific package
npm update package-name

# Update all packages (carefully!)
npm update

# Check for security vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

---

**Last Updated**: December 2024  
**Version**: 1.0.0
