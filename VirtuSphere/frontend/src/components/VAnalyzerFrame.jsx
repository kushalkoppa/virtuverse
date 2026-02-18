import config from '../config';

function VAnalyzerFrame() {
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <iframe
        src={config.V_ANALYZER_URL}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block'
        }}
        title="V-Analyzer Platform"
      />
    </div>
  );
}

export default VAnalyzerFrame;
