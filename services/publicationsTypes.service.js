const models = require('../database/models')
const  {CustomError}  = require('../utils/helpers');


class PublicationsTypesService{
  constructor() {}


  async getPublicationTypeById(id){
    const result = await models.Publications_types.findOne({where: {id}})
    if (!result) throw new CustomError('Not found Publication type', 404, 'Not Found')
    return result
  }
}

module.exports = PublicationsTypesService