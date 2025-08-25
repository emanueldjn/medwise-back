const bcrypt = require('bcrypt');
const users = require('../models/userModel');

async function registerUser(username, password) {
  if (users.find(u => u.username === username)) {
    throw new Error('Usuário já existe.');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  return { message: 'Usuário registrado com sucesso.' };
}

async function loginUser(username, password) {
  const user = users.find(u => u.username === username);
  if (!user) {
    throw new Error('Usuário não encontrado.');
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error('Senha incorreta.');
  }
  return { message: 'Login realizado com sucesso.' };
}

function deleteUser(username) {
  const index = users.findIndex(u => u.username === username);
  if (index === -1) {
    throw new Error('Usuário não encontrado.');
  }
  users.splice(index, 1);
  return { message: 'Usuário apagado com sucesso.' };
}

module.exports = { registerUser, loginUser, deleteUser };
