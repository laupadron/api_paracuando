const AuthService = require('../services/auth.service');
const UsersService = require('../services/users.service')
const { CustomError, getPagination } = require('../utils/helpers');

const usersService = new UsersService()
const authService = new AuthService()

const getUsers = async (req, res, next) => {
  const query = req.query
  const { limit, offset } = getPagination(1, 10);
  query.limit = limit
  query.offset = offset

  try {
    const users = await usersService.findAndCount(query)
    return res.json(users)
  } catch (error) {
    next(error)
  }
}

const getUserById = async (req, res, next) => {
  const isSameUser = req.isSameUser
  const idFromParams = req.params.id
  const role = req.userRole
  console.log(role)

  try {
    let result = await usersService.getUser(idFromParams)
    if (isSameUser || role === 2) {
      return res.status(200).json(result)
    } else {
      return res.status(200).json({
        first_name: result.first_name,
        last_name: result.last_name,
        image_url: result.image_url
      })
    }
  } catch (error) {
    next(error)
  }
}

const updateUserById = async (req, res, next) => {
  const isSameUser = req.isSameUser
  const idFromParams = req.params.id
  const { first_name, last_name } = req.body
  try {
    if (isSameUser) {
      await usersService.updateUser(idFromParams, { first_name, last_name })
      return res.json({ message: 'Succes Update' });
    } throw new CustomError('Not authorized user', 401, 'Unauthorized')
  } catch (error) {
    next(error)
  }
}

const addInterest = async (req,res,next) => {
  const isSameUser = req.isSameUser;
  const idFromParams = req.params.id;
  const {tag_id} = req.body;
  
  try {
    if (isSameUser) {
      await usersService.addInterestUser(idFromParams,{tag_id});
      return res.json({message:'InterestAdded'});
    } throw new CustomError('Not authorized user', 401, 'Unauthorized');
    
  } catch (error) {
    next(error);
  }
};

const removeInterest = async (req,res,next) => {
  const isSameUser = req.isSameUser;
  const idFromParams = req.params.id;
  const {tag_id} = req.body;

  try {
    if (isSameUser) {
      await usersService.removeInterestUser(idFromParams,{tag_id});
      return res.json({message:'Interest removed'});
    } throw new CustomError('Not authorized user', 401, 'Unauthorized');
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUsers,
  getUserById,
  updateUserById,
  addInterest,
  removeInterest
}