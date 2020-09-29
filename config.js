'use strict'

const env = require('node-env-file')
env(`${__dirname}/.env`)

const config = {
  app: {
    port: process.env.SERVER_PORT || 3000
  },
  googleMaps: {
    apiKey: process.env.API_KEY_GOOGLE,
    host: process.env.HOST_GOOGLE
  },
  logs: {
    logErrors: false || process.env.LOG_ERRORS,
    showErrors: false || process.env.SHOW_ERRORS
  },
  database: {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres'
  }
}

module.exports = config
