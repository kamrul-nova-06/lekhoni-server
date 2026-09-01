const activationService = require('./activation.service');

function activate(req, res) {
  try {
    const { activationCode, deviceId } = req.body;

    if (!activationCode || !deviceId) {
      return res.status(400).json({
        success: false,
        message: 'activationCode and deviceId are required',
      });
    }

    const result = activationService.activate(
      activationCode,
      deviceId
    );

    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error('Activation error:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}

module.exports = {
  activate,
};
