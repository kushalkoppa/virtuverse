const config = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3023',
  V_ANALYZER_URL: import.meta.env.VITE_V_ANALYZER_URL || 'http://localhost:3021',
  V_DEVCONTAINERS_URL: import.meta.env.VITE_V_DEVCONTAINERS_URL || 'http://localhost:3031',
  V_ASSESSOR_URL: import.meta.env.VITE_V_ASSESSOR_URL || 'https://simulab.de.bosch.com:4200/costa'
};

export default config;
