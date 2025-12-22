const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3003';

export const config = {
  apiUrl: API_BASE_URL,
  endpoints: {
    cosimulation: `${API_BASE_URL}/api/cosimulation`,
    interfaces: `${API_BASE_URL}/api/interfaces`,
    testcases: `${API_BASE_URL}/api/testcases`,
    integrations: `${API_BASE_URL}/api/integrations`
  }
};

export default config;
