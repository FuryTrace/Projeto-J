/**
 * Inicializa e exporta a instância do Knex configurada.
 * A configuração é carregada a partir do arquivo `knexfile.js`.
 * Uso: const db = require('./db/knex');
 */
const knex = require('knex');
const config = require('../../knexfile');

const db = knex(config.development);

module.exports = db;
