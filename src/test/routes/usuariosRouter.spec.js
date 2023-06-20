import { describe, expect, it, jest, beforeEach, afterAll, afterEach } from '@jest/globals';
import mongoose from "mongoose";
import app from '../../app.js';
import request from "supertest";
import faker from 'faker-br';

/*
  .post("/login", LoginController.login)
*/

/*
  .get("/usuarios", UsuarioController.listarUsuarios)
  .get("/usuarios/:id", UsuarioController.listarUsuarioPorId)
  .post("/usuarios", UsuarioController.cadastrarUsuario)
  .put("/usuarios/:id", UsuarioController.atualizarUsuario)
  .patch("/usuarios/:id", UsuarioController.atualizarUsuarioParcialmente)
  .delete("/usuarios/:id", UsuarioController.deletarUsuario)
*/

let server;

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

const nome = faker.name.firstName();
const nome_meio = faker.name.lastName();
const sobrenome = faker.name.lastName();
const emailcad = `${nome}.${sobrenome}@gmail.com`;

const exemploTeste = {
  nome: `${nome} ${nome_meio} ${sobrenome}`,
  email: emailcad,
  senha: "12345678",
  ativo: true,
  rota: [
    {
      rota: "rotas",
      ativo: true,
      verbos: {
        get: true,
        put: true,
        patch: true,
        delete: true,
        post: true
      }
    }
  ]
}

const userlogin = {
  email: "usuario@login.com",
  senha: "senha123"
}


describe('Testes de Rotas em Usuarios', () => {
  let usuarioId;
  let token;
  it("Deve autenticar o usuário e retornar um token", async () => {
    const resposta = await request(app)
      .post('/login')
      .send(userlogin)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(resposta.body.token).toBeDefined();
    token = resposta.body.token;
  });
  it("Deve retornar erro de autenticação", async () => {
    const resposta = await request(app)
      .post('/login')
      .send({ email: "emailNoExist@gmail.com", senha: "senha123" })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404);
    expect(resposta.body.token).not.toBeDefined();
    expect(resposta.body.message).toEqual("Usuário e/ou senha inválidos");
  });

  it("Deve retornar erro de autenticação", async () => {
    const resposta = await request(app)
      .post('/login')
      .send({ email: userlogin.email, senha: "senha1234" })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);
    expect(resposta.body.token).not.toBeDefined();
    expect(resposta.body.message).toEqual("Usuário e/ou senha inválidos");
  });

  it("Deve retornar erro de autenticação", async () => {
    const resposta = await request(app)
      .post('/login')
      .send({ email: userlogin.email, senha: "" })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);
    expect(resposta.body.token).not.toBeDefined();
    expect(resposta.body.message).toEqual("Usuário e/ou senha inválidos");
  });

  it ("Deve retornar erro de autenticação não Autorizado", async () => {
    const resposta = await request(app)
      .post('/usuarios')
      .send(exemploTeste)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);
    expect(resposta.body.token).not.toBeDefined();
    expect(resposta.body.message).toEqual("Não autorizado");
  });

  it("Deve cadastrar um novo usuário", async () => {
    const resposta = await request(app)
      .post('/usuarios')
      .send(exemploTeste)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(resposta.body.nome).toEqual(exemploTeste.nome);
    expect(resposta.body.senha.length).toBeGreaterThan(7);
    expect(resposta.body.email).toEqual(exemploTeste.email);
    expect(resposta.body.ativo).toEqual(exemploTeste.ativo);

    usuarioId = resposta.body._id;
  });
  it("Deve retornar a lista de usuários", async () => {
    const resposta = await request(app)
      .get('/usuarios')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(resposta.body.docs.length).toBeGreaterThan(0);
  });

  it ("Deve retornar filtro de usuários", async () => {
    const resposta = await request(app)
      .get(`/usuarios?nome=${nome}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(resposta.body.docs.length).toBeGreaterThan(0);
  });

  it ("Deve retornar filtro de usuários", async () => {
    const resposta = await request(app)
      .get(`/usuarios?nome=${nome}&email=${emailcad}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(resposta.body.docs.length).toBeGreaterThan(0);
  });

  it("Deve retornar um usuário específico", async () => {
    const resposta = await request(app)
      .get(`/usuarios/${usuarioId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(resposta.body._id).toEqual(usuarioId);
    expect(resposta.body.nome).toEqual(exemploTeste.nome);
    expect(resposta.body.email).toEqual(exemploTeste.email);
    expect(resposta.body.ativo).toEqual(exemploTeste.ativo);
  });

  it("Deve atualizar um usuário", async () => {
    const novoUsuario = {
      nome: "João de Nobrega",
      email: "Joao.nobrega.2@gmail.com",
      senha: 87654321,
      ativo: true,
    };
    const resposta = await request(app)
      .put(`/usuarios/${usuarioId}`)
      .send(novoUsuario)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(resposta.body._id).toEqual(usuarioId);
    expect(resposta.body.nome).toEqual(novoUsuario.nome);
    expect(resposta.body.email).toEqual(novoUsuario.email);
    expect(resposta.body.ativo).toBe(true);

  });

  it("Deve atualizar parcialmente um usuário", async () => {
    const novoEmail = `novoemail${faker.random.number()}@gmail.com`;
    const resposta = await request(app)
      .patch(`/usuarios/${usuarioId}`)
      .send({ email: novoEmail })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(resposta.body._id).toEqual(usuarioId);
    expect(resposta.body.email).toEqual(novoEmail);
    expect(resposta.body.ativo).toEqual(exemploTeste.ativo);
  });

  it("Deve deletar um usuário", async () => {
    await request(app)
      .delete(`/usuarios/${usuarioId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    // Verifica se o usuário foi realmente deletado
    const resposta = await request(app)
      .get(`/usuarios/${usuarioId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(404);

    expect(resposta.body.error).toBe(true);
    expect(resposta.body.code).toEqual(404);
    expect(resposta.body.message).toEqual("Usuário não encontrado");
  });
});  
