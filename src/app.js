const express = require('express');
const path = require('path');
const cors = require('cors');

require('dotenv').config();

const { PORT } = require('./config/env');

// Initialize database.
const db = require('./database/database');

const activationRoutes = require('./activation/activation.routes');
const adminRoutes = require('./admin/admin.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin.html'));
});

app.get('/api/admin-panel', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin.html'));
});

app.get('/api/settings/whatsapp', (req, res) => {
  try {
    const row = db.prepare(
      "SELECT value FROM settings WHERE key = 'whatsapp'"
    ).get();

    res.json({
      success: true,
      whatsapp: row?.value || ''
    });
  } catch (error) {
    console.error('WhatsApp settings error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to load WhatsApp settings'
    });
  }
});

app.get('/admin/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin.html'));
});

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Lekhoni Server is running',
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    service: 'lekhoni-server',
  });
});

app.use('/api/activation', activationRoutes);
app.use('/api/admin', adminRoutes);

// Local / Render server.
// Vercel imports the Express app directly.
if (!process.env.VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Lekhoni Server running on port ${PORT}`);
  });
}

module.exports = app;
