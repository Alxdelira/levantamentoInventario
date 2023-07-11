import express from "express";
import InventarioController from "../controller/inventarioController.js";
import AuthMiddlewares from "../middlewares/AuthMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Inventarios
 *   description: Rotas relacionadas a Inventários.
 * components:
 *   schemas:
 *     Inventarios:
 *       type: object
 *       properties:
 *         setor:
 *           type: string
 *         itens:
 *           type: string
 *         criadoEm:
 *           type: string
 *       required:
 *         - setor
 *         - itens
 *         - criadoEm
 */


/**
 * @swagger
 * tags:
 *   name: Inventarios
 *   description: Rotas relacionadas a Inventários
 * /Inventarios:
 *   get:
 *     summary: Lista todos os Inventários
 *     tags: [Inventarios]
 *     parameters:
 *       - in: query
 *         name: setor
 *         schema:
 *           type: string
 *         description: Filtra pelo id do setor do Inventário
 *       - in: query
 *         name: itens
 *         schema:
 *           type: string
 *         description: Filtra pelo id do item do Inventário
 *       - in: query
 *         name: criadoEm
 *         schema:
 *           type: string
 *         description: Filtra pela data do Inventário (2023-05-31T22:50:37.893Z)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número da página
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *         description: Quantidade de registros por página
 *     responses:
 *       200:
 *         description: Lista de Inventários
 *       401:
 *         description: Não autorizado 
 *       404:
 *         description: Inventário não encontrado
 *       500:
 *         description: Erro interno no servidor
 *   post:
 *     summary: Cadastra um novo Inventário
 *     tags: [Inventarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventarios'
 *           example:
 *             setor: "6477cf3bc1beb3f224571de8"
 *             itens: "6477cf3dc1beb3f224571ded"
 *     responses:
 *       201:
 *         description: Inventário cadastrado com sucesso
 *       400:
 *         description: Necessário preencher todos os campos corretamente
 *       401:
 *         description: Não autorizado 
 *       500:
 *         description: Erro interno no servidor
 * /Inventarios/{id}:
 *   get:
 *     summary: Obtém um Inventário pelo ID
 *     tags: [Inventarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do Inventário
 *     responses:
 *       200:
 *         description: Inventário encontrado
 *       401:
 *         description: Não autorizado 
 *       404:
 *         description: Inventário não encontrado
 *       500:
 *         description: Erro interno no servidor
 *   put:
 *     summary: Atualiza um Inventário pelo ID
 *     tags: [Inventarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do Inventário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventarios'
 *           example:
 *             setor: "6477cf3bc1beb3f224571de6"
 *             itens: "6477cf3dc1beb3f224571ded"
 *             criadoEm: "2023-06-17T00:35:17.945Z"
 *     responses:
 *       200:
 *         description: Inventário atualizado com sucesso
 *       400:
 *         description: Necessário preencher todos os campos corretamente
 *       401:
 *         description: Não autorizado 
 *       404:
 *         description: Inventário não encontrado
 *       500:
 *         description: Erro interno no servidor
 *   patch:
 *     summary: Atualiza parcialmente um Inventário pelo ID
 *     tags: [Inventarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do Inventário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventarios'
 *           example:
 *             setor: "6477cf3bc1beb3f224571de8"
 *     responses:
 *       200:
 *         description: Inventário atualizado com sucesso
 *       401:
 *         description: Não autorizado 
 *       404:
 *         description: Inventário não encontrado
 *       500:
 *         description: Erro interno no servidor
 *   patch{id}:
 *     summary: Adiciona um item a um Inventário pelo ID
 *     tags: [Inventarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do Inventário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventarios'
 *           example:
 *             itens: "6477cf3dc1beb3f224571ded"
 *     responses:
 *       200:
 *         description: Item adicionado ao Inventário com sucesso
 *       401:
 *         description: Não autorizado 
 *       404:
 *         description: Inventário não encontrado
 *       500:
 *         description: Erro interno no servidor
 *   delete:
 *     summary: Deleta um Inventário pelo ID
 *     tags: [Inventarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do Inventário
 *     responses:
 *       200:
 *         description: Inventário deletado com sucesso
 *       401:
 *         description: Não autorizado 
 *       404:
 *         description: Inventário não encontrado
 *       500:
 *         description: Erro interno no servidor
 * 
 * /inventarios/itens/{id}:
 *   patch:
 *     summary: Adiciona um item a um Inventário pelo ID
 *     tags: [Inventarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do Inventário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventarios'
 *           example:
 *             itens: "648345f6421bf3b83436450d"
 *     responses:
 *       200:
 *         description: Item adicionado ao Inventário com sucesso
 *       401:
 *         description: Não autorizado 
 *       404:
 *         description: Item ou Inventário não encontrado
 *       500:
 *         description: Erro interno no servidor
 */

/**
 * @swagger
 * tags:
 *  name: Inventarios
 * /inventarios/itens/{id}:
 *    delete:
 *     summary: Remove um item de um Inventário pelo ID
 *     tags: [Inventarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do Inventário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventarios'
 *           example:
 *             itens: "648345f6421bf3b83436450d"
 *     responses:
 *       200:
 *         description: Item removido com sucesso
 *       401:
 *         description: Não autorizado 
 *       404:
 *         description: Item ou Inventário não encontrado
 *       500:
 *         description: Erro interno no servidor
 * 
 */



router
  .post('/inventarios',AuthMiddlewares,InventarioController.cadastrarInventario)
  .get('/inventarios',AuthMiddlewares,InventarioController.listarInventarios)
  .get('/inventarios/:id',AuthMiddlewares,InventarioController.listarInventariosId)
  .put('/inventarios/:id',AuthMiddlewares,InventarioController.atualizarInventario)
  .patch('/inventarios/:id',AuthMiddlewares,InventarioController.atualizarInventarioParcial)
  .patch('/inventarios/itens/:id',AuthMiddlewares,InventarioController.adicionarItensInventarioParcial)
  .delete('/inventarios/itens/:id',AuthMiddlewares,InventarioController.removerItensInventarioParcial)
  .delete('/inventarios/:id',AuthMiddlewares,InventarioController.deletarInventario)


  export default router;