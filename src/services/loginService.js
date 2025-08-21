// src/services/loginService.js

const users = require('../models/userModel');

function validateLogin(username, password) {
  const user = users.find(u => u.username === username);
  if (!user) return { success: false, message: 'Usuário não encontrado' };
  if (user.password !== password) return { success: false, message: 'Senha incorreta' };
  return { success: true, token: 'fake-jwt-token' };
}

module.exports = { validateLogin };
