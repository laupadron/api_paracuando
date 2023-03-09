const AuthService = require('../services/auth.service')
const UsersService = require('../services/users.service')
const { CustomError } = require('../utils/helpers')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const authService = new AuthService;

const checkRole = async (req, res, next) => {
  const id = req.user.id
  const { profiles } = await authService.userToken(id)
  if (!profiles) throw new CustomError('Not found User', 404, 'Not Found')
  req.userRole = profiles[0].role_id // aqui esta el número de rol
  next()
}

const checkAdmin = async (req, res, next) =>{
  //console.log(req.userRole);
  if (req.userRole === 2) {
    next()
  } else {
    const error = new CustomError('User not authorized', 401, 'Unauthorized')
    next(error)
  }
}

const checkSameUser = async (req, res, next) => {
  const idFromParams = req.params.id
  
  const idFromToken = req.user.id
  if (idFromParams === idFromToken) {
    req.isSameUser = true
    console.log(req.isSameUser);
    next();
  }else{
    req.isSameUser = false
    console.log(req.isSameUser);
    const error = new CustomError('User not authorized', 401, 'Unauthorized')
    next(error);
  }
}

module.exports = {
  checkRole,
  checkAdmin,
  checkSameUser
}