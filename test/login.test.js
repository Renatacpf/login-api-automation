const chai = require('chai');
const supertest = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { expect } = chai;

const loginController = require('../src/controllers/loginController');

// Configuração do servidor Express para os testes
const app = express();
app.use(bodyParser.json());
app.post('/login', loginController.login);

describe('Login API', () => {
  
  // Teste 1: Login com sucesso
  it('Login com credenciais válidas deve retornar 200 e um token', async () => {
    const res = await supertest(app)
      .post('/login')
      .send({ username: 'user1', password: 'password1' });
      
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token', 'fake-jwt-token');
  });

  // Teste 2: Senha incorreta
  it('Login com senha incorreta deve retornar 401', async () => {
    const res = await supertest(app)
      .post('/login')
      .send({ username: 'user1', password: 'wrongpass' });
      
    expect(res.status).to.equal(401);
    expect(res.body).to.have.property('message', 'Senha incorreta');
  });

  // Teste 3: Usuário inexistente
  it('Login com usuário inexistente deve retornar 401', async () => {
    const res = await supertest(app)
      .post('/login')
      .send({ username: 'naoexiste', password: 'qualquer' });
      
    expect(res.status).to.equal(401);
    expect(res.body).to.have.property('message', 'Usuário não encontrado');
  });

  // Teste 4: Requisição sem senha
  it('Requisição sem senha deve retornar 400', async () => {
    const res = await supertest(app)
      .post('/login')
      .send({ username: 'user1' });
      
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('message', 'Login e senha obrigatórios');
  });
  
  // Teste 5: Requisição sem usuário
  it('Requisição sem usuário deve retornar 400', async () => {
    const res = await supertest(app)
      .post('/login')
      .send({ password: 'password1' });
      
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('message', 'Login e senha obrigatórios');
  });
});