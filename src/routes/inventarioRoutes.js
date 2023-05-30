import express from "express";
import InventarioController from "../controller/inventarioController.js";

const router = express.Router();

router
  .post('/inventarios',InventarioController.cadastrarInventario)
  .get('/inventarios', InventarioController.listarInventarios)
  .get('/inventarios/:id', InventarioController.listarInventariosId)

  export default router;
