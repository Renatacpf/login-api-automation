// test/login.test.js

const chai = require('chai');
const sinon = require('sinon');
const supertest = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { expect } = chai;

const loginController = require('../src/controllers/loginController');
const loginService = require('../src/services/loginService');

// Setup app for SuperTest
const app = express();
app.use(bodyParser.json());
app.post('/login', loginController.login);

describe('Login API', () => {
  it('Login com credenciais válidas (200 e token fake)', async () => {
    const res = await supertest(app)
      .post('/login')
      .send({ username: 'user1', password: 'password1' });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token', 'fake-jwt-token');
  });

  it('Login com senha incorreta', async () => {
    const res = await supertest(app)
      .post('/login')
      .send({ username: 'user1', password: 'wrongpass' });
    expect(res.status).to.equal(401);
    expect(res.body).to.have.property('message', 'Senha incorreta');
  });

  it('Login com usuário inexistente', async () => {
    const res = await supertest(app)
      .post('/login')
      .send({ username: 'naoexiste', password: 'qualquer' });
    expect(res.status).to.equal(401);
    expect(res.body).to.have.property('message', 'Usuário não encontrado');
  });

  it('Requisição sem login/senha', async () => {
    const res = await supertest(app)
      .post('/login')
      .send({});
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('message', 'Login e senha obrigatórios');
  });

  it('Controller está isolado do Service (mock com Sinon)', async () => {
    const serviceMock = sinon.stub(loginService, 'validateLogin').returns({ success: true, token: 'mock-token' });
    const req = { body: { username: 'qualquer', password: 'qualquer' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
    loginController.login(req, res);
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ token: 'mock-token' })).to.be.true;
    serviceMock.restore();
  });
});
