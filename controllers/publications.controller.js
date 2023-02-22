const PublicationsService = require('../services/publications.service');
const { getPagination, CustomError } = require('../utils/helpers');

const publicationsService = new PublicationsService


const getPublications = async (req, res, next) => {
  const query = req.query
  const {publicationsPerPage, currentPage} = {publicationsPerPage: 10, currentPage:1};
  const { limit, offset } = getPagination(currentPage, publicationsPerPage);
  query.limit = limit
  query.offset = offset

  try {
    const publications = await publicationsService.findAndCount(query)
    console.log(publications);
    res.json(publications);
    
  } catch (error) {
    next(error)
  }
}
// el tag es un numero 1,2,3,4,
module.exports = {
  getPublications
}