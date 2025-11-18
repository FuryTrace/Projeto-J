/**
 * Arquivo de configuração do Knex.
 * As variáveis de conexão podem ser definidas via `.env`:
 *  - DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
 */
require('dotenv').config();

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'boizinho'
    },
    pool: { min: 0, max: 7 }
  }
};
