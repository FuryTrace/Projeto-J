exports.up = function(knex) {
  return knex.schema.createTable('tarefas', function(table) {
    table.increments('id').primary();
    table.string('descricao').notNullable();
    table.boolean('concluida').notNullable().defaultTo(false);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tarefas');
};
