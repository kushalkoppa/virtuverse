# Testing Guide for Updated Workflows

This guide helps you test the updated workflow files to ensure everything works correctly.

## Pre-Testing Checklist

Before testing, verify:
- [ ] All workflow files are present in `.github/workflows/`
- [ ] YAML syntax is valid (already validated ✓)
- [ ] Security permissions are configured (CodeQL passed ✓)
- [ ] Documentation files are created

## Test Scenarios

### Test 1: GitHub-Hosted Runner (No Setup Required)

This test verifies workflows work with GitHub's hosted runners.

#### Option A: Push to Branch
```bash
# Make a small change to trigger workflows
echo "test" >> README.md
git add README.md
git commit -m "Test workflow trigger"
git push
```

#### Option B: Manual Trigger
1. Go to https://github.com/kushalkoppa/virtuverse/actions
2. Select **Full Pipeline CI/CD** workflow
3. Click **Run workflow**
4. Select branch: `copilot/update-workflow-yml-files` or `main`
5. Select runner type: `ubuntu-latest`
6. Click **Run workflow**

**Expected Result**:
- Workflow starts and runs on GitHub-hosted runner
- All jobs complete successfully
- Build artifacts are created
- No errors related to package-lock.json or npm ci

### Test 2: Workflow Dispatch Feature

Test manual workflow execution with different configurations.

#### Steps:
1. Go to https://github.com/kushalkoppa/virtuverse/actions
2. Select any workflow (e.g., **Main CI/CD Pipeline**)
3. Click **Run workflow**
4. You should see:
   - Branch dropdown
   - Runner type dropdown (ubuntu-latest or self-hosted)
5. Select options and run

**Expected Result**:
- Workflow dropdown shows runner type selection
- Workflow runs with selected configuration
- Job logs show correct runner type

### Test 3: Path-Based Triggers

Test that workflows only run when relevant paths change.

#### For VirtuSpace Frontend:
```bash
# Make a change to VirtuSpace frontend
echo "// test" >> VirtuSpace/frontend/src/App.jsx
git add VirtuSpace/frontend/src/App.jsx
git commit -m "Test frontend workflow trigger"
git push
```

**Expected Result**:
- **Main CI/CD Pipeline** workflow triggers
- **Full Pipeline CI/CD** workflow triggers
- Other path-specific workflows do NOT trigger

#### For EnviHub:
```bash
# Make a change to EnviHub
echo "// test" >> VirtuSpace/EnviHub/frontend/src/App.jsx
git add VirtuSpace/EnviHub/frontend/src/App.jsx
git commit -m "Test EnviHub workflow trigger"
git push
```

**Expected Result**:
- **EnviHub CI/CD Pipeline** workflow triggers
- **Full Pipeline CI/CD** workflow triggers
- Other workflows do NOT trigger

### Test 4: Azure VM Self-Hosted Runner (Requires Setup)

⚠️ **Prerequisites**: Complete Azure VM runner setup from [AZURE_RUNNER_SETUP.md](AZURE_RUNNER_SETUP.md)

#### Step 1: Verify Runner is Online
1. Go to https://github.com/kushalkoppa/virtuverse/settings/actions/runners
2. Verify your runner shows as "Idle" (green circle)
3. Check runner labels include: `self-hosted`, `Linux`, `X64`

#### Step 2: Manual Deployment Test
1. Go to https://github.com/kushalkoppa/virtuverse/actions
2. Select **Azure VM Deployment** workflow
3. Click **Run workflow**
4. Configure:
   - Branch: `main` or your test branch
   - Runner type: `self-hosted`
   - Deploy target: `virtuspace-frontend` (start small)
5. Click **Run workflow**

**Expected Result**:
- Workflow picks up your self-hosted runner
- Build runs on your Azure VM
- Artifacts are deployed to `/opt/virtuverse/deployments/`
- Deployment summary shows success

#### Step 3: Verify Deployment on VM
SSH into your Azure VM and check:

```bash
# Check deployment directory
ls -la /opt/virtuverse/deployments/

# Check for frontend build files
ls -la /opt/virtuverse/deployments/frontend/

# Check runner logs
cd ~/actions-runner
tail -f _diag/*.log
```

**Expected Result**:
- Deployment directory exists
- Build artifacts are present
- Runner logs show successful job execution

#### Step 4: Full Deployment Test
Repeat Test 2 with:
- Deploy target: `all`
- Verify all platforms deploy successfully

### Test 5: Docker Build (Optional)

Test Docker image building capability.

1. Go to Actions → **Full Pipeline CI/CD**
2. Run workflow with `ubuntu-latest` runner
3. Check that **Docker Build Test** job runs

**Expected Result**:
- Docker images build successfully (or skip if frontend/backend fails)
- No Docker-related errors

## Verification Steps

After each test, verify:

### 1. Workflow Execution
- [ ] Workflow started successfully
- [ ] Correct runner type was used
- [ ] All jobs completed (or failed with expected errors)
- [ ] Logs are readable and informative

### 2. Build Artifacts
- [ ] Artifacts are uploaded (if job succeeded)
- [ ] Artifact names are correct
- [ ] Artifacts can be downloaded

### 3. Deployment (Self-Hosted Only)
- [ ] Files deployed to correct directory
- [ ] Permissions are correct
- [ ] Health checks passed

### 4. Error Handling
- [ ] No package-lock.json errors
- [ ] No npm ci errors
- [ ] Failures are graceful (continue-on-error where appropriate)

## Common Issues and Solutions

### Issue 1: Workflow Not Triggering
**Symptoms**: Push doesn't trigger workflow

**Solutions**:
- Check path filters in workflow file
- Verify branch name matches trigger configuration
- Check if workflow file has syntax errors

### Issue 2: Self-Hosted Runner Not Picking Up Jobs
**Symptoms**: Job stays in "Queued" state

**Solutions**:
```bash
# Check runner status
cd ~/actions-runner
sudo ./svc.sh status

# Restart runner
sudo ./svc.sh restart

# Check runner logs
tail -f _diag/*.log
```

### Issue 3: Permission Denied on Deployment
**Symptoms**: Deployment fails with permission errors

**Solutions**:
```bash
# Fix deployment directory permissions
sudo chown -R $USER:$USER /opt/virtuverse
chmod -R 755 /opt/virtuverse
```

### Issue 4: Node.js Not Found
**Symptoms**: "node: command not found" error

**Solutions**:
```bash
# Verify Node.js installation
node --version

# Reinstall if needed
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Success Criteria

Your testing is successful when:

✅ **GitHub-Hosted Runner Tests**:
- [ ] Workflows trigger automatically on push
- [ ] Manual workflow dispatch works
- [ ] Builds complete without package-lock.json errors
- [ ] Artifacts are created and downloadable
- [ ] Path filters work correctly

✅ **Self-Hosted Runner Tests** (if configured):
- [ ] Runner shows as online in GitHub
- [ ] Workflows can select self-hosted runner
- [ ] Jobs run on Azure VM
- [ ] Artifacts deploy to VM correctly
- [ ] Deployment directory permissions are correct

✅ **Security**:
- [ ] No CodeQL security alerts
- [ ] Permissions are properly limited
- [ ] No secrets in logs

## Next Steps After Successful Testing

1. **Merge to Main**: Once all tests pass, merge the PR to main branch
2. **Configure Deployment**: Set up your application deployment scripts
3. **Set Up Monitoring**: Configure logging and monitoring on Azure VM
4. **Document Custom Steps**: Add any project-specific deployment steps
5. **Set Up Reverse Proxy**: Configure nginx/Apache if serving web applications

## Getting Help

If you encounter issues:

1. **Check workflow logs**: Actions tab → Select run → Click on failed job
2. **Check runner logs**: SSH to VM → `cd ~/actions-runner` → `tail -f _diag/*.log`
3. **Review documentation**:
   - [AZURE_RUNNER_SETUP.md](AZURE_RUNNER_SETUP.md) - Runner setup
   - [WORKFLOW_UPDATES.md](WORKFLOW_UPDATES.md) - Changes summary
   - [.github/workflows/README.md](.github/workflows/README.md) - Workflows overview
4. **GitHub Actions Documentation**: https://docs.github.com/en/actions

## Quick Test Command

Run this to do a quick validation of all workflow files:

```bash
# Validate YAML syntax
python3 -c "import yaml; import sys; 
files = [
    '.github/workflows/azure-deployment.yml',
    '.github/workflows/full-pipeline.yml',
    '.github/workflows/main-ci.yml',
    '.github/workflows/envihub-ci.yml',
    '.github/workflows/planthub-ci.yml',
    '.github/workflows/v-orchestrator-ci.yml'
]
for f in files:
    try:
        with open(f, 'r') as file:
            yaml.safe_load(file)
        print(f'✓ {f}')
    except Exception as e:
        print(f'✗ {f} - Error: {e}')
        sys.exit(1)
print('All workflows valid!')
"
```

## Report Issues

If you find any issues with the workflows:
1. Note the workflow name and run number
2. Capture relevant log excerpts
3. Document steps to reproduce
4. Check if it's related to your specific setup or a general issue
