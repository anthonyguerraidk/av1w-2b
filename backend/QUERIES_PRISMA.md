# Queries Prisma - Task

Este documento descreve as queries de inserção e exclusão implementadas para a tabela Task usando Prisma.

## Estrutura do Model Task

```javascript
model Task {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  completed   Boolean  @default(false)
  createdAt   DateTime @default(now())
}
```

## 1. Query de Inserção (CREATE)

### Model: `criarTask()`

**Localização:** `backend/src/models/tarefaModel.js`

```javascript
export async function criarTask(title, description = null) {
  const novaTask = await prisma.task.create({
    data: {
      title: title.trim(),
      description: description ? description.trim() : null
    }
  });

  return novaTask;
}
```

### Controller: `criarTaskPrisma()`

**Localização:** `backend/src/controllers/tarefaController.js`

```javascript
export async function criarTaskPrisma(req, res) {
  try {
    const { title, description } = req.body;

    // Validações...

    const taskCriada = await TarefaModel.criarTask(title, description);

    res.status(201).json({
      mensagem: "Task criada com sucesso!",
      task: taskCriada
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar task" });
  }
}
```

### Endpoint

**Rota:** `POST /tasks`

**Body (JSON):**

```json
{
  "title": "Título da tarefa",
  "description": "Descrição opcional"
}
```

**Resposta de Sucesso (201):**

```json
{
  "mensagem": "Task criada com sucesso!",
  "task": {
    "id": 1,
    "title": "Título da tarefa",
    "description": "Descrição opcional",
    "completed": false,
    "createdAt": "2026-05-11T12:00:00.000Z"
  }
}
```

## 2. Query de Exclusão (DELETE)

### Model: `excluirTask()`

**Localização:** `backend/src/models/tarefaModel.js`

```javascript
export async function excluirTask(id) {
  try {
    const taskRemovida = await prisma.task.delete({
      where: {
        id: id
      }
    });

    return taskRemovida;
  } catch (error) {
    // Se o registro não for encontrado, retorna null
    if (error.code === "P2025") {
      return null;
    }
    throw error;
  }
}
```

### Controller: `excluirTaskPrisma()`

**Localização:** `backend/src/controllers/tarefaController.js`

```javascript
export async function excluirTaskPrisma(req, res) {
  try {
    const idNumero = Number(req.params.id);

    // Validações...

    const taskRemovida = await TarefaModel.excluirTask(idNumero);

    if (!taskRemovida) {
      return res.status(404).json({ erro: "Task não encontrada" });
    }

    res.json({
      mensagem: "Task excluída com sucesso!",
      task: taskRemovida
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao excluir task" });
  }
}
```

### Endpoint

**Rota:** `DELETE /tasks/:id`

**Parâmetro de URL:**

- `id`: ID da task a ser excluída (número inteiro)

**Resposta de Sucesso (200):**

```json
{
  "mensagem": "Task excluída com sucesso!",
  "task": {
    "id": 1,
    "title": "Título da tarefa",
    "description": "Descrição opcional",
    "completed": false,
    "createdAt": "2026-05-11T12:00:00.000Z"
  }
}
```

**Resposta de Erro (404):**

```json
{
  "erro": "Task não encontrada"
}
```

## Testando as Queries

### Criar uma Task

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Estudar Node.js",
    "description": "Aprender sobre Prisma ORM"
  }'
```

### Excluir uma Task

```bash
curl -X DELETE http://localhost:3000/tasks/1
```

## Validações Implementadas

### Inserção (CREATE)

- ✅ `title` é obrigatório e deve ser uma string não vazia
- ✅ `description` é opcional e deve ser uma string (se fornecida)
- ✅ Tratamento de erros com try-catch

### Exclusão (DELETE)

- ✅ `id` deve ser um número válido
- ✅ Retorna 404 se a task não existir
- ✅ Tratamento especial para erro P2025 (registro não encontrado)
- ✅ Tratamento de erros com try-catch

## Observações

1. As queries Prisma retornam Promises, por isso os controllers são `async/await`
2. O campo `completed` tem valor padrão `false` definido no schema
3. O campo `createdAt` é preenchido automaticamente com a data/hora atual
4. Todos os dados são salvos no banco de dados usando Prisma ORM
