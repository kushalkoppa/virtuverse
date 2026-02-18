import { useEffect } from 'react';
import config from '../config';

function VAssessorFrame() {
  useEffect(() => {
    // Redirect to the external V-Assessor URL
    window.location.href = config.V_ASSESSOR_URL;
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#4b5563'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '2rem',
        background: '#f9fafb',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        maxWidth: '500px'
      }}>
        <div style={{
          fontSize: '48px',
          marginBottom: '1rem'
        }}>🎯</div>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '0.5rem',
          color: '#1f2937'
        }}>Redirecting to V-Assessor</h2>
        <p style={{
          fontSize: '16px',
          marginBottom: '1rem'
        }}>
          You are being redirected to the V-Assessor platform...
        </p>
        <p style={{
          fontSize: '14px',
          color: '#6b7280'
        }}>
          If you are not redirected automatically,{' '}
          <a 
            href={config.V_ASSESSOR_URL}
            style={{
              color: '#10b981',
              textDecoration: 'underline',
              fontWeight: '500'
            }}
          >
            click here
          </a>
        </p>
      </div>
    </div>
  );
}

export default VAssessorFrame;
