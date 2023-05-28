import express from "express";
import ItemController from "../controller/itemController.js";

const router = express.Router();

router
  .get("/itens", ItemController.listarItem)

  export default router;
