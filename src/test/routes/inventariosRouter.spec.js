import { describe, expect, it, jest } from '@jest/globals';
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

const userlogin = {
    email: "usuario@login.com",
    senha: "senha123"
}



describe('Teste de Rotas em Inventarios', () => {
    let idIventario;
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

    it("/.POST Deve cadastrar um novo inventario", async () => {
        const res = await request(app)
            .post('/inventarios')
            .send(exempleTeste)
            .set('Accept', 'aplication/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('content-type', /json/)
            .expect(201);

        expect(res.body.setor).toEqual(exempleTeste.setor)
        expect(res.body.itens.length).toEqual(exempleTeste.itens.length)
        expect(res.body.criadoEm).toEqual(exempleTeste.criadoEm)

        idIventario = res.body._id;

    });

    it("Deve retornar erro ao tentar cadastrar um inventario sem o setor", async () => {
        const res = await request(app)
            .post('/inventarios')
            .send({
                itens: [
                    "64775eb4ae4321e6f65decc1",
                    "64775eb4ae5678e6f65decc1"
                ],
                criadoEm: "2023-05-31T14:50:28.268Z",
            })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(res.body).toEqual([{ setor: 'error', message: 'Setor não informado' }]);
    });

    it("Deve retornar erro ao tentar cadastrar um inventario sem os itens", async () => {
        const res = await request(app)
            .post('/inventarios')
            .send({
                setor: "64775eb4ae1234e6f65decc1",
                criadoEm: "2023-05-31T14:50:28.268Z",
            })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(res.body).toEqual([{ itens: 'error', message: 'Itens não informado' }]);
    });


    it("/.GET Deve retornar uma lista de Iventario", async () => {
        const res = await request(app)
            .get('/inventarios')
            .set('Accept', 'aplication/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('content-type', /json/)
            .expect(200);

        expect(res.body.docs.length).toBeGreaterThan(0);
    });

    it ("/.GET Deve retornar uma lista de Iventario filtrando por setor", async () => {
        const res = await request(app)
            .get('/inventarios/?setor=64775eb4ae1234e6f65decc1')
            .set('Accept', 'aplication/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('content-type', /json/)
            .expect(200);

        expect(res.body.docs.length).toBeGreaterThan(0);
    });

    it ("/.GET Deve retornar uma lista de Iventario filtrando por itens", async () => {
        const res = await request(app)
            .get('/inventarios/?itens=64775eb4ae4321e6f65decc1')
            .set('Accept', 'aplication/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('content-type', /json/)
            .expect(200);

        expect(res.body.docs.length).toBeGreaterThan(0);
    });

    it ("/.GET Deve retornar uma lista de Iventario filtrando por data", async () => {
        const res = await request(app)
            .get('/inventarios/?criadoEm=2023-05-31T14:50:28.268Z')
            .set('Accept', 'aplication/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('content-type', /json/)
            .expect(200);


        expect(res.body.docs.length).toBeGreaterThan(0);
    });

    it ("/.GET Deve retornar uma lista de Iventario filtrando por setor e itens", async () => {
        const res = await request(app)
            .get('/inventarios/?setor=64775eb4ae1234e6f65decc1&itens=64775eb4ae4321e6f65decc1')
            .set('Accept', 'aplication/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('content-type', /json/)
            .expect(200);

        expect(res.body.docs.length).toBeGreaterThan(0);
    });

    it ("/.GET Deve retornar uma lista de Iventario filtrando por setor e data", async () => {
        const res = await request(app)
            .get('/inventarios/?setor=64775eb4ae1234e6f65decc1&criadoEm=2023-05-31T14:50:28.268Z')
            .set('Accept', 'aplication/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('content-type', /json/)
            .expect(200);

        expect(res.body.docs.length).toBeGreaterThan(0);
    });

    it("/.GET Deve retornar erro ao tentar listar um inventario específico", async () => {
        const res = await request(app)
            .get('/inventarios/?setor=64775eb4ae0987e6f65decc1')
            .set('Accept', 'aplication/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('content-type', /json/)
            .expect(404);

        expect(res.body.message).toEqual('Não Encontrado!');
    });

    it("/.GET/:id Deve retornar um inventario específico", async () => {
        const res = await request(app)
            .get(`/inventarios/${idIventario}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(res.body._id).toEqual(idIventario);
        expect(res.body.setor).toEqual(exempleTeste.setor);
        expect(res.body.itens.length).toEqual(exempleTeste.itens.length);
        expect(res.body.criadoEm).toEqual(exempleTeste.criadoEm);
    });

    it("/.GET/:id Deve retornar erro ao tentar listar um inventario específico", async () => {
        const res = await request(app)
            .get('/inventarios/64775eb4ae0987e6f65decc1')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(404);

        expect(res.body.message).toEqual('Inventario não Encontrado!');
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
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(res.body._id).toEqual(idIventario);
        expect(res.body.setor).toEqual(novoInventario.setor);
        expect(res.body.itens.length).toEqual(novoInventario.itens.length);
        expect(res.body.criadoEm).toEqual(novoInventario.criadoEm);
    });

    it("/.PUT Deve retornar erro ao tentar atualizar um inventario sem setor", async () => {
        const novoInventario = {
            itens: [
                "12345eb3ae8056e6f65dec8b",
                "12345eb3ae8056e6f65dec8c"
            ],
            criadoEm: "2023-05-31T14:50:28.268Z"
        };
        const res = await request(app)
            .put(`/inventarios/12345eb1ae8056e6f65dec84`)
            .send(novoInventario)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(res.body).toEqual([{ setor: 'error', message: 'Setor não informado' }]);
    });

    it("/.PATCH Deve atualizar parcialmente um inventario", async () => {
        exempleTeste.itens.push("67890eb3ae8056e6f65dec8c");

        const res = await request(app)
            .patch(`/inventarios/${idIventario}`)
            .send({ itens: exempleTeste.itens })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(res.body._id).toEqual(idIventario);
        expect(res.body.itens.length).toEqual(exempleTeste.itens.length);

    });

    it("/.PATCH Deve retornar erro ao tentar atualizar parcialmente um inventario", async () => {
        const res = await request(app)
            .patch(`/inventarios/12345eb1ae8056e6f65dec84`)
            .send({ itens: exempleTeste.itens })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(404);

        expect(res.body.message).toEqual('Inventario não encontrado');
    });

    it("Deve deletar um inventario", async () => {
        await request(app)
            .delete(`/inventarios/${idIventario}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        // Verifica se o usuário foi realmente deletado
        const res = await request(app)
            .get(`/inventarios/${idIventario}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(404);

        expect(res.body.error).toBe(true);
        expect(res.body.code).toEqual(404);
        expect(res.body.message).toEqual("Inventario não Encontrado!");
    });

});
