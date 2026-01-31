import { useState, useEffect } from 'react';
import { Activity, TrendingUp, Users, FolderOpen } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard() {
  const location = useLocation();
  const isMeDaC = location.pathname.startsWith('/medac');
  const isPlantHub = location.pathname.startsWith('/planthub');
  const isVOrchestrator = location.pathname.startsWith('/v-orchestrator');
  
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
        totalModels: isMeDaC ? 32 : isPlantHub ? 25 : 47,
        activeIntegrations: isMeDaC ? 4 : 3,
        recentActivities: 12,
        sharedModels: isMeDaC ? 18 : 23
      });
    }, 500);
  }, [isMeDaC, isPlantHub]);

  const getPlatformName = () => {
    if (isMeDaC) return 'MeDaC';
    if (isPlantHub) return 'PlantHub';
    if (isVOrchestrator) return 'V-Orchestrator';
    return 'EnviHub';
  };

  const getPlatformDescription = () => {
    if (isMeDaC) return 'Your unified platform for Virtual ECU creation and configuration';
    if (isPlantHub) return 'Your unified platform for plant simulation model management';
    if (isVOrchestrator) return 'Your unified platform for simulation orchestration';
    return 'Your unified platform for simulation model management';
  };

  const getRecentActivities = () => {
    if (isMeDaC) {
      return [
        {
          icon: '🔧',
          title: 'Virtual ECU created: ADAS_Controller_v3.ecu',
          time: '1 hour ago'
        },
        {
          icon: '🔌',
          title: 'Vector CANoe integration completed',
          time: '3 hours ago'
        },
        {
          icon: '📊',
          title: 'Configured 2 new Virtual ECUs',
          time: '1 day ago'
        }
      ];
    }
    return [
      {
        icon: '📤',
        title: 'Model uploaded: Vehicle_Dynamics_v2.ipg',
        time: '2 hours ago'
      },
      {
        icon: '🔧',
        title: 'IPG CarMaker integration completed',
        time: '5 hours ago'
      },
      {
        icon: '📊',
        title: 'Metadata extracted for 3 models',
        time: '1 day ago'
      }
    ];
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Dashboard</h2>
        <p>Welcome to {getPlatformName()} - {getPlatformDescription()}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <FolderOpen size={28} />
          </div>
          <div className="stat-content">
            <h3>{stats.totalModels}</h3>
            <p>{isMeDaC ? 'Total Virtual ECUs' : 'Total Models'}</p>
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
            <p>{isMeDaC ? 'Shared Virtual ECUs' : 'Shared Models'}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="recent-activity">
          <h3>Recent Activities</h3>
          <div className="activity-list">
            {getRecentActivities().map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-icon">{activity.icon}</div>
                <div className="activity-details">
                  <p className="activity-title">{activity.title}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button className="action-btn primary">
              <span>{isMeDaC ? '+ Create Virtual ECU' : '+ Upload Model'}</span>
            </button>
            <button className="action-btn secondary">
              <span>🔌 Add Integration</span>
            </button>
            <button className="action-btn tertiary">
              <span>{isMeDaC ? '⚙️ Configure ECU' : '📋 Extract Metadata'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
