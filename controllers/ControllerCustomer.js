'use strict'

const customers = require('../data/customers.json')
const config = require('../config')
const apiGoogleMaps = require('../lib/apiGoogleMaps')
const { getIndexPage } = require('../lib/pagination')
const dbAccess = require('../models/dbAccess')

class ControllerCustomer {
  /**
   * Get amount customer
   *
   * @param req
   * @param res
   * @param next
   */
  static async amountCustomersByCity (req, res, next) {
    try {
      const { quantityPerPage, indexPage } = req.query
      const totalCities = []
      const totalCustomersByCity = []

      customers.map((customer) => {
        if (!totalCities.includes(`${customer.city}`)) {
          totalCities.push(customer.city)

          totalCustomersByCity.push({
            city: customer.city,
            customersTotal: 1
          })
        } else {
          const index = totalCities.findIndex((city) => city === customer.city)
          totalCustomersByCity[index].customersTotal++
        }
      })

      const result = getIndexPage(totalCustomersByCity, indexPage, quantityPerPage)

      res.status(200).send({
        totalCustomersByCity: totalCustomersByCity.length,
        ...result
      })
    } catch (e) {
      next(e)
    }
  }

  /**
   * Get customer group by city
   *
   * @param req
   * @param res
   * @param next
   */
  static async customersByCity (req, res, next) {
    try {
      const searchCity = req.query.city
      const customersByCity = []

      for (const i in customers) {
        if (customers[i].city === searchCity) {
          customersByCity.push(customers[i])
        }
      }

      if (customersByCity.length === 0) {
        res.status(404).send({ message: 'City not found' })
      }

      res.status(200).send(customersByCity)
    } catch (e) {
      next(e)
    }
  }

  /**
   * Get customer by id
   *
   * @param req
   * @param res
   * @param next
   */
  static async findById (req, res, next) {
    try {
      const id = req.params.id
      let customer

      for (const i in customers) {
        if (customers[i].id === id) {
          customer = customers[i]
          break
        }
      }

      if (!customer) {
        res.status(404).send({ message: 'Customer not found' })
      }

      const responseLatLng = await apiGoogleMaps.PlaceSearch(customer.city)

      if (
        responseLatLng.status !== 'OK' &&
        responseLatLng.status !== 'ZERO_RESULTS'
      ) {
        res.status(500).send({ responseLatLng })
      }

      if (responseLatLng.status === 'ZERO_RESULTS') {
        res.status(200).send({
          ...customer,
          lat: 'Not found',
          lng: 'Not found'
        })
      } else {
        const { lat, lng } = responseLatLng.candidates[0].geometry.location
        res.status(200).send({
          ...customer,
          lat,
          lng
        })
      }
    } catch (e) {
      next(e)
    }
  }

  /**
   * Create customers
   *
   * @param req
   * @param res
   */
  static async createCustomers (req, res) {
    try {
      const customers = req.body

      const db = await dbAccess(config.database)
      await db.User.bulkCreate(customers)

      res.status(200).send('Users created correctly')
    } catch (error) {
      console.log('Message ', error)
      res.status(500).send(`Message ${error}`)
    }
  }

  /**
   * Create customer
   *
   * @param req
   * @param res
   */
  static async createCustomer (req, res) {
    try {
      const customer = req.body

      const db = await dbAccess(config.database)
      await db.User.create(customer)

      res.status(200).send('User created correctly')
    } catch (error) {
      console.log('Message ', error)
      res.status(500).send(`Message ${error}`)
    }
  }
}

module.exports = ControllerCustomer
