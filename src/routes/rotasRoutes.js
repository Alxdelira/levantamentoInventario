import express from "express";
import RotaController from "../controller/rotasController.js";


const router = express.Router();

router
    .get('/rotas', RotaController.listarRotas)
    .get('/rotas/:id', RotaController.listarRotaPorId)
    .post('/rotas', RotaController.cadastrarRota)
    .patch('/rotas/:id', RotaController.atualizarRota)
    .delete('/rotas/:id', RotaController.excluirRota)

export default router;    