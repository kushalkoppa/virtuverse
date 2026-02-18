import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VirtuMind from './pages/VirtuMind';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VirtuMind />} />
      </Routes>
    </Router>
  );
}

export default App;
