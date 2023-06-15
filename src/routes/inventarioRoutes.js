import express from "express";
import InventarioController from "../controller/inventarioController.js";

const router = express.Router();

router
  .post('/inventarios',InventarioController.cadastrarInventario)
  .get('/inventarios',InventarioController.listarInventarios)
  .get('/inventarios/:id',InventarioController.listarInventariosId)
  .put('/inventarios/:id',InventarioController.atualizarInventario)
  .patch('/inventarios/:id',InventarioController.atualizarInventarioParcial)
  .delete('/inventarios/:id',InventarioController.deletarInventario)


  export default router;