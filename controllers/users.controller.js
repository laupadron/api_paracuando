const AuthService = require('../services/auth.service');
const UsersService = require('../services/users.service')
const  {CustomError, getPagination, getPagingData}  = require('../utils/helpers');

const usersService = new UsersService()
const authService = new AuthService()

const getUsers = async (req, res, next) => {
  const query = req.query
  const queryKeys = Object.keys(query)
  const result = {}
  const usersPerPage = 10;
  const page = 1;
  const { limit, offset } = getPagination(page, usersPerPage);
  

  if (queryKeys.length === 0) {
    try {
      const users = await usersService.getAllUsersPaginated(limit, offset );
      const { count, totalPages, currentPage, results } = getPagingData(users, page, limit);
      result.results = {count,totalPages, currentPage, results}
      return res.json(result)
    } catch (error) {
      next(error)
    }
  }else{
    try {
      const keysNames = ['first_name', 'last_name', 'email', 'username']
      queryKeys.forEach(async (key) => {
        if (keysNames.includes(key)) {
          const users = await usersService.getFilteredUsersPaginated(key, query[key], limit, offset )
          const { count, totalPages, currentPage, results } = getPagingData(users, page, limit);
          result.results = {count,totalPages, currentPage, results}
          return res.status(200).json(result)
        }
      });
    } catch (error) {
      next(error)
    }
  }
}

const getUserById = async (req, res, next) => {
  const isSameUser = req.isSameUser
  const idFromParams = req.params.id
  const user = await authService.userToken(idFromParams) //This id comes from token
  const role = Number(user.profiles[0].role_id)
  try {
    let result = await usersService.getUser(idFromParams)
    if (isSameUser || role === 2) {
      return res.status(200).json(result)
    } else {
      const {first_name, last_name, image_url} = result
      result = {}
      result = {first_name, last_name, image_url}
      return res.status(200).json(result)
    }
  } catch (error) {
    next(error)
  }
}

const updateUserById = async (req, res, next) => {
  const isSameUser = req.isSameUser
  const idFromParams = req.params.id
  const {first_name, last_name} = req.body
  try {
    if(isSameUser){
      await usersService.updateUser(idFromParams, {first_name, last_name})
      return res.json({message: 'Succes Update'});
    } throw new CustomError('Not authorized user', 401, 'Unauthorized')
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getUsers,
  getUserById,
  updateUserById
}