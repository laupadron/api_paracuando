const PublicationsService = require('../services/publications.service');
const { getPagination, CustomError } = require('../utils/helpers');

const publicationsService = new PublicationsService


const getPublications = async (req, res, next) => {
  const statesPerPage = 10;
  const page = 1;
  const { limit, offset } = getPagination(page, statesPerPage);

  try {
    const publications = 'hola'
    res.json(publications);

  } catch (error) {
    next(error)
  }

}

module.exports = {
  getPublications
}
 