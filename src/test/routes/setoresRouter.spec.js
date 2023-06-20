import { describe, expect, it, afterAll } from '@jest/globals';
import mongoose from 'mongoose';
import app from '../../app.js';
import request from 'supertest';

let server;





const exampleTest = {
  nome: 'setor Padrao',
  bloco: 'Bloco Padrao',
  ativo: true
};
const userlogin = {
  email: "usuario@login.com",
  senha: "senha123"
}


describe('Testes de Rotas em Setores', () => {
  let setorId;
  let token;
  it("Deve autenticar o usuário e retornar um token", async () => {
      const resposta = await request(app)
          .post('/login')
          .send(userlogin)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .expect('Content-Type', /json/)
          .expect(200);

      expect(resposta.body.token).toBeDefined();
      token = resposta.body.token;
  });
  it('Deve cadastrar um setor', async () => {
    const response = await request(app)
      .post('/setores')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Setor para seed',
        bloco: 'Bloco do Setor',
        ativo: true
      })
      .expect(201);

    setorId = response.body._id;
  });

  it('Deve retornar um setor', async () => {
    const response = await request(app)
      .get('/setores')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    const { body } = response;
    expect(body.docs[0].nome).toEqual(exampleTest.nome);
    expect(body.docs[0].bloco).toEqual(exampleTest.bloco);
    expect(body.docs[0].ativo).toEqual(true);
  });

  it('Deve retornar um setor por ID', async () => {
    const response = await request(app)
      .get(`/setores/${setorId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.nome).toContain('Setor para seed');
  });

  it('Deve atualizar um setor existente', async () => {
    const novoSetor = {
    nome: 'Novo Nome do Setor',
    bloco: 'Novo Bloco do Setor',
    ativo: true}
    const response = await request(app)
      .put(`/setores/${setorId}`)
      .send(novoSetor)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

      expect(response.body.nome).toEqual(novoSetor.nome);
      expect(response.body.bloco).toEqual(novoSetor.bloco);
      expect(response.body.ativo).toBe(novoSetor.ativo);
  });

  it('Deve atualizar setor cadastrado', async () => {
    const novoNome = 'Novo Nome Novo';
    const response = await request(app)
      .patch(`/setores/${setorId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({nome:novoNome})
      .expect(200);

    expect(response.body.nome).toEqual(novoNome);
    expect(response.body.bloco).toEqual('Novo Bloco do Setor');
    expect(response.body.ativo).toBe(true);
  });

  it('Deve realizar um delete no id', async () => {
    await request(app)
      .delete(`/setores/${setorId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

});

