const crypto = require('crypto');

function adminAuth(req, res, next) {
  const expected = process.env.ADMIN_SECRET;

  if (!expected) {
    return res.status(500).json({
      success: false,
      message: 'ADMIN_SECRET is not configured',
    });
  }

  const received =
    req.headers.authorization?.startsWith('Bearer ')
      ? req.headers.authorization.slice(7)
      : '';

  const a = Buffer.from(received);
  const b = Buffer.from(expected);

  if (
    a.length !== b.length ||
    !crypto.timingSafeEqual(a, b)
  ) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  next();
}

module.exports = adminAuth;
