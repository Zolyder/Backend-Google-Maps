const { DataTypes } = require('sequelize')
const db = require('./db')

module.exports = function setupUser (config) {
  const sequelize = db(config)

  const Users = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    gender: {
      type: DataTypes.STRING
    },
    company: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: function () {
        return new Date()
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: function () {
        return new Date()
      }
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  })

  return Users
}
