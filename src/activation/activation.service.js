const db = require('../database/database');

function activate(activationCode, deviceId) {
  const activation = db.prepare(`
    SELECT * FROM activations
    WHERE activation_code = ?
  `).get(activationCode);

  if (!activation) {
    return {
      success: false,
      message: 'Invalid activation code',
    };
  }

  if (activation.status !== 'active') {
    return {
      success: false,
      message: 'Activation code is not active',
    };
  }

  if (activation.device_id && activation.device_id !== deviceId) {
    return {
      success: false,
      message: 'Activation code is already used on another device',
    };
  }

  db.prepare(`
    UPDATE activations
    SET device_id = ?,
        activated_at = CURRENT_TIMESTAMP
    WHERE activation_code = ?
  `).run(deviceId, activationCode);

  return {
    success: true,
    message: 'Activation successful',
    activationCode,
    deviceId,
  };
}

module.exports = {
  activate,
};
