const config = require('../configs/config');

module.exports = require('knex')({
  client: 'pg',
  connection: {
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_DATABASE,
    ssl: {
      rejectUnauthorized: false
    }
  }
});
