const bcrypt = require('bcrypt');
const pool = require('../utils/db');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'medwise_secret';

async function registerUser({ nome_completo, email, password, ndni, data_nascimento, sexo, aceita_termos }) {
  const existing = await pool.query('SELECT * FROM users WHERE email = $1 OR ndni = $2', [email, ndni]);
  // Verifica se email já existe
  const emailExists = await pool.query('SELECT 1 FROM users WHERE email = $1', [email]);
  if (emailExists.rows.length > 0) {
    throw new Error('Email já cadastrado.');
  }
  // Verifica se ndni já existe
  const ndniExists = await pool.query('SELECT 1 FROM users WHERE ndni = $1', [ndni]);
  if (ndniExists.rows.length > 0) {
    throw new Error('DNI já cadastrado.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await pool.query(
    `INSERT INTO users (nome_completo, email, password, ndni, data_nascimento, sexo, aceita_termos)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [nome_completo, email, hashedPassword, ndni, data_nascimento, sexo, aceita_termos]
  );

  // Busca o usuário recém-criado (sem a senha)
  const user = await pool.query(
    'SELECT id, nome_completo, email, ndni, data_nascimento, sexo, aceita_termos FROM users WHERE email = $1',
    [email]
  );
  return { message: 'Usuário registrado com sucesso.', user: user.rows[0] };
}

async function loginUser(email, password) {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];
  if (!user) throw new Error('Usuário não encontrado.');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Senha incorreta.');

  // Gera o token JWT
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '7d' });
  return {
    message: 'Login realizado com sucesso.',
    token,
    nome_completo: user.nome_completo,
    email: user.email,
    ndni: user.ndni,
    data_nascimento: user.data_nascimento,
    sexo: user.sexo,
    foto_perfil: user.foto_perfil
  };
}

async function deleteUser(email) {
  const result = await pool.query('DELETE FROM users WHERE email = $1 RETURNING *', [email]);
  if (result.rowCount === 0) throw new Error('Usuário não encontrado.');
  return { message: 'Usuário apagado com sucesso.' };
}

async function updateUser({ id, nome_completo, email, biografia, foto_perfil }) {
  // Atualiza apenas os campos enviados
  const fields = [];
  const values = [];
  let idx = 1;
  if (nome_completo) { fields.push(`nome_completo = $${idx}`); values.push(nome_completo); idx++; }
  if (email) { fields.push(`email = $${idx}`); values.push(email); idx++; }
  if (biografia) { fields.push(`biografia = $${idx}`); values.push(biografia); idx++; }
  if (foto_perfil) { fields.push(`foto_perfil = $${idx}`); values.push(foto_perfil); idx++; }
  if (fields.length === 0) throw new Error('Nenhum campo para atualizar.');
  values.push(id);
  const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${idx}`;
  await pool.query(query, values);
}

module.exports = { registerUser, loginUser, deleteUser, updateUser };
