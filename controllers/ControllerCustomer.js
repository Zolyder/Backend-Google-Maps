"use strict";

const customers = require("../data/customers.json");
const apiGoogleMaps = require("../lib/apiGoogleMaps");
const { getIndexPage } = require('../lib/pagination');

class ControllerCustomer {
  /**
   * Get amount customer
   *
   * @param req
   * @param res
   * @param next
   */
  static async amountCustomersByCity(req, res, next) {
    try {
      const { quantityPerPage, indexPage } = req.query
      let totalCities = [];
      let totalCustomersByCity = [];

      customers.map((customer) => {
        if (!totalCities.includes(`${customer.city}`)) {
          totalCities.push(customer.city);

          totalCustomersByCity.push({
            city: customer.city,
            customersTotal: 1,
          });
        } else {
          let index = totalCities.findIndex((city) => city === customer.city);
          totalCustomersByCity[index].customersTotal++;
        }
      });

      const result = getIndexPage(totalCustomersByCity, indexPage, quantityPerPage)

      res.status(200).send({
        'totalCustomersByCity': totalCustomersByCity.length,
        ...result
      });
    } catch (e) {
      next(e);
    }
  }

  /**
   * Get customer group by city
   *
   * @param req
   * @param res
   * @param next
   */
  static async customersByCity(req, res, next) {
    try {
      const searchCity = req.query.city;
      let customersByCity = [];

      for (let i in customers) {
        if (customers[i].city == searchCity) {
          customersByCity.push(customers[i]);
        }
      }

      if (customersByCity.length == 0) {
        res.status(404).send({ message: "City not found" });
      }

      res.status(200).send(customersByCity);
    } catch (e) {
      next(e);
    }
  }

  /**
   * Get customer by id
   *
   * @param req
   * @param res
   * @param next
   */
  static async findById(req, res, next) {
    try {
      const id = req.params.id;
      let customer;

      for (let i in customers) {
        if (customers[i].id == id) {
          customer = customers[i];
          break;
        }
      }

      if (!customer) {
        res.status(404).send({ message: "Customer not found" });
      }

      const responseLatLng = await apiGoogleMaps.PlaceSearch(customer.city);

      if (
        responseLatLng.status !== "OK" &&
        responseLatLng.status !== "ZERO_RESULTS"
      ) {
        res.status(500).send({ responseLatLng });
      }

      if (responseLatLng.status === "ZERO_RESULTS") {
        res.status(200).send({
          ...customer,
          lat: "Not found",
          lng: "Not found",
        });
      } else {
        let { lat, lng } = responseLatLng.candidates[0].geometry.location;
        res.status(200).send({
          ...customer,
          lat,
          lng,
        });
      }
    } catch (e) {
      next(e);
    }
  }
}

module.exports = ControllerCustomer;