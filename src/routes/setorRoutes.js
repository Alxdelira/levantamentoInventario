import express from "express";
import SetorController from "../controller/setorController.js";

const router = express.Router();

router
.get("/setores",SetorController.listarSetores)
.get("/setores/:id",SetorController.listarSetoresPorId)
.post("/setores",SetorController.cadastrarSetores)
.put("/setores/:id",SetorController.atualizarSetoresPorId)
.patch("/setores/:id",SetorController.atualizarSetoresParcial)
.delete("/setores/:id",SetorController.deleteSetores)

export default router
