exports.up = function(knex) {
  return knex.schema.createTable('tarefas', function(table) {
    table.increments('id').primary();
    table.string('nome', 120).notNullable();
    table.text('descricao').notNullable();
    table.date('data_criacao').notNullable();
    table.date('data_conclusao').nullable();
    table.enu('status', ['pendente', 'em andamento', 'concluida']).notNullable().defaultTo('pendente');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tarefas');
};
