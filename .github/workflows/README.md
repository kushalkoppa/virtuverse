# GitHub Workflows

This directory contains GitHub Actions workflows for the VirtuVerse project.

## CI/CD Pipeline (`ci-cd.yml`)

The main CI/CD pipeline automatically builds and tests all components of the VirtuVerse project whenever changes are pushed or pull requests are created.

### Workflow Overview

The pipeline consists of the following jobs:

1. **Detect Changes**: Automatically detects which components have changed to optimize build times
2. **Build Backend**: Builds backend/server/api components
3. **Build Frontend**: Builds frontend/client components  
4. **Build UI**: Builds UI components
5. **Integration Check**: Verifies all builds completed successfully

### Supported Project Structures

The workflow automatically detects and builds projects in the following directories:

- **Backend**: `backend/`, `server/`, `api/`
- **Frontend**: `frontend/`, `client/`
- **UI**: `ui/`

### Supported Technologies

The workflow supports multiple technology stacks:

#### Backend
- Node.js (with npm)
- Python (with pip/requirements.txt)
- Java (with Maven/pom.xml)

#### Frontend/UI
- Node.js-based frameworks (React, Vue, Angular, etc.)
- Automatic dependency installation via npm
- Build artifact generation and upload

### Triggers

The workflow runs on:
- Push to `main`, `master`, or `develop` branches
- Pull requests targeting `main`, `master`, or `develop` branches
- Manual trigger via workflow_dispatch

### Build Matrix

The workflow tests against multiple Node.js versions:
- Node.js 18.x
- Node.js 20.x

### Features

- **Automatic Detection**: Only builds components that exist in the repository
- **Parallel Builds**: Backend, frontend, and UI are built in parallel for faster execution
- **Multi-language Support**: Handles Node.js, Python, and Java projects
- **Artifact Upload**: Build outputs are saved as artifacts for deployment
- **Test Execution**: Automatically runs tests if available
- **Linting**: Runs linters if configured in the project
- **Graceful Failures**: Non-critical steps use `continue-on-error` to prevent blocking

### Directory Structure

To use this workflow, organize your project as follows:

```
virtuverse/
├── backend/           # Backend logic
│   ├── package.json   # For Node.js backend
│   └── ...
├── frontend/          # Frontend application
│   ├── package.json
│   └── ...
├── ui/                # UI components
│   ├── package.json
│   └── ...
└── .github/
    └── workflows/
        └── ci-cd.yml
```

### Customization

To customize the workflow for your specific needs:

1. **Add Build Steps**: Edit the workflow file to add technology-specific build steps
2. **Modify Test Commands**: Update the test execution commands for your testing framework
3. **Change Triggers**: Modify the `on:` section to change when the workflow runs
4. **Add Deployment**: Extend the workflow with deployment jobs after successful builds

### Expected Scripts in package.json

For Node.js projects, the workflow expects the following npm scripts:

- `build`: Build the project (required for frontend/UI)
- `test`: Run tests (optional)
- `lint`: Run linters (optional)

Example package.json scripts:
```json
{
  "scripts": {
    "build": "react-scripts build",
    "test": "jest",
    "lint": "eslint src/"
  }
}
```

### Status Badge

Add this badge to your README.md to show the workflow status:

```markdown
![CI/CD Pipeline](https://github.com/kushalkoppa/virtuverse/workflows/CI%2FCD%20Pipeline/badge.svg)
```

## Future Enhancements

Potential improvements to consider:

- Add deployment steps for staging/production
- Integrate with cloud platforms (AWS, Azure, GCP)
- Add security scanning (SAST, dependency checks)
- Implement code coverage reporting
- Add performance testing
- Set up Docker image building
- Configure notifications (Slack, email, etc.)
