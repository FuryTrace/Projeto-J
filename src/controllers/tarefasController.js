const db = require('../db/knex');

function todayDate() {
  const d = new Date();
  // formato YYYY-MM-DD (compatível com DATE do MySQL)
  return d.toISOString().slice(0, 10);
}

exports.listar = async (req, res) => {
  try {
    const tarefas = await db('tarefas').select('id', 'nome', 'descricao', 'data_criacao', 'data_conclusao', 'status').orderBy('id', 'asc');
    res.json(tarefas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao listar tarefas' });
  }
};

exports.obter = async (req, res) => {
  try {
    const tarefa = await db('tarefas').where({ id: req.params.id }).first();
    if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });
    res.json(tarefa);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar tarefa' });
  }
};

exports.inserir = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    if (!nome || nome.trim() === '') {
      return res.status(400).json({ erro: 'Nome é obrigatório' });
    }

    const data_criacao = todayDate();
  const status = 'pendente';
  const [id] = await db('tarefas').insert({ nome: nome || null, descricao: descricao || null, data_criacao, data_conclusao: null, status });
    res.status(201).json({ id, mensagem: 'Tarefa inserida com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao inserir tarefa' });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, status } = req.body;

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

    await db('tarefas').where({ id }).update(updateData);
    res.json({ mensagem: 'Tarefa atualizada com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao atualizar tarefa' });
  }
};

exports.excluir = async (req, res) => {
  try {
    const { id } = req.params;
    await db('tarefas').where({ id }).del();
    res.json({ mensagem: 'Tarefa excluída com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao excluir tarefa' });
  }
};
