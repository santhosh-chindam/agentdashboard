const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

// Routes
const transcriptRoutes = require('./routes/transcripts');
const summaryRoutes = require('./routes/summaries');
const agentRoutes = require('./routes/agents');
const healthRoutes = require('./routes/health');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Serve static files from frontend build
const buildPath = path.join(__dirname, '../../frontend/build');
app.use(express.static(buildPath));

// Routes
app.use('/api/transcripts', transcriptRoutes);
app.use('/api/summaries', summaryRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/health', healthRoutes);

// Serve index.html for all non-API routes (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
