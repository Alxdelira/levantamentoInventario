import express from "express";
import UsuarioController from "../controller/usuarioController.js";
import AuthMiddleware from "../midddlewares/AuthMidlewares.js";

const router = express.Router();

router
  .get('/usuarios', AuthMiddleware, UsuarioController.listarUsuarios)
  .get('/usuarios/:id',AuthMiddleware, UsuarioController.listarUsuarioPorId)
  .post('/usuarios',AuthMiddleware, UsuarioController.cadastrarUsuario)
  .put('/usuarios/:id',AuthMiddleware, UsuarioController.atualizarUsuario)
  .patch('/usuarios/:id',AuthMiddleware, UsuarioController.atualizarUsuarioPatch)
  .delete('/usuarios/:id',AuthMiddleware, UsuarioController.deletarUsuario);

export default router;
