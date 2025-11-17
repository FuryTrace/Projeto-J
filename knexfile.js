// knex configuration - lê variáveis do arquivo .env
// Variáveis usadas: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
require('dotenv').config();

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      // conexão com o banco MySQL
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    // pastas onde ficam as migrations e seeds usadas pelo knex
    migrations: {
      directory: './src/db/migrations'
    },
    seeds: {
      directory: './src/db/seeds'
    }
  }
};
