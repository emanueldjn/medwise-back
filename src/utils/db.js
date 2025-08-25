const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://medwise_user:WIyde6dYio5Pocp2DIuliMFuJcHLZ63q@dpg-d2me60qdbo4c73c74fp0-a/medwise',
  ssl: { rejectUnauthorized: false } // Render geralmente exige SSL
});

module.exports = pool;