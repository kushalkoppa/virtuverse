import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './config';
import './App.css';
import DashboardView from './components/DashboardView';

function App() {
  const [dashboards, setDashboards] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [dashboardsRes, metricsRes] = await Promise.all([
        axios.get(`${API_URL}/dashboards`),
        axios.get(`${API_URL}/metrics`)
      ]);
      setDashboards(dashboardsRes.data);
      setMetrics(metricsRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '2rem', color: 'white' }}>Loading...</div>;
  }

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>📊 V-Analyzer</h1>
          <p className="subtitle">Analytics & Visualization Platform</p>
        </div>
      </header>

      <main className="app-main">
        <DashboardView dashboards={dashboards} metrics={metrics} />
      </main>

      <footer className="app-footer">
        <p>© 2024 Bosch - V-Analyzer | VirtuSphere Platform</p>
      </footer>
    </div>
  );
}

export default App;
