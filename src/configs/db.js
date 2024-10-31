const fs = require('fs');
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
      rejectUnauthorized: false,
      ca: fs.readFileSync(config.DB_CA_CERT).toString(),
      key: fs.readFileSync(config.DB_CLIENT_KEY).toString(),
      cert: fs.readFileSync(config.DB_CLIENT_CERT).toString()
    }
  }
});
