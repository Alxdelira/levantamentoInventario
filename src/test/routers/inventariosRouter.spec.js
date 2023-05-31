import { describe, expect, it, jest } from '@jest/globals';
import mongoose from "mongoose";
import app from '../../app.js';
import request from "supertest";

/*
  .post('/inventarios',InventarioController.cadastrarInventario)
  .get('/inventarios', InventarioController.listarInventarios)
  .get('/inventarios/:id', InventarioController.listarInventariosId)
  .put('/inventarios/:id',InventarioController.atualizarInventario)
  .patch('/inventarios/:id',InventarioController.atualizarInventarioParcial)
  .delete('/inventarios/:id',InventarioController.deletarInventario)
 
*/


const exempleTeste = {
    setor: "64775eb4ae1234e6f65decc1",
    itens: [
        "64775eb4ae4321e6f65decc1",
        "64775eb4ae5678e6f65decc1"
    ],
    criadoEm: "2023-05-31T14:50:28.268Z",
}


describe('Teste de Rotas em Inventarios', () => {
    let idIventario;

    it("/.POST Deve cadastrar um novo inventario", async () => {
        const res = await request(app)
            .post('/inventarios')
            .send(exempleTeste)
            .set('Accept', 'aplication/json')
            .expect('content-type', /json/)
            .expect(201);
        console.log(res.body.itens)
        expect(res.body.setor).toEqual(exempleTeste.setor)
        expect(res.body.itens.length).toEqual(exempleTeste.itens.length)
        expect(res.body.criadoEm).toEqual(exempleTeste.criadoEm)

        idIventario = res.body._id;
        console.log(idIventario)
    });

    it("/.GET Deve retornar uma lista de Iventario", async () => {
        const res = await request(app)
            .get('/inventarios')
            .set('Accept', 'aplication/json')
            .expect('content-type', /json/)
            .expect(200);

        expect(res.body.docs.length).toBeGreaterThan(0);
    });

    it("/.GET/:id Deve retornar um inventario específico", async () => {
        const res = await request(app)
            .get(`/inventarios/${idIventario}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(res.body._id).toEqual(idIventario);
        expect(res.body.setor).toEqual(exempleTeste.setor);
        expect(res.body.itens.length).toEqual(exempleTeste.itens.length);
        expect(res.body.criadoEm).toEqual(exempleTeste.criadoEm);
    });

    it("/.PUT Deve atualizar um usuário", async () => {
        const novoInventario = {
            setor: "12345eb1ae8056e6f65dec84",
            itens: [
                "12345eb3ae8056e6f65dec8b",
                "12345eb3ae8056e6f65dec8c"
            ],
            criadoEm: "2023-05-31T14:50:28.268Z"
        };
        const res = await request(app)
            .put(`/inventarios/${idIventario}`)
            .send(novoInventario)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(res.body._id).toEqual(idIventario);
        expect(res.body.setor).toEqual(novoInventario.setor);
        expect(res.body.itens.length).toEqual(novoInventario.itens.length);
        expect(res.body.criadoEm).toEqual(novoInventario.criadoEm);

        console.log(novoInventario)
    });

    it("/.PATCH Deve atualizar parcialmente um inventario", async () => {
        exempleTeste.itens.push("67890eb3ae8056e6f65dec8c");
      
        const res = await request(app)
          .patch(`/inventarios/${idIventario}`)
          .send({ itens: exempleTeste.itens }) 
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200);
      
        expect(res.body._id).toEqual(idIventario);
        expect(res.body.itens.length).toEqual(exempleTeste.itens.length);
        console.log(exempleTeste.itens); 
      });
      



    it("Deve deletar um inventario", async () => {
        await request(app)
            .delete(`/inventarios/${idIventario}`)
            .set('Accept', 'application/json')
            .expect(204);

        // Verifica se o usuário foi realmente deletado
        const res = await request(app)
            .get(`/inventarios/${idIventario}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404);

        expect(res.body.error).toBe(true);
        expect(res.body.code).toEqual(404);
        expect(res.body.message).toEqual("Inventario não Encontrado!");
    });

});
