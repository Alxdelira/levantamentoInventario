import { describe, expect, it, jest, afterAll} from '@jest/globals';
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

describe('Testes de Rotas em Itens', () => {
    let itensId;

    it("Deve cadastrar um novo iten", async () => {
        const resposta = await request(app)
            .post('/itens')
            .send(itensTeste)
            .set('Accept', 'application/json')
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
            .expect('Content-Type', /json/)
            .expect(200);

        expect(resposta.body.docs.length).toBeGreaterThan(0);
    });

    it("Deve retornar um Item específico", async () => {
        const resposta = await request(app)
            .get(`/itens/${itensId}`)
            .set('Accept', 'application/json')
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
            .expect('Content-Type', /json/)
            .expect(200);

        expect(resposta.body._id).toEqual(itensId);
        expect(resposta.body.responsavel).toEqual(novoResponsavel);
        

    });

    it("Deve deletar um usuário", async () => {
        await request(app)
          .delete(`/itens/${itensId}`)
          .set('Accept', 'application/json')
          .expect(204);
    
        // Verifica se o usuário foi realmente deletado
        const resposta = await request(app)
          .get(`/usuarios/${itensId}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404);
    
        expect(resposta.body.error).toBe(true);
        expect(resposta.body.code).toEqual(404);
        expect(resposta.body.message).toEqual("Usuário não encontrado");
      });
});
