import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import SimulationsList from './components/SimulationsList';
import CreateSimulation from './components/CreateSimulation';

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <div className="header-content">
            <h1>⚙️ V-Orchestrator</h1>
            <p className="subtitle">Simulation Orchestration Platform</p>
          </div>
        </header>
        
        <nav className="app-nav">
          <Link to="/" className={activePage === 'dashboard' ? 'active' : ''} onClick={() => setActivePage('dashboard')}>
            Dashboard
          </Link>
          <Link to="/simulations" className={activePage === 'simulations' ? 'active' : ''} onClick={() => setActivePage('simulations')}>
            Simulations
          </Link>
          <Link to="/create" className={activePage === 'create' ? 'active' : ''} onClick={() => setActivePage('create')}>
            Create New
          </Link>
        </nav>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/simulations" element={<SimulationsList />} />
            <Route path="/create" element={<CreateSimulation />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>© 2024 Bosch - V-Orchestrator | VirtuSpace Platform</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
