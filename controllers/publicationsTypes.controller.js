const PublicationsTypesService = require('../services/publicationsTypes.service');
const { getPagination, CustomError } = require('../utils/helpers');

const publicationsTypesService = new PublicationsTypesService;

const getFilteredPublicationType = async(req,res,next)=>{
  const query = req.query
  const { publicationsTypesPerPage, currentPage } = { publicationsTypesPerPage: 10, currentPage: 1 };
  const { limit, offset } = getPagination(currentPage, publicationsTypesPerPage);
  query.limit = limit;
  query.offset = offset;
  try {
    const publicationsTypes = await publicationsTypesService.findPublicationsTypes(query);
    res.json(publicationsTypes)
  } catch (error) {
    next(error)
  };
;}

const getPublicationTypeById = async(request, response, next) => {
  const id = request.params.id;
  try {
    const result = await publicationsTypesService.getPublicationTypeById(id)
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