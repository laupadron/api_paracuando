const RolesService = require('../services/roles.service');
const { getPagination, CustomError } = require('../utils/helpers');

const rolesService = new RolesService


const getRoles = async (req, res, next) => {
  const rolesPerPage = 10;
  const page = 1;
  const { limit, offset } = getPagination(page, rolesPerPage);

  try {
    const roles = await rolesService.findAndCount({ limit, offset })
    res.json(roles);

  } catch (error) {
    next(error)
  }

}

module.exports = {
  getRoles
}
