import React from 'react';

function VOrchestratorFrame() {
  const V_ORCHESTRATOR_URL = process.env.REACT_APP_V_ORCHESTRATOR_URL || 'http://localhost:3011';
  
  return (
    <div className="iframe-container">
      <iframe 
        src={V_ORCHESTRATOR_URL} 
        title="V-Orchestrator"
        allow="fullscreen"
      />
    </div>
  );
}

export default VOrchestratorFrame;
