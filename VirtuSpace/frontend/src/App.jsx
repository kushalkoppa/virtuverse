import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Library, Settings, Upload, Database, FileCode, Home, GitBranch } from 'lucide-react';
import VirtuSpace from './pages/VirtuSpace';
import ModelLibrary from './pages/ModelLibrary';
import ToolIntegration from './pages/ToolIntegration';
import MetadataExtractor from './pages/MetadataExtractor';
import ModelEditor from './pages/ModelEditor';
import Dashboard from './pages/Dashboard';
import ConfigManagement from './components/ConfigManagement';
import './App.css';

function NavBar() {
  const location = useLocation();
  const isVirtuSpace = location.pathname === '/';
  const isEnviHub = location.pathname.startsWith('/envihub');
  const isVOrchestrator = location.pathname.startsWith('/v-orchestrator');
  const isPlantHub = location.pathname.startsWith('/planthub');

  if (isVirtuSpace) {
    return null; // No navbar on VirtuSpace landing page
  }

  let platformName = 'VirtuSpace';
  let baseRoute = '';

  if (isEnviHub) {
    platformName = 'EnviHub';
    baseRoute = '/envihub';
  } else if (isVOrchestrator) {
    platformName = 'V-Orchestrator';
    baseRoute = '/v-orchestrator';
  } else if (isPlantHub) {
    platformName = 'PlantHub';
    baseRoute = '/planthub';
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>{platformName}</h1>
        <span className="subtitle">VirtuSpace Platform</span>
      </div>
      <div className="navbar-menu">
        <Link to="/" className="nav-item">
          <Home size={20} />
          <span>VirtuSpace</span>
        </Link>
        {(isEnviHub || isVOrchestrator || isPlantHub) && (
          <>
            <Link to={`${baseRoute}`} className="nav-item">
              <Database size={20} />
              <span>Dashboard</span>
            </Link>
            <Link to={`${baseRoute}/library`} className="nav-item">
              <Library size={20} />
              <span>Model Library</span>
            </Link>
            <Link to={`${baseRoute}/tools`} className="nav-item">
              <Settings size={20} />
              <span>Tool Integration</span>
            </Link>
            <Link to={`${baseRoute}/config`} className="nav-item">
              <GitBranch size={20} />
              <span>Config Mgmt</span>
            </Link>
            {isEnviHub && (
              <>
                <Link to={`${baseRoute}/metadata`} className="nav-item">
                  <FileCode size={20} />
                  <span>Metadata Extractor</span>
                </Link>
                <Link to={`${baseRoute}/editor`} className="nav-item">
                  <Upload size={20} />
                  <span>Model Editor</span>
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<VirtuSpace />} />
            
            {/* EnviHub Routes */}
            <Route path="/envihub" element={<Dashboard />} />
            <Route path="/envihub/library" element={<ModelLibrary />} />
            <Route path="/envihub/tools" element={<ToolIntegration />} />
            <Route path="/envihub/metadata" element={<MetadataExtractor />} />
            <Route path="/envihub/editor" element={<ModelEditor />} />
            <Route path="/envihub/config" element={<ConfigManagement />} />

            {/* V-Orchestrator Routes */}
            <Route path="/v-orchestrator" element={<Dashboard />} />
            <Route path="/v-orchestrator/library" element={<ModelLibrary />} />
            <Route path="/v-orchestrator/tools" element={<ToolIntegration />} />
            <Route path="/v-orchestrator/config" element={<ConfigManagement />} />

            {/* PlantHub Routes */}
            <Route path="/planthub" element={<Dashboard />} />
            <Route path="/planthub/library" element={<ModelLibrary />} />
            <Route path="/planthub/tools" element={<ToolIntegration />} />
            <Route path="/planthub/config" element={<ConfigManagement />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
