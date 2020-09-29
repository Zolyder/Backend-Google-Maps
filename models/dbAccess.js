'use strict'

const initDatabase = require('./db')

/* -----Setup Users----- */
const setupUserModel = require('./users')
/* Querys */
// const addUserQuery = require('./querys/users')

module.exports = async function setupDatabase (config) {
  const sequelizeDatabase = initDatabase(config)

  const UserModel = setupUserModel(config)

  // const User = addUserQuery(UserModel)
  const User = UserModel

  await sequelizeDatabase.authenticate()

  return {
    User
  }
}
