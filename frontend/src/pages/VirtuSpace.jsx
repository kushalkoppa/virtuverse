import { useState } from 'react';
import { Box, Cpu, Leaf, Zap, Github, Database, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/VirtuSpace.css';

function VirtuSpace() {
  const navigate = useNavigate();
  const [showAIAgent, setShowAIAgent] = useState(false);

  const platforms = [
    {
      id: 'v-orchestrator',
      name: 'V-Orchestrator',
      icon: Cpu,
      description: 'Intelligent cosimulation orchestration platform for seamless integration of V-ECUs, Environment Models, and Plant Models',
      color: '#8b5cf6',
      features: ['Cosimulation Middleware', 'Interface Detection', 'Test Case Manager', 'Model Integration'],
      route: '/v-orchestrator'
    },
    {
      id: 'envihub',
      name: 'EnviHub',
      icon: Box,
      description: 'Environment modeling platform with IPG CarMaker, PreScan and other simulation tool integrations',
      color: '#3b82f6',
      features: ['Model Library', 'Tool Integration', 'Metadata Extraction', 'Model Editor'],
      route: '/envihub'
    },
    {
      id: 'planthub',
      name: 'PlantHub',
      icon: Leaf,
      description: 'Plant modeling platform for sensors, actuators, physical and mathematical models',
      color: '#10b981',
      features: ['MATLAB Simulink', 'Modelica', 'Simcenter Amesim', 'Model Management'],
      route: '/planthub'
    }
  ];

  const configManagement = [
    {
      id: 'jfrog',
      name: 'JFrog Artifactory',
      icon: Database,
      description: 'Binary repository management and artifact versioning',
      status: 'connected',
      color: '#41bf5d'
    },
    {
      id: 'github',
      name: 'GitHub Enterprise',
      icon: Github,
      description: 'Source code management - boschdevcloud.com',
      status: 'connected',
      color: '#6e5494'
    }
  ];

  return (
    <div className="virtuspace-container">
      {/* Header Section */}
      <div className="virtuspace-header">
        <div className="header-content">
          <div className="header-badge">
            <Zap size={24} className="badge-icon" />
            <span>VirtuVerse Studio</span>
          </div>
          <h1 className="virtuspace-title">VirtuSpace</h1>
          <p className="virtuspace-subtitle">
            Unified E2E Virtualization & Simulation Platform for Software Defined Vehicles
          </p>
        </div>
      </div>

      {/* AI Agent Section */}
      <div className="ai-agent-section">
        <button 
          className="ai-agent-trigger"
          onClick={() => setShowAIAgent(!showAIAgent)}
        >
          <Bot size={24} />
          <span>AI Agent Assistant</span>
        </button>
        
        {showAIAgent && (
          <div className="ai-agent-panel">
            <div className="ai-agent-header">
              <Bot size={20} />
              <h3>VirtuSpace AI Agent</h3>
              <button onClick={() => setShowAIAgent(false)} className="close-btn">×</button>
            </div>
            <div className="ai-agent-content">
              <p>Hello! I'm your AI assistant for VirtuSpace. I can help you with:</p>
              <ul>
                <li>Importing the right models from configuration management</li>
                <li>Suggesting optimal integration strategies</li>
                <li>Detecting model compatibility</li>
                <li>Recommending cosimulation middleware</li>
                <li>Guiding through model setup and configuration</li>
              </ul>
              <div className="ai-agent-input">
                <input 
                  type="text" 
                  placeholder="Ask me anything about model integration..."
                />
                <button>Send</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Platforms Grid */}
      <div className="platforms-section">
        <h2 className="section-title">Platforms</h2>
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

      {/* Configuration Management Section */}
      <div className="config-management-section">
        <h2 className="section-title">Configuration Management</h2>
        <p className="section-description">
          Centralized version control and artifact management for all platforms
        </p>
        <div className="config-grid">
          {configManagement.map((config) => {
            const Icon = config.icon;
            return (
              <div key={config.id} className="config-card">
                <div className="config-icon" style={{ background: config.color }}>
                  <Icon size={28} />
                </div>
                <div className="config-content">
                  <h3>{config.name}</h3>
                  <p>{config.description}</p>
                  <div className="config-status">
                    <span className={`status-indicator ${config.status}`}></span>
                    <span className="status-text">{config.status}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Architecture Overview */}
      <div className="architecture-section">
        <h2 className="section-title">Platform Architecture</h2>
        <div className="architecture-diagram">
          <div className="arch-layer">
            <div className="arch-box arch-config">
              <Database size={20} />
              <span>JFrog Artifactory</span>
            </div>
            <div className="arch-box arch-config">
              <Github size={20} />
              <span>GitHub GHES</span>
            </div>
          </div>
          <div className="arch-connector"></div>
          <div className="arch-layer">
            <div className="arch-box arch-platform" style={{ background: '#8b5cf6' }}>
              <Cpu size={20} />
              <span>V-Orchestrator</span>
            </div>
            <div className="arch-box arch-platform" style={{ background: '#3b82f6' }}>
              <Box size={20} />
              <span>EnviHub</span>
            </div>
            <div className="arch-box arch-platform" style={{ background: '#10b981' }}>
              <Leaf size={20} />
              <span>PlantHub</span>
            </div>
          </div>
          <div className="arch-connector"></div>
          <div className="arch-layer">
            <div className="arch-box arch-ai">
              <Bot size={20} />
              <span>AI Agent</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VirtuSpace;
