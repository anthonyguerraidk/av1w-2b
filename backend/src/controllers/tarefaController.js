import * as TarefaModel from "../models/tarefaModel.js";

export async function criarTaskPrisma(req, res) {
  try {
    const { title, description } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({ erro: "Título é obrigatório" });
    }

    const taskCriada = await TarefaModel.criarTask(title, description);

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

export async function excluirTaskPrisma(req, res) {
  try {
    const idNumero = Number(req.params.id);

    if (!idNumero) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const taskRemovida = await TarefaModel.excluirTask(idNumero);

    if (!taskRemovida) {
      return res.status(404).json({ erro: "Task não encontrada" });
    }

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
