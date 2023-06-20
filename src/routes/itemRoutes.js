import express from "express";
import ItemController from "../controller/itemController.js"
import AuthMiddlewares from "../middlewares/AuthMiddleware.js";


/**
 * @swagger
 * tags:
 *   name: Itens
 *   description: Itens para autenticação
 * components:
 *   schemas:
 *     Itens:
 *       type: object
 *       properties:
 *         etiqueta:
 *           type: number
 *         naoEtiquetado:
 *           type: boolean
 *         encontrado:
 *           type: boolean
 *         nome:
 *           type: string
 *         setor:
 *           type: string
 *         estado:
 *           type: string
 *         descricao:
 *           type: string
 *         responsavel:
 *           type: string
 *         image:
 *           type: string
 *         ativo:
 *           type: boolean
 *           itens:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               rota:
 *                 type: string
 *               verbo_get:
 *                 type: boolean
 *               verbo_put:
 *                 type: boolean
 *               verbo_patch:
 *                 type: boolean
 *               verbo_delete:
 *                 type: boolean
 *               verbo_post:
 *                 type: boolean
 *       required:
 *         - etiqueta
 *         - naoEtiquetado
 *         - encontrado
 *         - nome
 *         - setor
 *         - estado
 *         - descricao
 *         - responsavel
 *         - image
 *         - ativo
 */


/**
 * @swagger
 * tags:
 *   name: Itens
 *   description: Itens para autenticação
 * /itens:
 *   get:
 *     summary: Lista todos os itens
 *     tags: [Itens]
 *     parameters:
 *       - in: query
 *         name: etiqueta
 *         schema:
 *           type: number
 *           description: Filtra pelo número da etiqueta
 *       - in: query
 *         name: naoEtiquetado
 *         schema:
 *           type: boolean
 *           description: Filtra se está etiquetado ou não
 *       - in: query
 *         name: encontrado
 *         schema:
 *           type: boolean
 *           description: Filtra pelo item encontrado
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *           description: Filtra pelo nome do item
 *       - in: query
 *         name: setor
 *         schema:
 *           type: string
 *           description: Filtra pelo nome do setor
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *           description: Filtra pelo estado do item
 *       - in: query
 *         name: descricao
 *         schema:
 *           type: string
 *           description: Filtra pela descrição do item
 *       - in: query
 *         name: responsavel
 *         schema:
 *           type: string
 *           description: Filtra pelo responsável
 *       - in: query
 *         name: image
 *         schema:
 *           type: string
 *           description: Filtra pela URL da imagem
 *       - in: query
 *         name: ativo
 *         schema:
 *           type: boolean
 *           description: Filtra pelos itens ativos
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
 *         description: Lista de itens
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Item não encontrado
 *       500:
 *         description: Erro interno no servidor
 *   post:
 *     summary: Cadastra um novo item
 *     tags: [Itens]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Itens'
 *           example:
 *             etiqueta: 25439
 *             naoEtiquetado: false
 *             encontrado: true
 *             nome: "cadeira"
 *             setor: "6477cf3bc1beb3f224571de5"
 *             estado: "em condicoes de uso"
 *             ativo: true
 *             descricao: "esta quebrada"
 *             responsavel: "Barba-Negra"
 *             image: "http://lorempixel.com/649/480"
 *     responses:
 *       201:
 *         description: Item cadastrado com sucesso
 *       400:
 *         description: Necessário preencher todos os campos corretamente ou item já cadastrado
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno no servidor
 * /itens/{id}:
 *   get:
 *     summary: Obtém um item pelo ID
 *     tags: [Itens]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do item
 *     responses:
 *       200:
 *         description: Item encontrado
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Item não encontrado
 *       500:
 *         description: Erro interno no servidor
 *   put:
 *     summary: Atualiza um item pelo ID
 *     tags: [Itens]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Itens'
 *           example:
 *             naoEtiquetado: false
 *             encontrado: true
 *             nome: "cadeira"
 *             setor: "648bbe2e2fbdc7963b59e92c"
 *             estado: "danificado"
 *             descricao: "assento quebrado"
 *             responsavel: "Barba-Negra"
 *             image: "http://lorempixel.com/649/480"
 *             ativo: true
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso
 *       400:
 *         description: Necessário preencher todos os campos corretamente
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Item não encontrado
 *       500:
 *         description: Erro interno no servidor
 *   patch:
 *     summary: Atualiza parcialmente um item pelo ID
 *     tags: [Itens]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Itens'
 *           example:
 *             nome: "Novo item Autalizado Parcialmente"
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso
 *       400:
 *         description: Necessário preencher pelo menos um campo válido para atualização
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Item não encontrado
 *       500:
 *         description: Erro interno no servidor
 *   delete:
 *     summary: Deleta um item pelo ID
 *     tags: [Itens]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do item
 *     responses:
 *       200:
 *         description: Item deletado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Item não encontrado
 *       500:
 *         description: Erro interno no servidor
 */


const router = express.Router();

router
  .post('/itens', AuthMiddlewares, ItemController.cadastrarItem)
  .get('/itens', AuthMiddlewares, ItemController.listarItem)
  .get('/itens/:id', AuthMiddlewares, ItemController.listarItemPorId)
  .put('/itens/:id', AuthMiddlewares, ItemController.atualizarItem)
  .patch('/itens/:id', AuthMiddlewares, ItemController.atualizarItemPatch)
  .delete('/itens/:id', AuthMiddlewares, ItemController.deletarItem)
  
  

export default router;