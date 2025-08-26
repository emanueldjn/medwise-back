const userService = require('../services/userService');


exports.register = async (req, res) => {
  const { nome_completo, email, password, ndni, data_nascimento, sexo, aceita_termos } = req.body;
  if (!nome_completo || !email || !password || !ndni || !data_nascimento || !sexo || aceita_termos !== true) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios e termos devem ser aceitos.' });
  }
  try {
    const result = await userService.registerUser({ nome_completo, email, password, ndni, data_nascimento, sexo, aceita_termos });
    res.status(201).json(result);
  } catch (err) {
    console.error('Erro no registro:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { nome_completo, email, biografia } = req.body;
  const id = req.params.id;
  let foto_perfil = null;
  if (req.file) {
    foto_perfil = req.file.path.replace(/\\/g, '/');
  }
  try {
    await userService.updateUser({ id, nome_completo, email, biografia, foto_perfil });
    res.json({ message: 'Perfil atualizado com sucesso.', foto_perfil });
  } catch (err) {
    console.error('Erro ao atualizar perfil:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await userService.loginUser(email, password);
    res.json(result);
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  const { email } = req.params;
  try {
    const result = await userService.deleteUser(email);
    res.json(result);
  } catch (err) {
    console.error('Erro ao apagar usuário:', err);
    res.status(400).json({ error: err.message });
  }
};
