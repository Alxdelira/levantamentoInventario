import { describe, expect, it, jest } from '@jest/globals';
import app from '../../app.js';
import request from "supertest";
import faker from 'faker-br';


const itensTeste = {
    etiqueta: faker.random.number({ min: 1, max: 9999 }),
    naoEtiquetado: false,
    encontrado: true,
    nome: faker.name.firstName(),
    setor: '67890eb3ae8056e6f65dec8c',
    estado: "Em condições de uso",
    descricao: faker.lorem.sentence(),
    responsavel: faker.name.findName(),
    image: faker.image.imageUrl(),
    ativo: true,
}

const userlogin = {
    email: "usuario@login.com",
    senha: "senha123"
}
describe('Testes de Rotas em Itens', () => {
    let itensId;
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

    it("Deve cadastrar um novo iten", async () => {
        const resposta = await request(app)
            .post('/itens')
            .send(itensTeste)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(201);

        expect(resposta.body.etiqueta).toEqual(itensTeste.etiqueta);
        expect(resposta.body.naoEtiquetado).toBe(itensTeste.naoEtiquetado);
        expect(resposta.body.encontrado).toBe(itensTeste.encontrado);
        expect(resposta.body.nome).toEqual(itensTeste.nome);
        expect(resposta.body.setor).toEqual(itensTeste.setor);
        expect(resposta.body.estado).toEqual(itensTeste.estado);
        expect(resposta.body.descricao).toEqual(itensTeste.descricao);
        expect(resposta.body.responsavel).toEqual(itensTeste.responsavel);
        expect(resposta.body.image).toEqual(itensTeste.image);
        expect(resposta.body.ativo).toBe(itensTeste.ativo);

        itensId = resposta.body._id;
    });

    it("Deve retornar a lista de Itens", async () => {
        const resposta = await request(app)
            .get('/itens')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(resposta.body.docs.length).toBeGreaterThan(0);
    });

    it("Deve retornar uma pesquisa de Itens", async () => {
        const resposta = await request(app)
            .get(`/itens?nome=${itensTeste.nome}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(resposta.body.docs.length).toBeGreaterThan(0);
    });

    it("Deve retornar uma pesquisa de Itens por Etiqueta", async () => {
        const resposta = await request(app)
            .get(`/itens?etiqueta=${itensTeste.etiqueta}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(resposta.body.docs.length).toBeGreaterThan(0);
    });

    it("Deve retornar uma pesquisa de Itens por Setor", async () => {
        const resposta = await request(app)
            .get(`/itens?setor=${itensTeste.setor}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);


        expect(resposta.body.docs.length).toBeGreaterThan(0);
    });

    it("Deve retornar uma pesquisa de Itens por Responsável", async () => {
        const resposta = await request(app)
            .get(`/itens?responsavel=${itensTeste.responsavel}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);


        expect(resposta.body.docs.length).toBeGreaterThan(0);
    });

    it("Deve retornar uma pesquisa de Itens por Estado", async () => {
        const resposta = await request(app)
            .get(`/itens?estado=${itensTeste.estado}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);


        expect(resposta.body.docs.length).toBeGreaterThan(0);
    });

    it("Deve retornar uma pesquisa de Itens por Ativo", async () => {
        const resposta = await request(app)
            .get(`/itens?ativo=${itensTeste.ativo}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);


        expect(resposta.body.docs.length).toBeGreaterThan(0);
    });

    it("Deve retornar uma pesquisa de Itens por Não Etiquetado", async () => {
        const resposta = await request(app)
            .get(`/itens?naoEtiquetado=${itensTeste.naoEtiquetado}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);


        expect(resposta.body.docs.length).toBeGreaterThan(0);
    });

    it("Deve retornar uma pesquisa de Itens por Encontrado", async () => {
        const resposta = await request(app)
            .get(`/itens?encontrado=${itensTeste.encontrado}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(resposta.body.docs.length).toBeGreaterThan(0);
    });

    it("Deve retornar uma pesquisa de Itens por Descrição", async () => {
        const resposta = await request(app)
            .get(`/itens?descricao=${itensTeste.descricao}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);


        expect(resposta.body.docs.length).toBeGreaterThan(0);
    });

    it("Deve retornar uma pesquisa de Itens por Nome e Etiqueta", async () => {
        const resposta = await request(app)
            .get(`/itens?nome=${itensTeste.nome}&etiqueta=${itensTeste.etiqueta}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);


        expect(resposta.body.docs.length).toBeGreaterThan(0);
    });


    it("Deve retornar uma pesquisa de Itens por Nome e Setor", async () => {
        const resposta = await request(app)
            .get(`/itens?nome=${itensTeste.nome}&setor=${itensTeste.setor}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);


        expect(resposta.body.docs.length).toBeGreaterThan(0);
    });


    it("Deve retornar uma pesquisa de Itens por Nome e Responsável", async () => {
        const resposta = await request(app)
            .get(`/itens?nome=${itensTeste.nome}&responsavel=${itensTeste.responsavel}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);


        expect(resposta.body.docs.length).toBeGreaterThan(0);
    });


    it("Deve retornar uma pesquisa de Itens por Nome e Estado", async () => {
        const resposta = await request(app)
            .get(`/itens?nome=${itensTeste.nome}&estado=${itensTeste.estado}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(resposta.body.docs.length).toBeGreaterThan(0);
    });


    it("Deve retornar uma pesquisa de Itens por Nome e Ativo", async () => {
        const resposta = await request(app)
            .get(`/itens?nome=${itensTeste.nome}&ativo=${itensTeste.ativo}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(resposta.body.docs.length).toBeGreaterThan(0);

    });

    it("Deve retornar uma pesquisa de Itens por Nome e Não Etiquetado", async () => {
        const resposta = await request(app)
            .get(`/itens?nome=${itensTeste.nome}&naoEtiquetado=${itensTeste.naoEtiquetado}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(resposta.body.docs.length).toBeGreaterThan(0);
    });

    it("Deve retornar uma pesquisa de Itens por Nome e Encontrado", async () => {
        const resposta = await request(app)
            .get(`/itens?nome=${itensTeste.nome}&encontrado=${itensTeste.encontrado}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);


        expect(resposta.body.docs.length).toBeGreaterThan(0);
    });

    it("Deve retornar uma pesquisa de Itens por Etiqueta e Setor", async () => {
        const resposta = await request(app)
            .get(`/itens?etiqueta=${itensTeste.etiqueta}&setor=${itensTeste.setor}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)


        expect(resposta.body.docs.length).toBeGreaterThan(0);
    });

    it("Deve retornar uma pesquisa de Itens por Etiqueta e Responsável", async () => {
        const resposta = await request(app)
            .get(`/itens?etiqueta=${itensTeste.etiqueta}&responsavel=${itensTeste.responsavel}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)


        expect(resposta.body.docs.length).toBeGreaterThan(0);
    });

  

    it("Deve retornar um Item específico", async () => {
        const resposta = await request(app)
            .get(`/itens/${itensId}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(resposta.body._id).toEqual(itensId);
        expect(resposta.body.etiqueta).toEqual(itensTeste.etiqueta);
        expect(resposta.body.naoEtiquetado).toBe(itensTeste.naoEtiquetado);
        expect(resposta.body.encontrado).toBe(itensTeste.encontrado);
        expect(resposta.body.nome).toEqual(itensTeste.nome);
        expect(resposta.body.setor).toEqual(itensTeste.setor);
        expect(resposta.body.estado).toEqual(itensTeste.estado);
        expect(resposta.body.descricao).toEqual(itensTeste.descricao);
        expect(resposta.body.responsavel).toEqual(itensTeste.responsavel);
        expect(resposta.body.image).toEqual(itensTeste.image);
        expect(resposta.body.ativo).toBe(itensTeste.ativo);

    });

    it("Deve atualizar um Item", async () => {
        const novoItem = {
            etiqueta: itensTeste.etiqueta,
            naoEtiquetado: false,
            encontrado: true,
            nome: faker.name.firstName(),
            setor: '67890eb3ae6056e6f65dec8c',
            estado: "Em condições de uso",
            descricao: faker.lorem.sentence(),
            responsavel: faker.name.findName(),
            image: faker.image.imageUrl(),
            ativo: true,
        };
        const resposta = await request(app)
            .put(`/itens/${itensId}`)
            .send(novoItem)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(resposta.body._id).toEqual(itensId);
        expect(resposta.body.etiqueta).toEqual(novoItem.etiqueta);
        expect(resposta.body.naoEtiquetado).toBe(novoItem.naoEtiquetado);
        expect(resposta.body.encontrado).toBe(novoItem.encontrado);
        expect(resposta.body.nome).toEqual(novoItem.nome);
        expect(resposta.body.setor).toEqual(novoItem.setor);
        expect(resposta.body.estado).toEqual(novoItem.estado);
        expect(resposta.body.descricao).toEqual(novoItem.descricao);
        expect(resposta.body.responsavel).toEqual(novoItem.responsavel);
        expect(resposta.body.image).toEqual(novoItem.image);
        expect(resposta.body.ativo).toBe(novoItem.ativo);

    });

    it("Deve atualizar Parcialmente um Item", async () => {
        const novoResponsavel = "Barba Negra"
        const resposta = await request(app)
            .patch(`/itens/${itensId}`)
            .send({ responsavel: novoResponsavel })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(resposta.body._id).toEqual(itensId);
        expect(resposta.body.responsavel).toEqual(novoResponsavel);


    });

    it("Deve deletar um usuário", async () => {
        await request(app)
            .delete(`/itens/${itensId}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        // Verifica se o usuário foi realmente deletado
        const resposta = await request(app)
            .get(`/itens/${itensId}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(404);

        expect(resposta.body.error).toBe(true);
        expect(resposta.body.code).toEqual(404);
        expect(resposta.body.message).toEqual("Item não encontrado");
    });
});