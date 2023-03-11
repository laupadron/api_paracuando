const AuthService = require('../services/auth.service');
const UsersService = require('../services/users.service')
const { CustomError, getPagination } = require('../utils/helpers');

const usersService = new UsersService()
const authService = new AuthService()

const getUsers = async (req, res, next) => {
  const result = {
    results: {}
  }
  const { usersPerPage, currentPage } = { usersPerPage: 4, currentPage: 1 };
  const { limit, offset } = getPagination(currentPage, usersPerPage);

  try {
    const users = await usersService.findAndCount({ ...req.query, limit, offset })
    result.results.count = users.count
    result.results.totalPages = Math.ceil(users.count / usersPerPage)
    result.results.CurrentPage = currentPage
    result.results.results = users.rows
    return res.json(result)
  } catch (error) {
    next(error)
  }
}

const getUserById = async (req, res, next) => {
  const isSameUser = req.isSameUser
  const idFromParams = req.params.id
  const role = req.userRole
  let results = {
    result: {}
  }

  try {
    const user= await usersService.getUser(idFromParams)
    results.result = user
    if (isSameUser || role === 2) {
      return res.status(200).json(results)
    } else {
      results.result.first_name = user.first_name
      results.result.last_name = user.last_name,
      results.result.image_url = user.image_url
      return res.status(200).json(results)
    }
  } catch (error) {
    next(error)
  }
}

const getUserVotes = async (req, res, next) => {
  const result = {
    results: {}
  }
  const userId = req.params.id
  const { votesPerPage, currentPage } = { votesPerPage: 4, currentPage: 1 };
  const { limit, offset } = getPagination(currentPage, votesPerPage);

  try {
    await usersService.getAuthUserOr404(userId);
    const userVotes = await usersService.getUserVotes(userId, limit, offset)
    result.results.count = userVotes.count
    result.results.totalPages = Math.ceil(userVotes.count / votesPerPage)
    result.results.CurrentPage = currentPage
    result.results.results = userVotes.rows
    res.json(result)
  } catch (error) {
    next(error)
  }
}

const getUserPublications = async (req, res, next) => {
  const result = {
    results: {}
  }
  const user_id = req.params.id
  
  const { publicationsPerPage, currentPage } = { publicationsPerPage: 4, currentPage: 1 };
  const { limit, offset } = getPagination(currentPage, publicationsPerPage);
  try {
    await usersService.getAuthUserOr404(user_id);
    const userPublications = await usersService.getUserPublications({... req.query, user_id, limit, offset})
    result.results.count = userPublications.count
    result.results.totalPages = Math.ceil(userPublications.count / publicationsPerPage)
    result.results.CurrentPage = currentPage
    result.results.results = userPublications.rows
    res.json(result)
  } catch (error) {
    next(error)
  }
}

const updateUserById = async (req, res, next) => {
  const isSameUser = req.isSameUser
  const idFromParams = req.params.id
  try {
    if (isSameUser) {
      await usersService.updateUser(idFromParams, req.body)
      return res.json({ message: 'Success Update' });
    } throw new CustomError('Not authorized user', 403, 'Forbbiden')
  } catch (error) {
    next(error)
  }
}

const addInterest = async (req, res, next) => {
  const isSameUser = req.isSameUser;
  const user_id = req.params.id;
  const { tag_id } = req.body;

  try {
    if (isSameUser) {
      await usersService.addInterestUser(user_id, tag_id);
      return res.json({ message: 'Interest Added' });
    } throw new CustomError('Not authorized user', 403, 'Forbbiden');

  } catch (error) {
    next(error);
  }
};

const removeInterest = async (req, res, next) => {
  const isSameUser = req.isSameUser;
  const user_id = req.params.id;
  const { tag_id } = req.body;

  try {
    if (isSameUser) {
      await usersService.removeInterestUser(user_id, tag_id);
      return res.json({ message: 'Interest removed' });
    } throw new CustomError('Not authorized user', 403, 'Forbbiden');
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getUsers,
  getUserById,
  updateUserById,
  addInterest,
  removeInterest,
  getUserVotes,
  getUserPublications,
  
}