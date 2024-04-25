require('dotenv').config()

module.exports = {
  APP_PORT: process.env.APP_PORT,
  CLIENT_URL: process.env.CLIENT_URL,

  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,

  SALT_ROUNDS: process.env.SALT_ROUNDS,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES,
  JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES,

  DEVELOPMENT_STAGE: process.env.DEVELOPMENT_STAGE,

  YT_CONSOLE_API_KEY: process.env.YT_CONSOLE_API_KEY,
};
