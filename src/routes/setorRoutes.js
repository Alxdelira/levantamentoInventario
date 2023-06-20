import express from "express";
import SetorController from "../controller/setorController.js";
import AuthMiddlewares from "../middlewares/AuthMiddleware.js";


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Setores
 *   description: Rotas relacionadas aos setores
 * components:
 *   schemas:
 *     Setores:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *         bloco:
 *           type: string
 *         ativo:
 *           type: boolean
 *       required:
 *         - nome
 *         - bloco
 *         - ativo         
 */


/**
 * @swagger
 * tags:
 *   name: Setores
 *   description: Rotas relacionadas a Setores.
 * /setores:
 *   get:
 *     summary: Lista todos os Setores
 *     tags: [Setores]
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Nome do Setor
 *       - in: query
 *         name: bloco
 *         schema:
 *           type: string
 *         description: Bloco do Setor
 *       - in: query
 *         name: ativo
 *         schema:
 *           type: boolean
 *         description: Status do Setor
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número da página
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *         description: Quantidade de itens por página
 *     responses:
 *       200:
 *         description: Lista de Setores
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Setor não encontrado
 *       500:
 *         description: Erro interno no servidor
 *   post:
 *     summary: Cadastra um novo Setor
 *     tags: [Setores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Setores'
 *           example:
 *             nome: "Setor de teste"
 *             bloco: "Bloco de teste"
 *             ativo: true
 *     responses:
 *       201:
 *         description: Setor cadastrado com sucesso
 *       400:
 *         description: Necessário preencher todos os campos corretamente
 *       401:
 *         description: Não autorizado
 *       409:
 *         description: Setor já cadastrado
 *       500:
 *         description: Erro interno no servidor
 * /setores/{id}:
 *   get:
 *     summary: Obtém um Setor pelo ID
 *     tags: [Setores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do Setor
 *     responses:
 *       200:
 *         description: Setor encontrado
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Setor não encontrado
 *       500:
 *         description: Erro interno no servidor
 *   put:
 *     summary: Atualiza um Setor pelo ID
 *     tags: [Setores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do Setor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Setores'
 *           example:
 *             nome: "setor atualizado Teste"
 *             bloco: "Bloco B"
 *             ativo: false
 *     responses:
 *       200:
 *         description: Setor atualizado com sucesso
 *       400:
 *         description: Necessário preencher todos os campos corretamente
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Setor não encontrado
 *       500:
 *         description: Erro interno no servidor
 *   patch:
 *     summary: Atualiza parcialmente um Setor pelo ID
 *     tags: [Setores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do Setor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Setores'
 *           example:
 *             nome: "Setor teste atualizado"
 *     responses:
 *       200:
 *         description: Setor atualizado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Setor não encontrado
 *       500:
 *         description: Erro interno no servidor
 *   delete:
 *     summary: Deleta um Setor pelo ID
 *     tags: [Setores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do Setor
 *     responses:
 *       200:
 *         description: Setor deletado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Setor não encontrado
 *       500:
 *         description: Erro interno no servidor
 */


router
    .get("/setores", AuthMiddlewares, SetorController.listarSetores)
    .get("/setores/:id", AuthMiddlewares, SetorController.listarSetoresPorId)
    .post("/setores", AuthMiddlewares, SetorController.cadastrarSetores)
    .put("/setores/:id", AuthMiddlewares, SetorController.atualizarSetoresPorId)
    .patch("/setores/:id", AuthMiddlewares, SetorController.atualizarSetoresParcial)
    .delete("/setores/:id", AuthMiddlewares, SetorController.deletarSetores)

export default router;
