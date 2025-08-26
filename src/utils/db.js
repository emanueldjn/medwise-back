const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/medwise',
  ssl: { rejectUnauthorized: false } // Render exige SSL
});

module.exports = pool;
