const Database = require('better-sqlite3');
const path = require('path');
const { DB_PATH } = require('../config/env');

const db = new Database(path.resolve(DB_PATH));

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
