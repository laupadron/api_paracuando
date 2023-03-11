const AuthService = require('../services/auth.service')
const PublicationsService = require('../services/publications.service')
const { CustomError } = require('../utils/helpers')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const authService = new AuthService;
const publicationsService = new PublicationsService;

const checkRole = async (req, res, next) => {
  const id = req.user.id
  const { profiles } = await authService.userToken(id)
  if (!profiles) throw new CustomError('Not found User', 404, 'Not Found')
  req.userRole = profiles[0].role_id // aqui esta el número de rol
  next()
}

const checkAdmin = async (req, res, next) => {
  //console.log(req.userRole);
  if (req.userRole === 2) {
    next()
  } else {
    const error = new CustomError('User not authorized', 403, 'Forbbiden')
    next(error)
  }
}

const checkSameUser = async (req, res, next) => {
  const idFromParams = req.params.id

  const idFromToken = req.user.id
  if (idFromParams === idFromToken) {
    req.isSameUser = true
    next();
  } else {
    req.isSameUser = false
    next();
  }
}

const checkPublicationOwner = async (req, res, next) => {
  const publicationID = req.params.id
  const idFromToken = req.user.id

  try {
    const { user } = await publicationsService.findById(publicationID)
    if (user.id === idFromToken) {
      req.publicationOwner = true
      next();
    } else {
      req.publicationOwner = false
      next();
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  checkRole,
  checkAdmin,
  checkSameUser,
  checkPublicationOwner
}