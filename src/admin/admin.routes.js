const express = require('express');
const crypto = require('crypto');
const db = require('../database/database');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

router.use(adminAuth);

router.post('/activation/create', (req, res) => {
  try {
    const activationCode =
      crypto.randomBytes(6).toString('hex').toUpperCase();

    const result = db.prepare(`
      INSERT INTO activations (activation_code)
      VALUES (?)
    `).run(activationCode);

    res.json({
      success: true,
      id: result.lastInsertRowid,
      activationCode,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Failed to create activation code',
    });
  }
});

router.get('/activations', (req, res) => {
  const activations = db.prepare(`
    SELECT id, activation_code, device_id, status, created_at, activated_at
    FROM activations
    ORDER BY id DESC
  `).all();

  res.json({
    success: true,
    activations,
  });
});


router.get('/settings', (req, res) => {
  const rows = db.prepare(`
    SELECT key, value
    FROM settings
    ORDER BY key
  `).all();

  const settings = {};
  for (const row of rows) {
    settings[row.key] = row.value;
  }

  res.json({
    success: true,
    settings,
  });
});

router.post('/settings/whatsapp', (req, res) => {
  const { whatsapp } = req.body;

  if (!whatsapp || typeof whatsapp !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'WhatsApp number is required',
    });
  }

  db.prepare(`
    INSERT INTO settings (key, value)
    VALUES ('whatsapp', ?)
    ON CONFLICT(key)
    DO UPDATE SET value = excluded.value
  `).run(whatsapp.trim());

  res.json({
    success: true,
    whatsapp: whatsapp.trim(),
  });
});

module.exports = router;
