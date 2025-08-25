const pool = require('./src/utils/db');

async function createTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS questions (
      id SERIAL PRIMARY KEY,
      materia VARCHAR(100),
      tema VARCHAR(100),
      pergunta TEXT,
      alternativas TEXT[],
      resposta_correta VARCHAR(100)
    );
  `);

  console.log('Tabelas criadas ou já existentes!');
}

createTables().catch(console.error);

// ...existing code...
module.exports = { createTables };