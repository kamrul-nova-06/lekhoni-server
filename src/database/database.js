const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const { DB_PATH } = require('../config/env');

const resolvedDbPath = path.resolve(DB_PATH);

// Make sure the parent directory exists.
// This is important for Render's /var/data persistent disk.
const dbDirectory = path.dirname(resolvedDbPath);

if (!fs.existsSync(dbDirectory)) {
  fs.mkdirSync(dbDirectory, {
    recursive: true,
  });
}

console.log(`SQLite database: ${resolvedDbPath}`);

const db = new Database(resolvedDbPath);

db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS activations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    activation_code TEXT NOT NULL UNIQUE,
    device_id TEXT,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    activated_at TEXT
  );
`);

module.exports = db;
