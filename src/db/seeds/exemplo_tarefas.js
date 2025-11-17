exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tarefas').del();
  // Inserts seed entries
  await knex('tarefas').insert([
    { nome: 'Maria Alves', descricao: 'Comprar carne', data_criacao: '2020-01-01', data_conclusao: '2020-01-02', status: 'concluida' },
    { nome: 'Joao Paulo', descricao: 'Limpar casa', data_criacao: '2025-04-11', data_conclusao: null, status: 'em andamento' },
    { nome: 'Joana Silveira', descricao: 'Chorar no banheiro', data_criacao: '2025-07-11', data_conclusao: null, status: 'em andamento' },
    { nome: 'Ana Maria Braga', descricao: 'Fazer Almoço', data_criacao: '2025-04-11', data_conclusao: null, status: 'pendente' }
  ]);
};
