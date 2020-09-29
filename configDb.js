'use strict'

const fs = require('fs')
const env = require('node-env-file')

if (fs.existsSync(`${__dirname}/.env`)) {
  env(`${__dirname}/.env`)
}

const db = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || '',
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  dialect: process.env.DB_TYPE || 'postgres',
  operatorsAliases: false
}

module.exports = db
