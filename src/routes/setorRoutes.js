import express from "express";
import SetorController from "../controller/setorController.js";

const router = express.Router();

router
  .get("/setores", SetorController.listarSetores)
  

export default router;
