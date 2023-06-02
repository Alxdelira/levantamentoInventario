import express from "express";
import ItemController from "../controller/itemController.js";

const router = express.Router();

router
  .post("/itens", ItemController.cadastrarItem)
  .get("/itens", ItemController.listarItem)
  .get("/itens/:id", ItemController.listarItemPorId)
  .patch("/itens/:id", ItemController.atualizarItemPatch)
  .put("/itens/:id", ItemController.atualizarItem)
  .delete("/itens/:id", ItemController.deletarItem)

export default router;
