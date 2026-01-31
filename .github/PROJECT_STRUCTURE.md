# VirtuVerse Project Structure Guide

This guide explains how to structure your VirtuVerse project to work with the automated CI/CD pipeline.

## Recommended Directory Structure

```
virtuverse/
├── .github/
│   └── workflows/
│       ├── ci-cd.yml          # Main CI/CD pipeline
│       └── README.md          # Workflow documentation
│
├── backend/                   # Backend/Server logic
│   ├── package.json          # Node.js dependencies (if using Node.js)
│   ├── requirements.txt      # Python dependencies (if using Python)
│   ├── pom.xml              # Java/Maven dependencies (if using Java)
│   ├── src/                 # Source code
│   ├── tests/               # Backend tests
│   └── README.md            # Backend documentation
│
├── frontend/                 # Frontend application
│   ├── package.json         # Dependencies
│   ├── src/                 # Source code
│   │   ├── components/      # React/Vue components
│   │   ├── pages/           # Application pages
│   │   ├── services/        # API services
│   │   └── utils/           # Utility functions
│   ├── public/              # Static assets
│   ├── tests/               # Frontend tests
│   └── README.md            # Frontend documentation
│
├── ui/                       # UI component library
│   ├── package.json         # Dependencies
│   ├── src/                 # UI components
│   │   ├── components/      # Reusable UI components
│   │   ├── styles/          # Global styles
│   │   └── themes/          # Theme configurations
│   ├── tests/               # UI component tests
│   ├── storybook/           # Storybook configuration (optional)
│   └── README.md            # UI documentation
│
├── docs/                     # Project documentation
├── .gitignore               # Git ignore rules
└── README.md                # Main project README
```

## Component Guidelines

### Backend (backend/, server/, or api/)

The backend component handles server-side logic, API endpoints, and data processing.

**For Node.js Backend:**
```json
{
  "name": "virtuverse-backend",
  "version": "1.0.0",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "build": "tsc",
    "test": "jest",
    "lint": "eslint src/"
  }
}
```

**For Python Backend:**
```txt
# requirements.txt
flask>=2.0.0
fastapi>=0.68.0
pytest>=7.0.0
```

### Frontend (frontend/ or client/)

The frontend component is the main user-facing application.

**Sample package.json:**
```json
{
  "name": "virtuverse-frontend",
  "version": "1.0.0",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "lint": "eslint src/",
    "eject": "react-scripts eject"
  },
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

### UI (ui/)

The UI component contains reusable UI components and design system elements.

**Sample package.json:**
```json
{
  "name": "virtuverse-ui",
  "version": "1.0.0",
  "scripts": {
    "build": "rollup -c",
    "test": "jest",
    "lint": "eslint src/",
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook"
  }
}
```

## Getting Started

### 1. Create Your Project Structure

Choose one or more components based on your needs:

```bash
# Create backend
mkdir -p backend/src backend/tests

# Create frontend
mkdir -p frontend/src frontend/public frontend/tests

# Create UI library
mkdir -p ui/src ui/tests
```

### 2. Initialize Your Projects

**For Node.js projects:**
```bash
cd backend && npm init -y
cd ../frontend && npm init -y
cd ../ui && npm init -y
```

**For Python backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install flask pytest
pip freeze > requirements.txt
```

### 3. Add Required Scripts

Ensure your package.json files include the `build` script (required) and optionally `test` and `lint` scripts.

### 4. Commit Your Code

```bash
git add .
git commit -m "Initial project structure"
git push
```

The CI/CD pipeline will automatically detect and build your components!

## CI/CD Workflow Behavior

### Automatic Detection

The workflow automatically detects which components exist in your repository:

- **Backend detected** if files exist in `backend/`, `server/`, or `api/`
- **Frontend detected** if files exist in `frontend/` or `client/`
- **UI detected** if files exist in `ui/`

### Build Process

For each detected component:

1. **Setup**: Install required runtimes (Node.js, Python, Java)
2. **Dependencies**: Install project dependencies
3. **Lint**: Run linting if configured
4. **Build**: Execute build scripts
5. **Test**: Run tests if configured
6. **Artifacts**: Upload build outputs

### Parallel Execution

All components are built in parallel to minimize CI time. The workflow includes an integration check at the end to ensure all builds succeeded.

## Examples

### Example 1: Full Stack Node.js Application

```
virtuverse/
├── backend/
│   ├── package.json (with Express.js)
│   └── src/
├── frontend/
│   ├── package.json (with React)
│   └── src/
└── .github/workflows/ci-cd.yml
```

### Example 2: Python Backend + React Frontend

```
virtuverse/
├── backend/
│   ├── requirements.txt (with Flask/FastAPI)
│   └── src/
├── frontend/
│   ├── package.json (with React)
│   └── src/
└── .github/workflows/ci-cd.yml
```

### Example 3: Microservices Architecture

```
virtuverse/
├── api/
│   ├── package.json (Node.js API Gateway)
│   └── src/
├── server/
│   ├── pom.xml (Java Microservice)
│   └── src/
├── frontend/
│   ├── package.json (React App)
│   └── src/
└── .github/workflows/ci-cd.yml
```

## Best Practices

1. **Keep Dependencies Updated**: Regularly update your dependencies
2. **Write Tests**: Add comprehensive test coverage for all components
3. **Use Linting**: Configure ESLint, Pylint, or other linters
4. **Document**: Maintain README files for each component
5. **Follow Conventions**: Use consistent naming and structure
6. **Environment Variables**: Use `.env` files (not committed) for secrets
7. **Build Optimization**: Optimize build times by caching dependencies

## Troubleshooting

### Build Fails

- Check the GitHub Actions logs for specific error messages
- Ensure all dependencies are listed in package.json or requirements.txt
- Verify build scripts are properly configured

### Tests Fail

- Run tests locally before pushing
- Ensure test configuration is correct
- Check for environment-specific issues

### Workflow Not Triggering

- Verify you're pushing to the correct branch (main, master, or develop)
- Check that the workflow file is in `.github/workflows/`
- Ensure YAML syntax is valid

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [React Documentation](https://react.dev/)
- [Python Packaging Guide](https://packaging.python.org/)

## Support

For issues or questions about the CI/CD pipeline, please open an issue in the repository.
