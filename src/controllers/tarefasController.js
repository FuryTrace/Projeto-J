const db = require('../db/knex');

// Helper: retorna data atual no formato YYYY-MM-DD (compatível com DATE do MySQL)
function todayDate() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

// Helper centralizado para tratar erros nos controllers
function handleError(res, err, message = 'Erro interno', code = 500) {
  // Loga o erro no servidor (detalhes) e responde com mensagem amigável
  console.error(err);
  res.status(code).json({ erro: message });
}

// LISTAR: retorna array de tarefas
// Consulta realizada: SELECT id,nome,descricao,data_criacao,data_conclusao,status FROM tarefas ORDER BY id
exports.listar = async (req, res) => {
  try {
    const tarefas = await db('tarefas')
      .select('id', 'nome', 'descricao', 'data_criacao', 'data_conclusao', 'status')
      .orderBy('id', 'asc');
    // Resposta JSON enviada para o frontend (public/js/app.js espera estes campos)
    res.json(tarefas);
  } catch (err) {
    handleError(res, err, 'Erro ao listar tarefas');
  }
};

// OBTER: retorna 1 tarefa pelo id
// Consulta: SELECT * FROM tarefas WHERE id = :id LIMIT 1
exports.obter = async (req, res) => {
  try {
    const tarefa = await db('tarefas').where({ id: req.params.id }).first();
    if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });
    res.json(tarefa);
  } catch (err) {
    handleError(res, err, 'Erro ao buscar tarefa');
  }
};

// INSERIR: cria nova tarefa
// Espera no body: { nome: string (obrigatorio), descricao?: string }
// Insere: nome, descricao, data_criacao (hoje), data_conclusao null, status 'pendente'
exports.inserir = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    if (!nome || nome.trim() === '') {
      return res.status(400).json({ erro: 'Nome é obrigatório' });
    }

    const data_criacao = todayDate();
    const status = 'pendente';
    // INSERT INTO tarefas (...) VALUES (...)
    const [id] = await db('tarefas').insert({ nome: nome || null, descricao: descricao || null, data_criacao, data_conclusao: null, status });
    // Retornamos o id criado (frontend e testes usam isso)
    res.status(201).json({ id, mensagem: 'Tarefa inserida com sucesso' });
  } catch (err) {
    handleError(res, err, 'Erro ao inserir tarefa');
  }
};

// ATUALIZAR: altera nome, descricao ou status
// Se o status for alterado para 'concluida', preenche data_conclusao com a data atual.
// Se o status sair de 'concluida', limpa data_conclusao.
exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, status } = req.body;

    // Busca a tarefa atual (para checar data_conclusao existente)
    const tarefaAtual = await db('tarefas').where({ id }).first();
    if (!tarefaAtual) return res.status(404).json({ erro: 'Tarefa não encontrada' });

    const updateData = {};
    if (nome !== undefined) updateData.nome = nome;
    if (descricao !== undefined) updateData.descricao = descricao;
    if (status !== undefined) {
      // validar status
      const allowed = ['pendente', 'em andamento', 'concluida'];
      if (!allowed.includes(status)) return res.status(400).json({ erro: 'Status inválido' });
      updateData.status = status;
      if (status === 'concluida' && !tarefaAtual.data_conclusao) {
        updateData.data_conclusao = todayDate();
      }
      if (status !== 'concluida') {
        updateData.data_conclusao = null;
      }
    }

    // UPDATE tarefas SET ... WHERE id = :id
    await db('tarefas').where({ id }).update(updateData);
    res.json({ mensagem: 'Tarefa atualizada com sucesso' });
  } catch (err) {
    handleError(res, err, 'Erro ao atualizar tarefa');
  }
};

// EXCLUIR: deleta a tarefa pelo id
exports.excluir = async (req, res) => {
  try {
    const { id } = req.params;
    await db('tarefas').where({ id }).del();
    res.json({ mensagem: 'Tarefa excluída com sucesso' });
  } catch (err) {
    handleError(res, err, 'Erro ao excluir tarefa');
  }
};
