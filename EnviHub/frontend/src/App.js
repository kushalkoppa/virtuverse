import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ToolsInterface from './components/ToolsInterface';
import ModelLibrary from './components/ModelLibrary';
import ModelEditor from './components/ModelEditor';
import SharingHub from './components/SharingHub';
import Dashboard from './components/Dashboard';
import ConfigManagement from './components/ConfigManagement';

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <div className="header-content">
            <h1>🌐 EnviHub</h1>
            <p className="subtitle">VirtuSpace Platform</p>
          </div>
        </header>
        
        <nav className="app-nav">
          <Link to="/" className={activePage === 'dashboard' ? 'active' : ''} onClick={() => setActivePage('dashboard')}>
            Dashboard
          </Link>
          <Link to="/tools" className={activePage === 'tools' ? 'active' : ''} onClick={() => setActivePage('tools')}>
            Tool Interfaces
          </Link>
          <Link to="/models" className={activePage === 'models' ? 'active' : ''} onClick={() => setActivePage('models')}>
            Model Library
          </Link>
          <Link to="/editor" className={activePage === 'editor' ? 'active' : ''} onClick={() => setActivePage('editor')}>
            Model Editor
          </Link>
          <Link to="/sharing" className={activePage === 'sharing' ? 'active' : ''} onClick={() => setActivePage('sharing')}>
            Sharing Hub
          </Link>
          <Link to="/config" className={activePage === 'config' ? 'active' : ''} onClick={() => setActivePage('config')}>
            Config Management
          </Link>
        </nav>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tools" element={<ToolsInterface />} />
            <Route path="/models" element={<ModelLibrary />} />
            <Route path="/editor" element={<ModelEditor />} />
            <Route path="/sharing" element={<SharingHub />} />
            <Route path="/config" element={<ConfigManagement />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>© 2024 Bosch - EnviHub Platform | VirtuVerse E2E Virtualization & Simulation</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
