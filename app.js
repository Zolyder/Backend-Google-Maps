'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const customerRoutes = require('./routes/customer')
const handleError = require('./middlewares/handleError')
const cors = require('cors')

const app = express()

app.use(cors({
  origin: 'http://localhost:3000'
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/**
 * Routes app
 */
app.use(customerRoutes)

/*
 * Middleware for handle errors
 */
app.use(handleError)

module.exports = app
