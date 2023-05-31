import { describe, expect, it, jest, beforeEach, afterAll, afterEach } from '@jest/globals';
import mongoose from "mongoose";
import app from '../app.js';
import request from "supertest";

/*
  .get("/inventarios", InventarioController.listarInventarios)
 
*/


const exempleTeste = {
    item: {
        _id: "64631a6b4f997724fdb78e74"
    },
    setor: "64631a694f997724fdb78e60",
    bloco: "4f7271756573747261646f72",
}


describe('/GET em Iventarios', () => {
    it("Deve retornar uma lista de Iventario", async () => {
        const dados = await request(app)
            .get('/inventarios')
            .set('Accept', 'aplication/json')
            .expect('content-type', /json/)
            .expect(200);
        console.log(dados._body.docs[0]);
        expect(dados._body.docs[0].item).toEqual(exempleTeste.item);
        expect(dados._body.docs[0].setor).toEqual(exempleTeste.setor);
        expect(dados._body.docs[0].bloco).toEqual(exempleTeste.bloco);
    });

});
