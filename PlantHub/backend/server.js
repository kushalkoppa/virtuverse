const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const plantToolRoutes = require('./routes/plantToolRoutes');
const plantModelRoutes = require('./routes/plantModelRoutes');
const plantSharingRoutes = require('./routes/plantSharingRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/plant-tools', plantToolRoutes);
app.use('/api/plant-models', plantModelRoutes);
app.use('/api/plant-sharing', plantSharingRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', service: 'PlantHub API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`PlantHub server running on port ${PORT}`);
});

module.exports = app;
