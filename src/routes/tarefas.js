const express = require('express');
const router = express.Router();
const controller = require('../controllers/tarefasController');

// Rotas para /tarefas
// GET /tarefas        -> listar todas as tarefas (controller.listar)
router.get('/', controller.listar);
// GET /tarefas/:id    -> obter 1 tarefa pelo id (controller.obter)
router.get('/:id', controller.obter);
// POST /tarefas       -> inserir nova tarefa (controller.inserir)
router.post('/', controller.inserir);
// PUT /tarefas/:id    -> atualizar campos (nome, descricao, status) (controller.atualizar)
router.put('/:id', controller.atualizar);
// DELETE /tarefas/:id -> excluir a tarefa (controller.excluir)
router.delete('/:id', controller.excluir);

module.exports = router;
