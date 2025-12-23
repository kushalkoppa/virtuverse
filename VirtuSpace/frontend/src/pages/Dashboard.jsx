import { useState, useEffect } from 'react';
import { Activity, TrendingUp, Users, FolderOpen } from 'lucide-react';
import '../styles/Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({
    totalModels: 0,
    activeIntegrations: 0,
    recentActivities: 0,
    sharedModels: 0
  });

  useEffect(() => {
    // Simulate loading stats from API
    setTimeout(() => {
      setStats({
        totalModels: 47,
        activeIntegrations: 3,
        recentActivities: 12,
        sharedModels: 23
      });
    }, 500);
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Dashboard</h2>
        <p>Welcome to EnviHub - Your unified platform for simulation model management</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <FolderOpen size={28} />
          </div>
          <div className="stat-content">
            <h3>{stats.totalModels}</h3>
            <p>Total Models</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <Activity size={28} />
          </div>
          <div className="stat-content">
            <h3>{stats.activeIntegrations}</h3>
            <p>Active Integrations</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <TrendingUp size={28} />
          </div>
          <div className="stat-content">
            <h3>{stats.recentActivities}</h3>
            <p>Recent Activities</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
            <Users size={28} />
          </div>
          <div className="stat-content">
            <h3>{stats.sharedModels}</h3>
            <p>Shared Models</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="recent-activity">
          <h3>Recent Activities</h3>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">📤</div>
              <div className="activity-details">
                <p className="activity-title">Model uploaded: Vehicle_Dynamics_v2.ipg</p>
                <span className="activity-time">2 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">🔧</div>
              <div className="activity-details">
                <p className="activity-title">IPG CarMaker integration completed</p>
                <span className="activity-time">5 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">📊</div>
              <div className="activity-details">
                <p className="activity-title">Metadata extracted for 3 models</p>
                <span className="activity-time">1 day ago</span>
              </div>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button className="action-btn primary">
              <span>+ Upload Model</span>
            </button>
            <button className="action-btn secondary">
              <span>🔌 Add Integration</span>
            </button>
            <button className="action-btn tertiary">
              <span>📋 Extract Metadata</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
