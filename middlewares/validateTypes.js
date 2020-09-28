'use strict'

function validateCity (req, res, next) {
  try {
    const { city } = req.query

    if (!city) {
      return res.status(400).send({ Error: 'city is required' })
    }

    return next()
  } catch (error) {
    next(error)
  }
}

function validateId (req, res, next) {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).send({ Error: 'id is required' })
    }

    if (isNaN(id)) {
      return res.status(400).send({ Error: 'id must be a number' })
    }

    return next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  validateCity,
  validateId
}
