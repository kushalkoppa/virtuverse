import React from 'react';
import { PLANTHUB_URL } from '../config';

function PlantHubFrame() {
  return (
    <div className="iframe-container">
      <iframe 
        src={PLANTHUB_URL} 
        title="PlantHub"
        allow="fullscreen"
      />
    </div>
  );
}

export default PlantHubFrame;
