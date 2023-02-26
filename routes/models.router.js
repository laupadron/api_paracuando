const express = require('express')
// const routesUsers = require('./users.routes')

// const isAuthenticatedByPassportJwt = require('../libs/passport')

const routesAuth = require('./auth.routes')
const usersRoutes = require('./users.routes')
const publicationsTypesRoutes = require('./publicationsTypesRoutes.routes')
const countriesRoutes = require('./countries.routes')
const statesRoutes = require('./states.routes')
const citiesRoutes = require('./cities.routes')
const rolesRoutes = require('./roles.routes')
const tagsRoutes = require('./tags.routes')
const publicationsRoutes = require('./publicationsRoutes.routes')

function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)
  router.use('/auth', routesAuth)
  router.use('/users', usersRoutes)
  router.use('/publications-types', publicationsTypesRoutes)
  router.use('/countries', countriesRoutes)
  router.use('/states', statesRoutes)
  router.use('/cities', citiesRoutes)
  router.use('/roles', rolesRoutes)
  router.use('/tags', tagsRoutes)
  router.use('/publications', publicationsRoutes)
}

module.exports = routerModels
