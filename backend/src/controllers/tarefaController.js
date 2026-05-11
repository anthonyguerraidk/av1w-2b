// ========================================
// CONTROLLER - CAMADA DE CONTROLE
// ========================================
// Esta camada é responsável por:
// - Receber as requisições HTTP
// - Validar os dados recebidos
// - Chamar os métodos do Model
// - Retornar as respostas adequadas

import * as TarefaModel from "../models/tarefaModel.js";

// ========================================
// CONTROLLERS USANDO PRISMA
// ========================================

/**
 * Cria uma nova task usando Prisma
 * @route POST /tasks
 */
export async function criarTaskPrisma(req, res) {
  try {
    // Pega os dados enviados no corpo da requisição
    const { title, description, categoryId } = req.body;

    // Valida se o título foi enviado corretamente
    if (typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ erro: "Título é obrigatório" });
    }

    // Valida a descrição se foi enviada
    if (
      description !== undefined &&
      description !== null &&
      typeof description !== "string"
    ) {
      return res.status(400).json({ erro: "Descrição deve ser uma string" });
    }

    // Valida o categoryId se foi enviado
    if (
      categoryId !== undefined &&
      categoryId !== null &&
      !Number.isInteger(categoryId)
    ) {
      return res
        .status(400)
        .json({ erro: "categoryId deve ser um número inteiro" });
    }

    // Cria a nova task através do Model
    const taskCriada = await TarefaModel.criarTask(
      title,
      description,
      categoryId
    );

    // Retorna status 201 (criado com sucesso)
    res.status(201).json({
      mensagem: "Task criada com sucesso!",
      task: taskCriada
    });
  } catch (error) {
    console.error("Erro ao criar task:", error);
    res
      .status(500)
      .json({ erro: "Erro ao criar task", detalhes: error.message });
  }
}

/**
 * Remove uma task pelo id usando Prisma
 * @route DELETE /tasks/:id
 */
export async function excluirTaskPrisma(req, res) {
  try {
    // Converte o id da URL para número
    const idNumero = Number(req.params.id);

    // Valida o id
    if (Number.isNaN(idNumero)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    // Tenta excluir a task através do Model
    const taskRemovida = await TarefaModel.excluirTask(idNumero);

    // Se não encontrar, retorna erro 404
    if (!taskRemovida) {
      return res.status(404).json({ erro: "Task não encontrada" });
    }

    // Retorna a task que foi removida
    res.json({
      mensagem: "Task excluída com sucesso!",
      task: taskRemovida
    });
  } catch (error) {
    console.error("Erro ao excluir task:", error);
    res
      .status(500)
      .json({ erro: "Erro ao excluir task", detalhes: error.message });
  }
}
