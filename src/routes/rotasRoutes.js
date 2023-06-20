import express from "express";
import RotaController from "../controller/rotasController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";


const router = express.Router();
/**
 * @swagger
 * /rotas:
 *   get:
 *     tags:
 *       - Rotas
 *     description: Rota para listar todas as rotas
 *     responses:
 *       200:
 *         description: Lista de rotas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rota'
 *       500:
 *         description: Erro interno no servidor
 *
 *   post:
 *     tags:
 *       - Rotas
 *     description: Rota para cadastrar uma nova rota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RotaInput'
 *     responses:
 *       201:
 *         description: Rota cadastrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rota'
 *       500:
 *         description: Erro interno no servidor
 *
 * /rotas/{id}:
 *   get:
 *     tags:
 *       - Rotas
 *     description: Rota para obter uma rota pelo ID
 *     parameters:
 *       - name: id
 *         description: ID da rota
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rota encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rota'
 *       404:
 *         description: ID da rota não encontrado
 *       500:
 *         description: Erro interno no servidor
 *
 *   put:
 *     tags:
 *       - Rotas
 *     description: Rota para atualizar uma rota existente
 *     parameters:
 *       - name: id
 *         description: ID da rota
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RotaInput'
 *     responses:
 *       200:
 *         description: Rota atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rota'
 *       404:
 *         description: ID da rota não encontrado
 *       500:
 *         description: Erro interno no servidor
 *
 *   patch:
 *     tags:
 *       - Rotas
 *     description: Rota para atualizar parcialmente uma rota existente
 *     parameters:
 *       - name: id
 *         description: ID da rota
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RotaInput'
 *     responses:
 *       200:
 *         description: Rota atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rota'
 *       404:
 *         description: ID da rota não encontrado
 *       500:
 *         description: Erro interno no servidor
 *
 *   delete:
 *     tags:
 *       - Rotas
 *     description: Rota para excluir uma rota existente
 *     parameters:
 *       - name: id
 *         description: ID da rota
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rota excluída
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rota'
 *       404:
 *         description: ID da rota não encontrado
 *       500:
 *         description: Erro interno no servidor
 *
 * components:
 *   schemas:
 *     Rota:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID da rota
 *           example: 1
 *         rota:
 *           type: string
 *           description: Rota
 *           example: /rota1
 *         ativo:
 *           type: boolean
 *           description: Status da rota
 *           example: true
 *         verbo_get:
 *           type: boolean
 *           description: Suporta o verbo GET
 *           example: true
 *         verbo_put:
 *           type: boolean
 *           description: Suporta o verbo PUT
 *           example: false
 *         verbo_patch:
 *           type: boolean
 *           description: Suporta o verbo PATCH
 *           example: true
 *         verbo_delete:
 *           type: boolean
 *           description: Suporta o verbo DELETE
 *           example: true
 *         verbo_post:
 *           type: boolean
 *           description: Suporta o verbo POST
 *           example: true
 *
 *     RotaInput:
 *       type: object
 *       properties:
 *         rota:
 *           type: string
 *           description: Rota
 *           example: rota1
 *         ativo:
 *           type: boolean
 *           description: Status da rota
 *           example: true
 *         verbo_get:
 *           type: boolean
 *           description: Suporta o verbo GET
 *           example: true
 *         verbo_put:
 *           type: boolean
 *           description: Suporta o verbo PUT
 *           example: false
 *         verbo_patch:
 *           type: boolean
 *           description: Suporta o verbo PATCH
 *           example: true
 *         verbo_delete:
 *           type: boolean
 *           description: Suporta o verbo DELETE
 *           example: true
 *         verbo_post:
 *           type: boolean
 *           description: Suporta o verbo POST
 *           example: true
 */

router
    .get('/rotas',AuthMiddleware, RotaController.listarRotas)
    .get('/rotas/:id',AuthMiddleware ,RotaController.listarRotaPorId)
    .post('/rotas',AuthMiddleware ,RotaController.cadastrarRota)
    .put('/rotas/:id',AuthMiddleware ,RotaController.atualizarRota)
    .patch('/rotas/:id',AuthMiddleware ,RotaController.atualizarRotaParcialmente)
    .delete('/rotas/:id',AuthMiddleware ,RotaController.excluirRota)

export default router;    