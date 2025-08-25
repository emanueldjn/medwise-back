const userService = require('../services/userService');

exports.register = async (req, res) => {
  const { nome_completo, email, password, nDni, data_nascimento, sexo, aceita_termos } = req.body;
  try {
    const result = await userService.registerUser({ nome_completo, email, password, nDni, data_nascimento, sexo, aceita_termos });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await userService.loginUser(email, password);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  const { email } = req.params;
  try {
    const result = await userService.deleteUser(email);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
