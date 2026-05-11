import { prisma } from "../config/prisma.js";

export async function criarTask(title, description = null) {
  const novaTask = await prisma.task.create({
    data: {
      title: title.trim(),
      description: description ? description.trim() : null
    }
  });

  return novaTask;
}

export async function excluirTask(id) {
  try {
    const taskRemovida = await prisma.task.delete({
      where: {
        id: id
      }
    });

    return taskRemovida;
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }
    throw error;
  }
}
