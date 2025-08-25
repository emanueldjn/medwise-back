// Modelo de perguntas para PostgreSQL
// id, materia, tema, pergunta, alternativas, resposta_correta

const pool = require('../utils/db');

async function createQuestionTable() {
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
}

async function insertQuestion({ materia, tema, pergunta, alternativas, resposta_correta }) {
  await pool.query(
    'INSERT INTO questions (materia, tema, pergunta, alternativas, resposta_correta) VALUES ($1, $2, $3, $4, $5)',
    [materia, tema, pergunta, alternativas, resposta_correta]
  );
}

module.exports = { createQuestionTable, insertQuestion };
