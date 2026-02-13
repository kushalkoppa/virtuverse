# VirtuVerse-Studio Backend Setup

This guide explains how to set up and run the VirtuVerse-Studio backend authentication service.

## Prerequisites

- Node.js v14 or higher (v18 or v20 recommended)
- npm or yarn
- SQLite (included with better-sqlite3)

## Quick Setup

Run the automated setup script:

```bash
cd VirtuVerse-Studio
./setup-backend.sh
```

This script will:
1. Create the database directory
2. Copy `.env.example` to `.env`
3. Install all dependencies
4. Initialize the admin user

## Manual Setup

If you prefer to set up manually:

### 1. Create Database Directory

```bash
mkdir -p backend/database
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Then edit `.env` and update the following:
- `JWT_SECRET` - Change to a secure random string in production
- `PORT` - Backend server port (default: 5001)
- Other optional settings as needed

### 3. Install Dependencies

```bash
npm install
```

### 4. Initialize Admin User

```bash
npm run init-admin
```

This creates an admin user with the credentials from your `.env` file:
- Email: `admin@virtuverse.com` (default)
- Password: `Admin@123` (default)

**⚠️ IMPORTANT:** Change these credentials after first login in production!

## Running the Backend

### Development Mode

```bash
npm run dev:backend
```

This runs the backend with nodemon for auto-reload on file changes.

### Production Mode

```bash
npm start
```

The backend will start on port 5001 (or the port specified in `.env`).

## Testing the Backend

### Health Check

```bash
curl http://localhost:5001/api/health
```

### Login Test

```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@virtuverse.com", "password": "Admin@123"}'
```

You should receive a JWT token in the response.

### User Info (with token)

```bash
curl http://localhost:5001/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## API Endpoints

### Public Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token
- `GET /api/health` - Health check

### Protected Endpoints (require JWT token)

- `GET /api/auth/me` - Get current user info
- `GET /api/virtuspace-access` - Get VirtuSpace access URL
- `GET /api/integrations/status` - Get integration status
- `GET /api/users` - List all users (admin only)
- `PUT /api/users/:id/status` - Update user status (admin only)

## Database

The backend uses SQLite with the `better-sqlite3` library. The database file is stored at:

```
backend/database/virtuverse.db
```

### Database Schema

**users table:**
- `id` - Auto-increment primary key
- `email` - Unique email address
- `password` - Bcrypt hashed password
- `name` - User's full name
- `role` - User role (`user` or `admin`)
- `is_active` - Account active status (1 or 0)
- `created_at` - Account creation timestamp
- `updated_at` - Last update timestamp
- `last_login` - Last login timestamp

**password_resets table:**
- `id` - Auto-increment primary key
- `user_id` - Foreign key to users table
- `token` - Reset token
- `expires_at` - Token expiration time
- `used` - Whether token has been used
- `created_at` - Token creation timestamp

## Troubleshooting

### Issue: "Cannot find module 'better-sqlite3'"

**Solution:** Run `npm install` to install dependencies.

### Issue: "Error: SQLITE_CANTOPEN: unable to open database file"

**Solution:** The database directory doesn't exist. Run:
```bash
mkdir -p backend/database
```

### Issue: "Login fails with 'Invalid credentials'"

**Solutions:**
1. Check that the admin user was initialized: `npm run init-admin`
2. Verify credentials in `.env` file
3. Check backend logs for errors

### Issue: "JWT malformed" or authentication errors

**Solution:** Ensure `JWT_SECRET` is set in `.env` file.

### Issue: "CORS errors" in browser

**Solution:** Update `FRONTEND_URL` in `.env` to match your frontend URL.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Backend server port | 5001 |
| `NODE_ENV` | Environment mode | development |
| `JWT_SECRET` | Secret key for JWT signing | (required) |
| `JWT_EXPIRE` | JWT token expiration | 7d |
| `DB_PATH` | SQLite database path | ./backend/database/virtuverse.db |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:5000 |
| `VIRTUSPACE_URL` | VirtuSpace URL | http://localhost:3003 |
| `ADMIN_EMAIL` | Initial admin email | admin@virtuverse.com |
| `ADMIN_PASSWORD` | Initial admin password | Admin@123 |
| `ADMIN_NAME` | Initial admin name | Admin User |

## Security Notes

1. **Change Default Credentials:** Always change the default admin password after first login.
2. **JWT_SECRET:** Use a strong, random secret in production (32+ characters).
3. **HTTPS:** Use HTTPS in production with proper SSL/TLS certificates.
4. **Environment Variables:** Never commit `.env` file to version control.
5. **Database Backups:** Regularly backup the SQLite database file.
6. **Rate Limiting:** Consider adding rate limiting for production deployments.

## NPM Scripts

- `npm start` - Start the backend server
- `npm run dev` - Run both backend and frontend in development mode
- `npm run dev:backend` - Run backend with nodemon
- `npm run dev:frontend` - Run frontend development server
- `npm run init-admin` - Initialize admin user
- `npm run build` - Build frontend for production
- `npm test` - Run tests

## Next Steps

After setting up the backend:

1. **Start the Frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   ```

2. **Access the Application:**
   - Frontend: http://localhost:5000
   - Backend API: http://localhost:5001

3. **Login:**
   - Use the admin credentials to login
   - Access VirtuSpace, VirtuSphere, and VirtuMind platforms

## Support

For issues or questions:
- Check the main [README.md](../README.md)
- Review [GETTING_STARTED.md](../GETTING_STARTED.md)
- Check backend logs in `logs/virtuverse-backend.log`
