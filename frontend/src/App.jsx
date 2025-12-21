import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Library, Settings, Upload, Database, FileCode } from 'lucide-react';
import ModelLibrary from './pages/ModelLibrary';
import ToolIntegration from './pages/ToolIntegration';
import MetadataExtractor from './pages/MetadataExtractor';
import ModelEditor from './pages/ModelEditor';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="navbar-brand">
            <h1>EnviHub</h1>
            <span className="subtitle">VirtuSpace Platform</span>
          </div>
          <div className="navbar-menu">
            <Link to="/" className="nav-item">
              <Database size={20} />
              <span>Dashboard</span>
            </Link>
            <Link to="/library" className="nav-item">
              <Library size={20} />
              <span>Model Library</span>
            </Link>
            <Link to="/tools" className="nav-item">
              <Settings size={20} />
              <span>Tool Integration</span>
            </Link>
            <Link to="/metadata" className="nav-item">
              <FileCode size={20} />
              <span>Metadata Extractor</span>
            </Link>
            <Link to="/editor" className="nav-item">
              <Upload size={20} />
              <span>Model Editor</span>
            </Link>
          </div>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/library" element={<ModelLibrary />} />
            <Route path="/tools" element={<ToolIntegration />} />
            <Route path="/metadata" element={<MetadataExtractor />} />
            <Route path="/editor" element={<ModelEditor />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
