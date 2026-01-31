#!/bin/bash

# VirtuVerse Backend Integration Tests
# This script tests all the integration endpoints

echo "Testing VirtuVerse Backend Integrations"
echo "========================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Base URL
BASE_URL="http://localhost:5001"

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0

# Function to test endpoint
test_endpoint() {
    local name=$1
    local url=$2
    local expected_status=${3:-200}
    
    echo -n "Testing $name... "
    
    # Make request (without auth for status endpoints)
    status=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$url")
    
    if [ "$status" -eq "$expected_status" ]; then
        echo -e "${GREEN}✓ PASS${NC} (HTTP $status)"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}✗ FAIL${NC} (Expected HTTP $expected_status, got HTTP $status)"
        ((TESTS_FAILED++))
    fi
}

# Function to test authenticated endpoint
test_auth_endpoint() {
    local name=$1
    local url=$2
    
    echo -n "Testing $name (requires auth)... "
    
    # Make request without auth, should get 401 or error
    status=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$url")
    
    # Expecting 401 (unauthorized) or 500 (missing config) without auth
    if [ "$status" -eq "401" ] || [ "$status" -eq "500" ] || [ "$status" -eq "403" ]; then
        echo -e "${YELLOW}⚠ PROTECTED${NC} (HTTP $status - requires authentication)"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}✗ FAIL${NC} (Expected HTTP 401/500/403, got HTTP $status)"
        ((TESTS_FAILED++))
    fi
}

# Test health endpoint
echo "=== Basic Endpoints ==="
test_endpoint "Health Check" "/api/health" 200

# Test integration status endpoint (requires auth)
echo ""
echo "=== Integration Status ==="
test_auth_endpoint "Integration Status" "/api/integrations/status"

# Test VM endpoints (require auth)
echo ""
echo "=== VM Integration ==="
test_auth_endpoint "VM Status" "/api/vm/status"
# VM test endpoint uses POST, but we're just checking auth here
echo -n "Testing VM Test (requires auth)... "
status=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE_URL/api/vm/test")
if [ "$status" -eq "401" ] || [ "$status" -eq "500" ] || [ "$status" -eq "403" ]; then
    echo -e "${YELLOW}⚠ PROTECTED${NC} (HTTP $status - requires authentication)"
    ((TESTS_PASSED++))
else
    echo -e "${RED}✗ FAIL${NC} (Expected HTTP 401/500/403, got HTTP $status)"
    ((TESTS_FAILED++))
fi
test_auth_endpoint "VM Tools" "/api/vm/tools"

# Test PostgreSQL endpoints (require auth)
echo ""
echo "=== PostgreSQL Integration ==="
test_auth_endpoint "PostgreSQL Test" "/api/postgres/test"
test_auth_endpoint "PostgreSQL Info" "/api/postgres/info"
test_auth_endpoint "PostgreSQL Stats" "/api/postgres/stats"

# Test JFrog endpoints (require auth)
echo ""
echo "=== JFrog Artifactory Integration ==="
test_auth_endpoint "JFrog Test" "/api/jfrog/test"
test_auth_endpoint "JFrog Repositories" "/api/jfrog/repositories"

# Test GitHub endpoints (require auth)
echo ""
echo "=== GitHub Integration ==="
test_auth_endpoint "GitHub Test" "/api/github/test"
test_auth_endpoint "GitHub Repository" "/api/github/repository"
test_auth_endpoint "GitHub Branches" "/api/github/branches"
test_auth_endpoint "GitHub Commits" "/api/github/commits"

# Test Azure AI endpoints (require auth)
echo ""
echo "=== Azure AI Integration ==="
test_auth_endpoint "Azure AI Test" "/api/azureai/test"
test_auth_endpoint "Azure AI Info" "/api/azureai/info"

# Print summary
echo ""
echo "========================================"
echo "Test Summary:"
echo -e "  ${GREEN}Passed: $TESTS_PASSED${NC}"
echo -e "  ${RED}Failed: $TESTS_FAILED${NC}"
echo "========================================"

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}Some tests failed!${NC}"
    exit 1
fi
