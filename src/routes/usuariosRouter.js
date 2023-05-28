import express from "express";
import UsuarioController from "../controller/usuarioController.js";

const router = express.Router();

router
  .get('/usuarios', UsuarioController.listarUsuarios)
  .get('/usuarios/:id', UsuarioController.listarUsuarioPorId)
  .post('/usuarios', UsuarioController.cadastrarUsuario)
  .put('/usuarios/:id', UsuarioController.atualizarUsuario)
  .patch('/usuarios/:id', UsuarioController.atualizarUsuarioPatch)
  .delete('/usuarios/:id', UsuarioController.deletarUsuario);

export default router;
