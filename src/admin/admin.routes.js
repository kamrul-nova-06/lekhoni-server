const express = require('express');
const crypto = require('crypto');
const db = require('../database/database');

const router = express.Router();

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

module.exports = router;
