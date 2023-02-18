const AuthService = require('../services/auth.service')
const UsersService = require('../services/users.service')
const { CustomError } = require('../utils/helpers')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const usersService = new UsersService;
const authService = new AuthService;

const checkAdminRole = async (req, res, next) => {
  const id = req.user.id
  const user = await authService.userToken(id)
  const role = Number(user.profiles[0].role_id)
  try {
    if (role !== 2) {
      throw new CustomError('No tienes permisos para acceder a este recurso', 403, 'Forbidden');
    }
    next();
  } catch (error) {
    next(error)
  }
}

module.exports = {
  checkAdminRole
}