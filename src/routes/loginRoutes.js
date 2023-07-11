import express from 'express';
import LoginController from '../controller/loginController.js';

const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - "Login"
 *     summary: Realiza o login do usuário
 *     description: Realiza o login do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *             example:
 *              email: "alexandre@nogueira.com"
 *              senha: "senha123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Senha inválida
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno no servidor
 */

router.post('/login', LoginController.logar);

export default router;
