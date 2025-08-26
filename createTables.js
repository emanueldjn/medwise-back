const pool = require('./src/utils/db');

async function createTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      nome_completo VARCHAR(255) NOT NULL,
      ndni VARCHAR(20) NOT NULL,
      data_nascimento DATE NOT NULL,
      sexo VARCHAR(10) NOT NULL,
      aceita_termos BOOLEAN NOT NULL
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

// createTables().catch(console.error);

module.exports = { createTables };