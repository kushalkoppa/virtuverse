// API Configuration
// This file centralizes API endpoint configuration
// In production, use environment variables to configure the API base URL

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export default API_BASE_URL;
