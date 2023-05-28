import express from "express";
import InventarioController from "../controller/inventarioController.js";

const router = express.Router();

router
  .get("/inventarios", InventarioController.listarInventarios)

  export default router;
