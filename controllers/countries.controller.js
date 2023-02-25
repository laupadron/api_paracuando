const CountriesService = require('../services/countries.service');
const { getPagination, CustomError } = require('../utils/helpers');

const countriesService = new CountriesService


const getCountries = async (req, res, next) => {
  const countriesPerPage = 10;
  const page = 1;
  const { limit, offset } = getPagination(page, countriesPerPage);

  try {
    const countries = await countriesService.findAndCount({ limit, offset })
    //console.log(countries);
    res.json(countries);

  } catch (error) {
    next(error)
  }

}

module.exports = {
  getCountries
}