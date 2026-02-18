import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VirtuSphere from './pages/VirtuSphere';
import VAnalyzerFrame from './components/VAnalyzerFrame';
import VDevContainersFrame from './components/VDevContainersFrame';
import VAssessorFrame from './components/VAssessorFrame';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VirtuSphere />} />
        <Route path="/v-analyzer" element={<VAnalyzerFrame />} />
        <Route path="/v-devcontainers" element={<VDevContainersFrame />} />
        <Route path="/v-assessor" element={<VAssessorFrame />} />
      </Routes>
    </Router>
  );
}

export default App;
