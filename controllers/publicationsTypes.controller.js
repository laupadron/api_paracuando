const PublicationsTypesService = require('../services/publicationsTypes.service')

const publicationsTypesService = new PublicationsTypesService;

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
  updatePublicationTypeById
}