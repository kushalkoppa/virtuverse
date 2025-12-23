import React from 'react';

function DashboardView({ dashboards, metrics }) {
  return (
    <div>
      <div className="dashboard-list">
        <h2>Available Dashboards</h2>
        {dashboards.map(dashboard => (
          <div key={dashboard.id} className="dashboard-item">
            <h3>{dashboard.name}</h3>
            <p>{dashboard.description}</p>
            <div className="dashboard-meta">
              <span>📊 {dashboard.panels} panels</span>
              <span>Type: {dashboard.type}</span>
              <span>Updated: {new Date(dashboard.lastUpdated).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {metrics && (
        <>
          <div className="dashboard-card" style={{ marginBottom: '1.5rem' }}>
            <h3>Simulation Metrics</h3>
            <div className="metrics-grid">
              <div className="metric-item">
                <p className="metric-value">{metrics.simulations.total}</p>
                <p className="metric-label">Total Simulations</p>
              </div>
              <div className="metric-item">
                <p className="metric-value">{metrics.simulations.today}</p>
                <p className="metric-label">Today</p>
              </div>
              <div className="metric-item">
                <p className="metric-value">{metrics.simulations.running}</p>
                <p className="metric-label">Running Now</p>
              </div>
              <div className="metric-item">
                <p className="metric-value">{metrics.simulations.success_rate}%</p>
                <p className="metric-label">Success Rate</p>
              </div>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>Platform Health</h3>
              <div className="metrics-grid">
                <div className="metric-item">
                  <p className="metric-value">{metrics.platform.uptime}%</p>
                  <p className="metric-label">Uptime</p>
                </div>
                <div className="metric-item">
                  <p className="metric-value">{metrics.platform.response_time}ms</p>
                  <p className="metric-label">Response Time</p>
                </div>
                <div className="metric-item">
                  <p className="metric-value">{metrics.platform.active_users}</p>
                  <p className="metric-label">Active Users</p>
                </div>
                <div className="metric-item">
                  <p className="metric-value">{metrics.platform.error_rate}%</p>
                  <p className="metric-label">Error Rate</p>
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <h3>Platform Usage</h3>
              <div className="metrics-grid">
                <div className="metric-item">
                  <p className="metric-value">{metrics.usage.envihub_requests}</p>
                  <p className="metric-label">EnviHub Requests</p>
                </div>
                <div className="metric-item">
                  <p className="metric-value">{metrics.usage.planthub_requests}</p>
                  <p className="metric-label">PlantHub Requests</p>
                </div>
                <div className="metric-item">
                  <p className="metric-value">{metrics.usage.orchestrator_runs}</p>
                  <p className="metric-label">Orchestrator Runs</p>
                </div>
                <div className="metric-item">
                  <p className="metric-value">{metrics.usage.analyzer_views}</p>
                  <p className="metric-label">Analyzer Views</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DashboardView;
