# Quick Start: CI/CD Pipeline

## 🚀 The GitHub workflow is ready and will automatically run when you push code!

### What It Does

The pipeline automatically:
- ✅ Detects changes in your code
- ✅ Builds backend components
- ✅ Builds frontend components  
- ✅ Builds UI components
- ✅ Runs tests
- ✅ Uploads build artifacts

### When It Runs

The workflow triggers on:
- Push to `main`, `master`, or `develop` branches
- Pull requests to these branches
- Manual trigger (workflow_dispatch)

### Directory Names the Workflow Looks For

| Component | Directory Names |
|-----------|----------------|
| Backend   | `backend/`, `server/`, `api/` |
| Frontend  | `frontend/`, `client/` |
| UI        | `ui/` |

### Minimum Setup Required

For **Node.js** projects, each component needs:
```
backend/
├── package.json    ← Required
└── src/
```

**Required in package.json:**
```json
{
  "scripts": {
    "build": "your-build-command"  // Required for frontend/UI
  }
}
```

### Quick Examples

#### Create a Node.js Backend
```bash
mkdir -p backend/src
cd backend
npm init -y
npm install express
# Add build script to package.json if needed
cd ..
```

#### Create a React Frontend
```bash
npx create-react-app frontend
cd frontend
# build script is already configured
cd ..
```

#### Create a UI Component Library
```bash
mkdir -p ui/src
cd ui
npm init -y
# Add build script to package.json
cd ..
```

### Push Your Code

```bash
git add .
git commit -m "Add project structure"
git push origin main
```

### Monitor Your Build

1. Go to your GitHub repository
2. Click on the **Actions** tab
3. Watch your workflow run!

### View Build Status

Add this badge to your README.md:

```markdown
![CI/CD Pipeline](https://github.com/kushalkoppa/virtuverse/workflows/CI%2FCD%20Pipeline/badge.svg)
```

### Supported Technologies

| Type | Languages/Frameworks |
|------|---------------------|
| Backend | Node.js, Python, Java (Maven) |
| Frontend | React, Vue, Angular, any Node.js framework |
| UI | Any Node.js-based UI library |

### Need Help?

- 📖 Read [Workflow Documentation](.github/workflows/README.md)
- 📐 See [Project Structure Guide](.github/PROJECT_STRUCTURE.md)
- 🐛 Check workflow logs in GitHub Actions tab
- ❓ Open an issue in the repository

## Next Steps

1. Create your project directories (backend, frontend, ui)
2. Initialize with package.json or requirements.txt
3. Add a build script
4. Push your code
5. Watch it build automatically! 🎉
