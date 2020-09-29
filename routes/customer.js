const express = require('express')
const api = express.Router()
const ControllerCustomer = require('../controllers/ControllerCustomer')
const {
  validateCity,
  validateId
} = require('../middlewares/validateTypes')

/* Routes with file customers.json */
api.get('/customers/total-customers', ControllerCustomer.amountCustomersByCity)
api.get('/customers/list-customers', validateCity, ControllerCustomer.customersByCity)
api.get('/customer/:id', validateId, ControllerCustomer.findById)

/* Routes with file */
api.post('/customers', ControllerCustomer.createCustomers)
api.post('/customer', ControllerCustomer.createCustomer)

module.exports = api
