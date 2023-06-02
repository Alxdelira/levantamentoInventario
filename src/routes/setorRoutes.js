import express from "express";
import SetorController from "../controller/setorController.js";

const router = express.Router();

router
  .post("/setores", SetorController.cadastrarSetores)
  .get("/setores", SetorController.listarSetores)
  .get("/setores/:id", SetorController.listarSetoresId)
  .put("/setores/:id",SetorController.atualizarSetor)
  .patch("/setores/:id", SetorController.atualizarSetorPatch)
  .delete("/setores/:id", SetorController.deletarSetor)


export default router;
