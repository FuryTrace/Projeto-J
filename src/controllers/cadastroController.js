/**
 * Controlador para CRUD de animais (tabela `animais`).
 * Exporta funções: listar, obter, inserir, atualizar, excluir.
 * Utiliza `src/db/knex.js` para operações SQL via Knex.
 */
const db = require('../db/knex');

// Formata uma data para ISO (YYYY-MM-DD) ou retorna null quando inválida
function formatDate(date) {
  if (!date) return null;
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
}

// Tratamento centralizado de erros: loga e responde com JSON
function handleError(res, err, message = 'Erro interno', code = 500) {
  console.error(err);
  res.status(code).json({ erro: message });
}

// Listar todos os animais (GET /api/tarefas)
exports.listar = async (req, res) => {
  try {
    const rows = await db('animais').select('*').orderBy('id', 'asc');
    res.json(rows);
  } catch (err) {
    handleError(res, err, 'Erro ao listar animais');
  }
};

// Obter um animal por ID (GET /api/tarefas/:id)
exports.obter = async (req, res) => {
  try {
    const { id } = req.params;
    const animal = await db('animais').where({ id }).first();
    if (!animal) return res.status(404).json({ erro: 'Animal não encontrado' });
    res.json(animal);
  } catch (err) {
    handleError(res, err, 'Erro ao obter animal');
  }
};

// Inserir novo animal (POST /api/tarefas)
exports.inserir = async (req, res) => {
  try {
    const {
      codigo_lacre,
      nome_animal,
      codigo_registro,
      codigo_registro_pai,
      codigo_registro_mae,
      peso_inicial,
      data_nascimento
    } = req.body;

    // Validação mínima de campos obrigatórios
    if (!codigo_lacre || !nome_animal || !codigo_registro) {
      return res.status(400).json({ erro: 'Campos obrigatórios: codigo_lacre, nome_animal, codigo_registro' });
    }

    // Normalizar peso_inicial: aceitar vírgula como separador e converter para número
    let pesoVal = null;
    if (peso_inicial !== undefined && peso_inicial !== null && String(peso_inicial).trim() !== '') {
      const normalized = String(peso_inicial).replace(',', '.').replace(/\s+/g, '');
      const f = parseFloat(normalized);
      pesoVal = Number.isFinite(f) ? f : null;
    }

    const inserted = await db('animais').insert({
      codigo_lacre,
      nome_animal,
      codigo_registro,
      codigo_registro_pai: codigo_registro_pai || null,
      codigo_registro_mae: codigo_registro_mae || null,
      peso_inicial: pesoVal,
      data_nascimento: formatDate(data_nascimento)
    });

    // O retorno do insert no MySQL é um array com o id inserido na posição 0
    res.status(201).json({ id: inserted[0], mensagem: 'Animal inserido com sucesso' });
  } catch (err) {
    handleError(res, err, 'Erro ao inserir animal');
  }
};

// Atualizar animal (PUT /api/tarefas/:id)
exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const exists = await db('animais').where({ id }).first();
    if (!exists) return res.status(404).json({ erro: 'Animal não encontrado' });

    // Monta objeto com somente os campos que devem ser atualizados
    const updateData = {};
    if (payload.codigo_lacre !== undefined) updateData.codigo_lacre = payload.codigo_lacre;
    if (payload.nome_animal !== undefined) updateData.nome_animal = payload.nome_animal;
    if (payload.codigo_registro !== undefined) updateData.codigo_registro = payload.codigo_registro;
    if (payload.codigo_registro_pai !== undefined) updateData.codigo_registro_pai = payload.codigo_registro_pai;
    if (payload.codigo_registro_mae !== undefined) updateData.codigo_registro_mae = payload.codigo_registro_mae;
    if (payload.peso_inicial !== undefined) {
      let pesoVal = null;
      if (payload.peso_inicial !== null && String(payload.peso_inicial).trim() !== '') {
        const normalized = String(payload.peso_inicial).replace(',', '.').replace(/\s+/g, '');
        const f = parseFloat(normalized);
        pesoVal = Number.isFinite(f) ? f : null;
      }
      updateData.peso_inicial = pesoVal;
    }
    if (payload.data_nascimento !== undefined) updateData.data_nascimento = formatDate(payload.data_nascimento);

    await db('animais').where({ id }).update(updateData);
    res.json({ mensagem: 'Animal atualizado com sucesso' });
  } catch (err) {
    handleError(res, err, 'Erro ao atualizar animal');
  }
};

// Excluir animal (DELETE /api/tarefas/:id)
exports.excluir = async (req, res) => {
  try {
    const { id } = req.params;
    await db('animais').where({ id }).del();
    res.json({ mensagem: 'Animal excluído com sucesso' });
  } catch (err) {
    handleError(res, err, 'Erro ao excluir animal');
  }
};
