// src/index.js

const express = require('express');
const bodyParser = require('body-parser');
const { login } = require('./controllers/loginController');

const app = express();
app.use(bodyParser.json());

app.post('/login', login);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
