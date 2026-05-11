// ========================================
// ROUTES - CAMADA DE ROTAS
// ========================================
// Esta camada é responsável por:
// - Definir as rotas da aplicação
// - Mapear URLs para os controllers correspondentes
// - Organizar as rotas por recurso/entidade

import express from "express";
import * as TarefaController from "../controllers/tarefaController.js";

// Cria um roteador do Express
const router = express.Router();

// ========================================
// ROTAS DE TASKS (USANDO PRISMA)
// ========================================

/**
 * POST /tasks - Cria uma nova task usando Prisma
 */
router.post("/tasks", TarefaController.criarTaskPrisma);

/**
 * DELETE /tasks/:id - Remove uma task usando Prisma
 */
router.delete("/tasks/:id", TarefaController.excluirTaskPrisma);

// Exporta o roteador para ser usado no app principal
export default router;
