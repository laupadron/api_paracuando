const PublicationsTypesService = require('../services/publicationsTypes.service');
const { getPagination, CustomError } = require('../utils/helpers');

const publicationsTypesService = new PublicationsTypesService;

const getFilteredPublicationType = async(req,res,next)=>{
  const result = {
    results: {}
  }
  const { publicationsTypesPerPage, currentPage } = { publicationsTypesPerPage: 10, currentPage: 1 };
  const { limit, offset } = getPagination(currentPage, publicationsTypesPerPage);

  try {
    const publicationsTypes = await publicationsTypesService.findPublicationsTypes({ ...req.query, limit, offset });
    result.results.count = publicationsTypes.count
    result.results.totalPages = Math.ceil(publicationsTypes.count / publicationsTypesPerPage)
    result.results.currentPage = currentPage
    result.results.results = publicationsTypes.rows
    res.json(result)
  } catch (error) {
    next(error)
  }
}

const getPublicationTypeById = async(request, response, next) => {
  const id = request.params.id;
  const result = {result: {}}
  try {
    result.result = await publicationsTypesService.getPublicationTypeById(id)
    return response.json(result);
  } catch (error) {
    next(error)
  }
}

const updatePublicationTypeById = async (request, response, next) => {
  const id = request.params.id;
  const obj = request.body;
  try {
    await publicationsTypesService.updatePublicationTypeById(id, obj)
    return response.json({message: 'Success Update'});
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getPublicationTypeById,
  updatePublicationTypeById,
  getFilteredPublicationType
}