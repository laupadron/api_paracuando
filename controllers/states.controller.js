const StatesService = require('../services/states.service');
const { getPagination, CustomError } = require('../utils/helpers');

const statesService = new StatesService


const getStates = async (req, res, next) => {
  const statesPerPage = 10;
  const page = 1;
  const { limit, offset } = getPagination(page, statesPerPage);

  try {
    const states = await statesService.findAndCount({ limit, offset })
    return res.json(states);

  } catch (error) {
    next(error)
  }

}

module.exports = {
  getStates
}
