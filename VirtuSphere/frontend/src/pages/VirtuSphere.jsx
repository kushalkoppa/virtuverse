import { useState } from 'react';
import { BarChart3, Container, Target, Zap, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/VirtuSphere.css';

function VirtuSphere() {
  const navigate = useNavigate();

  const platforms = [
    {
      id: 'v-analyzer',
      name: 'V-Analyzer',
      icon: BarChart3,
      description: 'Grafana-style dashboards for simulation results visualization and platform metrics',
      color: '#6366f1',
      features: ['Simulation Dashboards', 'Platform Metrics', 'Real-time Monitoring', 'Historical Analysis'],
      route: '/v-analyzer'
    },
    {
      id: 'v-devcontainers',
      name: 'V-DevContainers',
      icon: Container,
      description: 'DevContainer generation tool for quick development environment setup',
      color: '#8b5cf6',
      features: ['Project Conversion', 'Component Selection', 'Container Creation', 'Pre-configured Environments'],
      route: '/v-devcontainers'
    },
    {
      id: 'v-assessor',
      name: 'V-Assessor',
      icon: Target,
      description: 'Assessment and evaluation platform for simulation models and results',
      color: '#10b981',
      features: ['Model Assessment', 'Quality Metrics', 'Performance Evaluation', 'Compliance Checking'],
      route: '/v-assessor'
    }
  ];

  return (
    <div className="virtusphere-container">
      {/* Header Section */}
      <div className="virtusphere-header">
        <div className="header-content">
          <div className="header-badge">
            <Zap size={24} className="badge-icon" />
            <span>VirtuVerse Studio</span>
          </div>
          <h1 className="virtusphere-title">VirtuSphere</h1>
          <p className="virtusphere-subtitle">
            Analytics, Visualization & DevContainer Platform for VirtuVerse Studio
          </p>
        </div>
      </div>

      {/* Platforms Grid */}
      <div className="platforms-section">
        <h2 className="section-title">Analytics & Visualization Tools</h2>
        <div className="platforms-grid">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <div 
                key={platform.id} 
                className="platform-card"
                onClick={() => navigate(platform.route)}
                style={{ '--platform-color': platform.color }}
              >
                <div className="platform-icon" style={{ background: platform.color }}>
                  <Icon size={32} />
                </div>
                <h3>{platform.name}</h3>
                <p className="platform-description">{platform.description}</p>
                <div className="platform-features">
                  {platform.features.map((feature, idx) => (
                    <span key={idx} className="feature-tag">{feature}</span>
                  ))}
                </div>
                <button className="platform-launch-btn">
                  Launch Platform →
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* SmartHarness Section */}
      <div className="smartharness-section">
        <div className="smartharness-card">
          <div className="smartharness-icon">
            <Bot size={32} />
          </div>
          <div className="smartharness-content">
            <h3>SmartHarness Integration</h3>
            <p>
              AI-enabled assistance available across all VirtuSphere platforms for intelligent insights,
              anomaly detection, and optimization recommendations.
            </p>
          </div>
        </div>
      </div>

      {/* Architecture Overview */}
      <div className="architecture-section">
        <h2 className="section-title">Platform Architecture</h2>
        <div className="architecture-diagram">
          <div className="arch-layer">
            <div className="arch-box arch-platform" style={{ background: '#6366f1' }}>
              <BarChart3 size={20} />
              <span>V-Analyzer</span>
            </div>
            <div className="arch-box arch-platform" style={{ background: '#8b5cf6' }}>
              <Container size={20} />
              <span>V-DevContainers</span>
            </div>
            <div className="arch-box arch-platform" style={{ background: '#10b981' }}>
              <Target size={20} />
              <span>V-Assessor</span>
            </div>
          </div>
          <div className="arch-connector"></div>
          <div className="arch-layer">
            <div className="arch-box arch-ai">
              <Bot size={20} />
              <span>SmartHarness AI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VirtuSphere;
