import { useEffect } from 'react';
import config from '../config';

function VDevContainersFrame() {
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <iframe
        src={config.V_DEVCONTAINERS_URL}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block'
        }}
        title="V-DevContainers Platform"
      />
    </div>
  );
}

export default VDevContainersFrame;
