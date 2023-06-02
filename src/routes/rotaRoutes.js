import express from "express";
import RotaControllers from "../controller/rotaController.js";

const router = express.Router();

router
  .get('/rotas', RotaControllers.listarRotas)
  .get('/rotas/:id', RotaControllers.listarRotaPorId)
  .post('/rotas', RotaControllers.cadastrarRota)
  .put('/rotas/:id', RotaControllers.atualizarRota)
  .delete('/rotas/:id', RotaControllers.deletarRota)

export default router;