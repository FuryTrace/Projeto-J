// knex wrapper: cria e exporta a instância do Knex usada em todo o projeto
// Ele lê as configurações a partir do arquivo raiz `knexfile.js`.
const knex = require('knex');
const config = require('../../knexfile');

// Utiliza a configuração 'development' definida em knexfile.js
const db = knex(config.development);

// Exporta `db` para ser usado em controllers (ex: db('tarefas').select(...))
module.exports = db;
