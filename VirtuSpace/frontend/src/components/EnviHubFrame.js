import React from 'react';
import { ENVIHUB_URL } from '../config';

function EnviHubFrame() {
  return (
    <div className="iframe-container">
      <iframe 
        src={ENVIHUB_URL} 
        title="EnviHub"
        allow="fullscreen"
      />
    </div>
  );
}

export default EnviHubFrame;
