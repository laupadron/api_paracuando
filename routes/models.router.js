const express = require('express')
const swaggerDocs = require('../swagger')

// const routesUsers = require('./users.routes')

// const isAuthenticatedByPassportJwt = require('../libs/passport')

const routesAuth = require('./auth.routes')
const usersRoutes = require('./users.routes')

function routerModels(app,PORT) {
  const router = express.Router()

  app.use('/api/v1', router)
  router.use('/auth', routesAuth)
  // router.use('/users',routesUsers)
  swaggerDocs(router, PORT)
  router.use('/users', usersRoutes)
}

module.exports = routerModels
