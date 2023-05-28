import { describe, expect, it, jest, beforeEach, afterAll, afterEach } from '@jest/globals';
import mongoose from "mongoose";
import app from '../app.js';
import request from "supertest";

/*
  .get("/usuarios", UsuarioController.listarUsuarios)
  .get("/usuarios/:id", UsuarioController.listarUsuarioPorId)
  .post("/usuarios", UsuarioController.cadastrarUsuario)
  .put("/usuarios/:id", UsuarioController.atualizarUsuario)
  .patch("/usuarios/:id", UsuarioController.atualizarUsuarioParcialmente)
  .delete("/usuarios/:id", UsuarioController.deletarUsuario)
*/

let server;
let token = false;

beforeEach(() => {
  const port = 3010;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

afterAll(() => {
  mongoose.connection.close();
});

const exemploTeste = {
  nome: "Gonçalo Macedo Carvalho",
  email: "gonçalo.carvalho@gmail.com",
  senha: "$2a$08$ZMAKPxPj9kxMvyEuSIWFMuFw/JzPY1i7Fn8Cvk9985VsC.770hT4S",
  ativo: true
};

describe('Testes em Usuarios', () => {
  let usuarioId;

  it("Deve cadastrar um novo usuário", async () => {
    const resposta = await request(app)
      .post('/usuarios')
      .send(exemploTeste)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);

    expect(resposta.body.nome).toEqual(exemploTeste.nome);
    expect(resposta.body.email).toEqual(exemploTeste.email);
    expect(resposta.body.ativo).toEqual(exemploTeste.ativo);

    usuarioId = resposta.body._id;
  });

  it.skip("Deve retornar a lista de usuários", async () => {
    const resposta = await request(app)
      .get('/usuarios')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(resposta.body.length).toBeGreaterThan(0);
  });

  it.skip("Deve retornar um usuário específico", async () => {
    const resposta = await request(app)
      .get(`/usuarios/${usuarioId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(resposta.body._id).toEqual(usuarioId);
    expect(resposta.body.nome).toEqual(exemploTeste.nome);
    expect(resposta.body.email).toEqual(exemploTeste.email);
    expect(resposta.body.ativo).toEqual(exemploTeste.ativo);
  });

  it.skip("Deve atualizar um usuário", async () => {
    const novoNome = "Novo Nome";
    const resposta = await request(app)
      .put(`/usuarios/${usuarioId}`)
      .send({ nome: novoNome })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(resposta.body._id).toEqual(usuarioId);
    expect(resposta.body.nome).toEqual(novoNome);
    expect(resposta.body.email).toEqual(exemploTeste.email);
    expect(resposta.body.ativo).toEqual(exemploTeste.ativo);
  });

  it.skip("Deve atualizar parcialmente um usuário", async () => {
    const novoEmail = "novoemail@gmail.com";
    const resposta = await request(app)
      .patch(`/usuarios/${usuarioId}`)
      .send({ email: novoEmail })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  
    expect(resposta.body._id).toEqual(usuarioId);
    expect(resposta.body.nome).toEqual(exemploTeste.nome);
    expect(resposta.body.email).toEqual(novoEmail);
    expect(resposta.body.ativo).toEqual(exemploTeste.ativo);
  });
  
  it.skip("Deve deletar um usuário", async () => {
    await request(app)
      .delete(`/usuarios/${usuarioId}`)
      .set('Accept', 'application/json')
      .expect(204);
  
    // Verifica se o usuário foi realmente deletado
    const resposta = await request(app)
      .get(`/usuarios/${usuarioId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404);
  
    expect(resposta.body.error).toBe(true);
    expect(resposta.body.code).toEqual(404);
    expect(resposta.body.message).toEqual("Usuário não encontrado");
  });
});  