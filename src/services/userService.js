
const bcrypt = require('bcrypt');
const pool = require('../utils/db');

async function registerUser({ nome_completo, email, password, nDni, data_nascimento, sexo, aceita_termos }) {
  // Verifica se email ou nDni já existem
  const existing = await pool.query('SELECT * FROM users WHERE email = $1 OR nDni = $2', [email, nDni]);
  if (existing.rows.length > 0) {
    throw new Error('Email ou DNI já cadastrado.');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query(
    `INSERT INTO users (nome_completo, email, password, nDni, data_nascimento, sexo, aceita_termos)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [nome_completo, email, hashedPassword, nDni, data_nascimento, sexo, aceita_termos]
  );
  return { message: 'Usuário registrado com sucesso.' };
}

async function loginUser(email, password) {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];
  if (!user) {
    throw new Error('Usuário não encontrado.');
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error('Senha incorreta.');
  }
  return { message: 'Login realizado com sucesso.' };
}

async function deleteUser(email) {
  const result = await pool.query('DELETE FROM users WHERE email = $1 RETURNING *', [email]);
  if (result.rowCount === 0) {
    throw new Error('Usuário não encontrado.');
  }
  return { message: 'Usuário apagado com sucesso.' };
}

module.exports = { registerUser, loginUser, deleteUser };
