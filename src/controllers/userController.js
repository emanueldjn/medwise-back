const userService = require('../services/userService');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await userService.registerUser(username, password);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await userService.loginUser(username, password);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = (req, res) => {
  const { username } = req.params;
  try {
    const result = userService.deleteUser(username);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
