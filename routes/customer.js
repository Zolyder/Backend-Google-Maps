const express = require('express')
const api = express.Router()
const ControllerCustomer = require('../controllers/ControllerCustomer')
const {	
    validateCity,
    validateId
} = require('../middlewares/validateTypes')

api.get('/customers/total-customers', ControllerCustomer.amountCustomersByCity)
api.get('/customers/list-customers', validateCity, ControllerCustomer.customersByCity)
api.get('/customer/:id', validateId, ControllerCustomer.findById)

module.exports = api
