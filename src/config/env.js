module.exports = {
  PORT: Number(process.env.PORT || 3000),

  // Render:
  // /var/data

  // Vercel:
  // /tmp is writable during a function execution,
  // but it is NOT persistent storage.

  DB_PATH:
    process.env.DB_PATH ||
    (process.env.VERCEL ? '/tmp/lekhoni.db' : './lekhoni.db'),
};
