import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import CosimulationMiddleware from './components/CosimulationMiddleware';
import InterfaceDetection from './components/InterfaceDetection';
import TestCaseManager from './components/TestCaseManager';
import ModelIntegration from './components/ModelIntegration';

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <div className="header-content">
            <h1>🎯 V-Orchestrator</h1>
            <p className="subtitle">VirtuSpace Platform - Cosimulation Orchestration</p>
          </div>
        </header>
        
        <nav className="app-nav">
          <Link to="/" className={activePage === 'dashboard' ? 'active' : ''} onClick={() => setActivePage('dashboard')}>
            Dashboard
          </Link>
          <Link to="/middleware" className={activePage === 'middleware' ? 'active' : ''} onClick={() => setActivePage('middleware')}>
            Cosimulation Middleware
          </Link>
          <Link to="/interfaces" className={activePage === 'interfaces' ? 'active' : ''} onClick={() => setActivePage('interfaces')}>
            Interface Detection
          </Link>
          <Link to="/testcases" className={activePage === 'testcases' ? 'active' : ''} onClick={() => setActivePage('testcases')}>
            Test Cases
          </Link>
          <Link to="/integration" className={activePage === 'integration' ? 'active' : ''} onClick={() => setActivePage('integration')}>
            Model Integration
          </Link>
        </nav>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/middleware" element={<CosimulationMiddleware />} />
            <Route path="/interfaces" element={<InterfaceDetection />} />
            <Route path="/testcases" element={<TestCaseManager />} />
            <Route path="/integration" element={<ModelIntegration />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>© 2024 Bosch - V-Orchestrator Platform | VirtuVerse E2E Virtualization & Simulation</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
