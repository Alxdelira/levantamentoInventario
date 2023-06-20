import { describe, expect, it, jest, beforeEach, afterAll, afterEach } from '@jest/globals';
import mongoose from "mongoose";
import app from '../../app.js';
import request from "supertest";



/*
  .get("/rotas", RotaController.listarRotas)
  .get("/rotas/:id", RotaController.listarRotaPorId)
  .post("/rotas", RotaController.cadastrarRota)
  .put("/rotas/:id", RotaController.atualizarRota)
  .patch("/rotas/:id", RotaController.atualizarRotaParcialmente)
  .delete("/rotas/:id", RotaController.deletarRota)
*/



let rotas_array = [
  'setores', 'itens',
  'usuarios', 'iventarios'
]

const exemploTeste = {
  rota: rotas_array.toString(1),
  ativo: true,
  verbo_get: true,
  verbo_put: true,
  verbo_patch: true,
  verbo_delete: true,
  verbo_post: true,
}
const userlogin = {
  email: "usuario@login.com",
  senha: "senha123"
}




describe('Teste em rotas de rotas', () => {
  let rota_id;
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
  it('Deve cadastrar uma rota', async () => {
    const response = await request(app)
      .post("/rotas")
      .send(exemploTeste)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(201)
    expect(response.body).toEqual(
      expect.objectContaining(exemploTeste)
    );
    rota_id = response.body._id;
  });

  it('Deve listar todas as rotas', async () => {
    const response = await request(app)
      .get("/rotas")
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      expect(response.body.docs.length).toBeGreaterThan(0);
  });

  it('Deve listar uma rota por id', async () => {
    const response = await request(app)
      .get(`/rotas/${rota_id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
    expect(response.body).toEqual(
      expect.objectContaining(exemploTeste)
    );
  });

  it('Deve atualizar uma rota', async () => {
    const novaRotas = {
      rota: "nova rota",
      ativo: false,
      verbo_get: false,
      verbo_put: false,
      verbo_patch: false,
      verbo_delete: true,
      verbo_post: false,
    }
    const response = await request(app)
      .put(`/rotas/${rota_id}`)
      .send(novaRotas)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
    expect(response.body).toEqual(
      expect.objectContaining(novaRotas)
    );
  });

  it('Deve atualizar parcialmente uma rota', async () => {
    const response = await request(app)
      .patch(`/rotas/${rota_id}`)
      .send(exemploTeste.verbo_post = false)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
    expect(response.body.verbo_post).toBe(false);
  });

  it('Deve deletar uma rota', async () => {
    const response = await request(app)
      .delete(`/rotas/${rota_id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
    expect(response.body).toEqual(
      expect.objectContaining({ message: "Rota removida com sucesso" }));
  });

});