module.exports = {
  PORT: Number(process.env.PORT || 3000),

  // Render Persistent Disk:
  // /var/data
  //
  // Local development:
  // ./lekhoni.db
  DB_PATH: process.env.DB_PATH || './lekhoni.db',
};
