const chai = require('chai');
const sinon = require('sinon');
const supertest = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { expect } = chai;

const loginController = require('../src/controllers/loginController');
const loginService = require('../src/services/loginService');

const app = express();
app.use(bodyParser.json());
app.post('/login', loginController.login);

describe('Login API - Isolando Controller do Service', () => {
  let validateLoginStub;

  beforeEach(() => {
    validateLoginStub = sinon.stub(loginService, 'validateLogin');
  });

  afterEach(() => {
    validateLoginStub.restore();
  });

  it('1. Login com credenciais válidas deve retornar 200 e um token fake (Service Mocked)', async () => {
    validateLoginStub.returns({ success: true, token: 'mock-jwt-token' });

    const res = await supertest(app)
      .post('/login')
      .send({ username: 'user1', password: 'password1' });

    expect(validateLoginStub.calledOnce).to.be.true;
    expect(validateLoginStub.calledWith('user1', 'password1')).to.be.true;

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token', 'mock-jwt-token');
  });

  it('2. Login com senha incorreta deve retornar 401 e mensagem (Service Mocked)', async () => {
    validateLoginStub.returns({ success: false, message: 'Senha incorreta' });

    const res = await supertest(app)
      .post('/login')
      .send({ username: 'user1', password: 'wrongpass' });

    expect(validateLoginStub.calledOnce).to.be.true;
    expect(validateLoginStub.calledWith('user1', 'wrongpass')).to.be.true;

    expect(res.status).to.equal(401);
    expect(res.body).to.have.property('message', 'Senha incorreta');
  });

  it('3. Login com usuário inexistente deve retornar 401 e mensagem (Service Mocked)', async () => {
    validateLoginStub.returns({ success: false, message: 'Usuário não encontrado' });

    const res = await supertest(app)
      .post('/login')
      .send({ username: 'naoexiste', password: 'qualquer' });

    expect(validateLoginStub.calledOnce).to.be.true;
    expect(validateLoginStub.calledWith('naoexiste', 'qualquer')).to.be.true;

    expect(res.status).to.equal(401);
    expect(res.body).to.have.property('message', 'Usuário não encontrado');
  });

  it('4. Requisição sem senha deve retornar 400 (Controller valida, Service não é chamado)', async () => {
    const res = await supertest(app)
      .post('/login')
      .send({ username: 'user1' });

    expect(validateLoginStub.notCalled).to.be.true;

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('message', 'Login e senha obrigatórios');
  });

  it('5. Requisição sem usuário deve retornar 400 (Controller valida, Service não é chamado)', async () => {
    const res = await supertest(app)
      .post('/login')
      .send({ password: 'password1' });

    expect(validateLoginStub.notCalled).to.be.true;

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('message', 'Login e senha obrigatórios');
  });
});
