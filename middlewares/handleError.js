'use strict'

const cfg = require('../config')

const handleError = (err) => {
    // Log errors.
    if (cfg.logs.logErrors === 'true') {
      console.log('An error ocurred: ' + err.stack)
    }
}

module.exports = handleError