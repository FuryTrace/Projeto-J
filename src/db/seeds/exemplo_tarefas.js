exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tarefas').del();
  await knex('tarefas').insert([
    { nome: 'Compra', descricao: 'Comprar leite', data_criacao: '2025-11-01', data_conclusao: null, status: 'pendente' },
    { nome: 'Estudo', descricao: 'Estudar para a prova', data_criacao: '2025-11-02', data_conclusao: null, status: 'pendente' },
    { nome: 'Ligação', descricao: 'Ligar para o cliente', data_criacao: '2025-11-03', data_conclusao: '2025-11-04', status: 'concluida' }
  ]);
};
