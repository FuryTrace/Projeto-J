/**
 * Definição de rotas para a entidade 'animais'.
 * Base path: /api/tarefas
 * Endpoints:
 *  - GET    /api/tarefas        -> listar
 *  - GET    /api/tarefas/:id    -> obter
 *  - POST   /api/tarefas        -> inserir
 *  - PUT    /api/tarefas/:id    -> atualizar
 *  - DELETE /api/tarefas/:id    -> excluir
 */
const express = require('express');
const router = express.Router();
const controller = require('../controllers/cadastroController');

router.get('/', controller.listar);
router.get('/:id', controller.obter);
router.post('/', controller.inserir);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.excluir);

module.exports = router;
