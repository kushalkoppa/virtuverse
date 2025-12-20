const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const toolRoutes = require('./routes/toolRoutes');
const modelRoutes = require('./routes/modelRoutes');
const sharingRoutes = require('./routes/sharingRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/tools', toolRoutes);
app.use('/api/models', modelRoutes);
app.use('/api/sharing', sharingRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', service: 'PlantHub API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`PlantHub server running on port ${PORT}`);
});

module.exports = app;
