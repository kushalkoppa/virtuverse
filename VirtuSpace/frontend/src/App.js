import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import VirtuSpaceDashboard from './components/VirtuSpaceDashboard';
import VOrchestratorFrame from './components/VOrchestratorFrame';
import EnviHubFrame from './components/EnviHubFrame';
import PlantHubFrame from './components/PlantHubFrame';

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <div className="header-content">
            <h1>🌌 VirtuSpace</h1>
            <p className="subtitle">Unified Virtualization & Simulation Platform</p>
          </div>
        </header>
        
        <nav className="app-nav">
          <Link 
            to="/" 
            className={activePage === 'dashboard' ? 'active' : ''} 
            onClick={() => setActivePage('dashboard')}
          >
            Dashboard
          </Link>
          <Link 
            to="/v-orchestrator" 
            className={activePage === 'v-orchestrator' ? 'active' : ''} 
            onClick={() => setActivePage('v-orchestrator')}
          >
            ⚙️ V-Orchestrator
          </Link>
          <Link 
            to="/envihub" 
            className={activePage === 'envihub' ? 'active' : ''} 
            onClick={() => setActivePage('envihub')}
          >
            🌐 EnviHub
          </Link>
          <Link 
            to="/planthub" 
            className={activePage === 'planthub' ? 'active' : ''} 
            onClick={() => setActivePage('planthub')}
          >
            🏭 PlantHub
          </Link>
        </nav>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<VirtuSpaceDashboard />} />
            <Route path="/v-orchestrator" element={<VOrchestratorFrame />} />
            <Route path="/envihub" element={<EnviHubFrame />} />
            <Route path="/planthub" element={<PlantHubFrame />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>© 2024 Bosch - VirtuSpace Platform | VirtuVerse Studio</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
