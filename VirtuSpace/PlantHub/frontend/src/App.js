import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import PlantToolsInterface from './components/PlantToolsInterface';
import PlantModelLibrary from './components/PlantModelLibrary';
import PlantModelEditor from './components/PlantModelEditor';
import PlantSharingHub from './components/PlantSharingHub';
import PlantDashboard from './components/PlantDashboard';

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <div className="header-content">
            <h1>🏭 PlantHub</h1>
            <p className="subtitle">VirtuSpace Platform</p>
          </div>
        </header>
        
        <nav className="app-nav">
          <Link to="/" className={activePage === 'dashboard' ? 'active' : ''} onClick={() => setActivePage('dashboard')}>
            Dashboard
          </Link>
          <Link to="/plant-tools" className={activePage === 'plant-tools' ? 'active' : ''} onClick={() => setActivePage('plant-tools')}>
            Plant Tool Interfaces
          </Link>
          <Link to="/plant-models" className={activePage === 'plant-models' ? 'active' : ''} onClick={() => setActivePage('plant-models')}>
            Plant Model Library
          </Link>
          <Link to="/plant-editor" className={activePage === 'plant-editor' ? 'active' : ''} onClick={() => setActivePage('plant-editor')}>
            Plant Model Editor
          </Link>
          <Link to="/plant-sharing" className={activePage === 'plant-sharing' ? 'active' : ''} onClick={() => setActivePage('plant-sharing')}>
            Sharing Hub
          </Link>
        </nav>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<PlantDashboard />} />
            <Route path="/plant-tools" element={<PlantToolsInterface />} />
            <Route path="/plant-models" element={<PlantModelLibrary />} />
            <Route path="/plant-editor" element={<PlantModelEditor />} />
            <Route path="/plant-sharing" element={<PlantSharingHub />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>© 2024 Bosch - PlantHub Platform | VirtuVerse E2E Virtualization & Simulation</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
