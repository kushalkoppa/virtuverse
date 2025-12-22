const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cosimulationRoutes = require('./routes/cosimulationRoutes');
const interfaceRoutes = require('./routes/interfaceRoutes');
const testCaseRoutes = require('./routes/testCaseRoutes');
const integrationRoutes = require('./routes/integrationRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/cosimulation', cosimulationRoutes);
app.use('/api/interfaces', interfaceRoutes);
app.use('/api/testcases', testCaseRoutes);
app.use('/api/integrations', integrationRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', service: 'V-Orchestrator API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`V-Orchestrator server running on port ${PORT}`);
});

module.exports = app;
