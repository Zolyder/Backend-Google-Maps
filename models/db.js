const Sequelize = require('sequelize')
let sequelize = null

module.exports = function initDatabase (config) {
  if (!sequelize) {
    sequelize = new Sequelize(config)
  }
  return sequelize
}
