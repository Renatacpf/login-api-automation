// src/controllers/loginController.js

const loginService = require('../services/loginService');

function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Login e senha obrigatórios' });
  }
  const result = loginService.validateLogin(username, password);
  if (result.success) {
    return res.status(200).json({ token: result.token });
  }
  return res.status(401).json({ message: result.message });
}

module.exports = { login };
