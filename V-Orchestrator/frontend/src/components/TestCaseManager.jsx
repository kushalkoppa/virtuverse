import React, { useState, useEffect } from 'react';
import { config } from '../config';

function TestCaseManager() {
  const [testCases, setTestCases] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    fetchTestCases();
  }, []);

  const fetchTestCases = async () => {
    try {
      const response = await fetch(config.endpoints.testcases);
      if (response.ok) {
        const data = await response.json();
        setTestCases(data);
      }
    } catch (error) {
      console.error('Error fetching test cases:', error);
    }
  };

  const executeTest = async (testId) => {
    try {
      const response = await fetch(`${config.endpoints.testcases}/${testId}/execute`, {
        method: 'POST'
      });
      if (response.ok) {
        const result = await response.json();
        setTestResult(result);
      }
    } catch (error) {
      console.error('Error executing test:', error);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'ready': return 'badge-success';
      case 'draft': return 'badge-warning';
      case 'running': return 'badge-info';
      default: return 'badge-gray';
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'scenario': return 'badge-purple';
      case 'unit_test': return 'badge-info';
      default: return 'badge-gray';
    }
  };

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 className="page-title">Test Case Manager</h2>
          <p className="page-description">
            Create and manage test cases and test scripts for cosimulation execution
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Create Test Case'}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 className="card-title">Create New Test Case</h3>
          <div className="card-content">
            <form>
              <div className="form-group">
                <label className="form-label">Test Name</label>
                <input type="text" className="form-input" placeholder="Enter test case name" />
              </div>
              <div className="form-group">
                <label className="form-label">Type</label>
                <select className="form-select">
                  <option value="scenario">Scenario Test</option>
                  <option value="unit_test">Unit Test</option>
                  <option value="integration_test">Integration Test</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-textarea" rows="3" placeholder="Describe the test case"></textarea>
              </div>
              <div className="form-group">
                <label className="form-label">Middleware</label>
                <select className="form-select">
                  <option>FMI Middleware</option>
                  <option>DCP Middleware</option>
                  <option>Custom Integration</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Duration (seconds)</label>
                <input type="number" className="form-input" placeholder="60" />
              </div>
              <button type="submit" className="btn btn-success">Create Test Case</button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        {testCases.map((testCase) => (
          <div key={testCase.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h3 className="card-title">{testCase.name}</h3>
              <div>
                <span className={`badge ${getTypeBadge(testCase.type)}`} style={{ marginRight: '0.5rem' }}>
                  {testCase.type.replace('_', ' ')}
                </span>
                <span className={`badge ${getStatusBadge(testCase.status)}`}>
                  {testCase.status}
                </span>
              </div>
            </div>
            
            <div className="card-content">
              <p style={{ marginBottom: '1rem', color: '#6b7280' }}>{testCase.description}</p>
              
              <div style={{ marginBottom: '1rem' }}>
                <p><strong>Middleware:</strong> {testCase.middleware}</p>
                <p><strong>Duration:</strong> {testCase.duration}s</p>
                <p><strong>Models:</strong> {testCase.models.length}</p>
                <p><strong>Test Steps:</strong> {testCase.testSteps.length}</p>
              </div>

              <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
                <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Models Involved:</strong>
                {testCase.models.map((model, idx) => (
                  <span key={idx} className="badge badge-info" style={{ marginRight: '0.5rem' }}>
                    {model}
                  </span>
                ))}
              </div>

              <div style={{ marginTop: '1rem' }}>
                <button 
                  className="btn btn-success"
                  onClick={() => executeTest(testCase.id)}
                  disabled={testCase.status !== 'ready'}
                >
                  Execute Test
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => setSelectedTest(testCase)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {testCases.length === 0 && !showForm && (
        <div className="alert alert-info">
          No test cases created yet. Click "Create Test Case" to add one.
        </div>
      )}

      {selectedTest && (
        <div className="card" style={{ marginTop: '2rem' }}>
          <h3 className="card-title">Test Steps: {selectedTest.name}</h3>
          <div className="card-content">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Step</th>
                    <th>Action</th>
                    <th>Duration (s)</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedTest.testSteps.map((step) => (
                    <tr key={step.step}>
                      <td><strong>Step {step.step}</strong></td>
                      <td>{step.action}</td>
                      <td>{step.duration}s</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {testResult && (
        <div className="card" style={{ marginTop: '2rem' }}>
          <h3 className="card-title">Test Execution Result</h3>
          <div className="card-content">
            <div className={`alert ${testResult.status === 'passed' ? 'alert-success' : 'alert-danger'}`}>
              <strong>Test {testResult.status.toUpperCase()}</strong>
              <p>Executed at: {new Date(testResult.executedAt).toLocaleString()}</p>
              <p>Duration: {testResult.duration}s</p>
            </div>
            
            <div style={{ marginTop: '1rem' }}>
              <h4>Results Summary:</h4>
              <p>Total Steps: {testResult.results.totalSteps}</p>
              <p>Passed Steps: {testResult.results.passedSteps}</p>
              <p>Failed Steps: {testResult.results.failedSteps}</p>
            </div>

            <div className="table-container" style={{ marginTop: '1rem' }}>
              <table>
                <thead>
                  <tr>
                    <th>Step</th>
                    <th>Action</th>
                    <th>Status</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {testResult.results.details.map((detail) => (
                    <tr key={detail.step}>
                      <td><strong>Step {detail.step}</strong></td>
                      <td>{detail.action}</td>
                      <td>
                        <span className={`badge ${detail.status === 'passed' ? 'badge-success' : 'badge-danger'}`}>
                          {detail.status}
                        </span>
                      </td>
                      <td>{detail.duration}s</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestCaseManager;
