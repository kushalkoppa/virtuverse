const express = require('express');
const router = express.Router();

// In-memory storage for demo purposes
let testCases = [
  {
    id: 1,
    name: 'Vehicle Start-Stop Scenario',
    description: 'Test vehicle start, acceleration, and stop sequence',
    type: 'scenario',
    status: 'ready',
    duration: 60,
    middleware: 'FMI Middleware',
    models: ['Engine_Controller_ECU', 'Vehicle_Dynamics_Model'],
    testSteps: [
      { step: 1, action: 'Initialize models', duration: 5 },
      { step: 2, action: 'Start engine', duration: 10 },
      { step: 3, action: 'Accelerate to 50 km/h', duration: 20 },
      { step: 4, action: 'Maintain speed', duration: 15 },
      { step: 5, action: 'Decelerate and stop', duration: 10 }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Battery Charge-Discharge Test',
    description: 'Test battery management under various load conditions',
    type: 'unit_test',
    status: 'ready',
    duration: 120,
    middleware: 'FMI Middleware',
    models: ['Battery_Management_Plant'],
    testSteps: [
      { step: 1, action: 'Initialize battery model', duration: 5 },
      { step: 2, action: 'Full charge cycle', duration: 40 },
      { step: 3, action: 'High load discharge', duration: 30 },
      { step: 4, action: 'Regenerative charging', duration: 25 },
      { step: 5, action: 'Temperature validation', duration: 20 }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: 'Emergency Braking System',
    description: 'Test emergency braking response and vehicle stability',
    type: 'scenario',
    status: 'draft',
    duration: 30,
    middleware: 'DCP Middleware',
    models: ['Engine_Controller_ECU', 'Vehicle_Dynamics_Model'],
    testSteps: [
      { step: 1, action: 'Initialize at 80 km/h', duration: 5 },
      { step: 2, action: 'Detect obstacle', duration: 2 },
      { step: 3, action: 'Emergency brake activation', duration: 8 },
      { step: 4, action: 'Vehicle stabilization', duration: 10 },
      { step: 5, action: 'Complete stop validation', duration: 5 }
    ],
    createdAt: new Date().toISOString()
  }
];

let testResults = [];

// GET all test cases
router.get('/', (req, res) => {
  res.json(testCases);
});

// GET single test case
router.get('/:id', (req, res) => {
  const testCase = testCases.find(t => t.id === parseInt(req.params.id));
  if (!testCase) {
    return res.status(404).json({ error: 'Test case not found' });
  }
  res.json(testCase);
});

// POST create new test case
router.post('/', (req, res) => {
  const newTestCase = {
    id: testCases.length + 1,
    ...req.body,
    status: req.body.status || 'draft',
    createdAt: new Date().toISOString()
  };
  testCases.push(newTestCase);
  res.status(201).json(newTestCase);
});

// PUT update test case
router.put('/:id', (req, res) => {
  const index = testCases.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Test case not found' });
  }
  testCases[index] = { ...testCases[index], ...req.body };
  res.json(testCases[index]);
});

// DELETE test case
router.delete('/:id', (req, res) => {
  const index = testCases.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Test case not found' });
  }
  testCases.splice(index, 1);
  res.status(204).send();
});

// POST execute test case
router.post('/:id/execute', (req, res) => {
  const testCase = testCases.find(t => t.id === parseInt(req.params.id));
  if (!testCase) {
    return res.status(404).json({ error: 'Test case not found' });
  }
  
  // Simulate test execution
  const result = {
    id: testResults.length + 1,
    testCaseId: testCase.id,
    testCaseName: testCase.name,
    status: 'passed',
    executedAt: new Date().toISOString(),
    duration: testCase.duration,
    results: {
      totalSteps: testCase.testSteps.length,
      passedSteps: testCase.testSteps.length,
      failedSteps: 0,
      details: testCase.testSteps.map(step => ({
        step: step.step,
        action: step.action,
        status: 'passed',
        duration: step.duration
      }))
    }
  };
  
  testResults.push(result);
  res.json(result);
});

// GET test results
router.get('/:id/results', (req, res) => {
  const results = testResults.filter(r => r.testCaseId === parseInt(req.params.id));
  res.json(results);
});

module.exports = router;
