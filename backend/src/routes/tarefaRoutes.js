import express from "express";
import * as TarefaController from "../controllers/tarefaController.js";

const router = express.Router();

router.post("/tasks", TarefaController.criarTaskPrisma);
router.delete("/tasks/:id", TarefaController.excluirTaskPrisma);

export default router;
