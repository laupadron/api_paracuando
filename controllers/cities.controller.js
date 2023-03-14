const CitiesService = require('../services/cities.service');
const { getPagination, CustomError } = require('../utils/helpers');

const citiesService = new CitiesService


const getCities = async (req, res, next) => {
  const citiesPerPage = 10;
  const page = 1;
  const { limit, offset } = getPagination(page, citiesPerPage);

  try {
    const cities = await citiesService.findAndCount({ limit, offset })
    return res.json(cities);

  } catch (error) {
    next(error)
  }

}

module.exports = {
  getCities
}
