const express = require('express')
// const routesUsers = require('./users.routes')

// const isAuthenticatedByPassportJwt = require('../libs/passport')

const routesAuth = require('./auth.routes')
const usersRoutes = require('./users.routes')
const publicationsTypesRoutes = require('./publicationsTypesRoutes.routes')
const countriesRoutes = require('./countries.routes')
const statesRoutes = require('./states.routes')

function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)
  router.use('/auth', routesAuth)
  router.use('/users', usersRoutes)
  router.use('/publications-types', publicationsTypesRoutes)
  router.use('/countries', countriesRoutes)
  router.use('/states', statesRoutes)
}

module.exports = routerModels
