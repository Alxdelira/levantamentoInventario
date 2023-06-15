import express from "express";
import UsuarioController from "../controller/usuarioController.js";
import AuthMiddlewares from "../middlewares/AuthMiddleware.js";

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Rotas relacionadas aos usuários
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *         email:
 *           type: string
 *         senha:
 *           type: string
 *         ativo:
 *           type: boolean
 *         rota:
 *           type: array
 *           items:
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
 *         - nome
 *         - email
 *         - senha
 *         - ativo
 *         - rota
 */

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Rotas relacionadas aos usuários
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuarios]
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *           description: Filtra pelo nome do usuário
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *           description: Filtra pelo email do usuário
 *       - in: query
 *         name: ativo
 *         schema:
 *           type: boolean
 *           description: Filtra pelo status do usuário
 *     responses:
 *       200:
 *         description: Lista de usuários
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno no servidor
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *           example:
 *             nome: "Usuario de teste"
 *             email: "usuarioDeTeste@example.com"
 *             senha: "senha123"
 *             ativo: true
 *             rota:
 *               - _id: "usuarios"
 *                 rota: "/usuarios"
 *                 verbo_get: true
 *                 verbo_put: true
 *                 verbo_patch: true
 *                 verbo_delete: true
 *                 verbo_post: true
 *               - _id: "inventarios"
 *                 rota: "/inventarios"
 *                 verbo_get: true
 *                 verbo_put: true
 *                 verbo_patch: true
 *                 verbo_delete: true
 *                 verbo_post: true
 *               - _id: "itens"
 *                 rota: "/itens"
 *                 verbo_get: true
 *                 verbo_put: true
 *                 verbo_patch: true
 *                 verbo_delete: true
 *                 verbo_post: true
 *               - _id: "setores"
 *                 rota: "/setores"
 *                 verbo_get: true
 *                 verbo_put: true
 *                 verbo_patch: true
 *                 verbo_delete: true
 *                 verbo_post: true
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *       400:
 *         description: Necessário preencher todos os campos corretamente ou usuário já cadastrado
 *       500:
 *         description: Erro interno no servidor
 * /usuarios/{id}:
 *   get:
 *     summary: Obtém um usuário pelo ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 *   put:
 *     summary: Atualiza um usuário pelo ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *           example:
 *             nome: "Novo nome de usuário"
 *             email: "emailNovo@novoemail.com"
 *             senha: "novasenha123"
 *             ativo: true
 *             rota:
 *               - _id: "usuarios"
 *                 rota: "/usuarios"
 *                 verbo_get: true
 *                 verbo_put: true
 *                 verbo_patch: true
 *                 verbo_delete: true
 *                 verbo_post: true
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Necessário preencher todos os campos corretamente
 *       404:
 *         description: Usuário não encontrado
 *   patch:
 *     summary: Atualiza parcialmente um usuário pelo ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *           example:
 *             nome: "Novo nome de usuário Autalizado Parcialmente"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Necessário preencher pelo menos um campo válido para atualização
 *       404:
 *         description: Usuário não encontrado
 *   delete:
 *     summary: Deleta um usuário pelo ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */


const router = express.Router();

router.get('/usuarios', AuthMiddlewares, UsuarioController.listarUsuarios);
router.get('/usuarios/:id', AuthMiddlewares, UsuarioController.listarUsuarioPorId);
router.post('/usuarios', AuthMiddlewares, UsuarioController.cadastrarUsuario);
router.put('/usuarios/:id', AuthMiddlewares, UsuarioController.atualizarUsuario);
router.patch('/usuarios/:id', AuthMiddlewares, UsuarioController.atualizarUsuarioPatch);
router.delete('/usuarios/:id', AuthMiddlewares, UsuarioController.deletarUsuario);

export default router;




