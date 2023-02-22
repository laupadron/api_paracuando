const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/helpers');

// get

class PublicationsService {
  constructor() {
  }

  async findAndCount(query) {
    const options = {
      where: {},
    }

    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    const { id } = query
    if (id) {
      options.where.id = id
    }

    const { name } = query
    if (name) {
      options.where.name = { [Op.iLike]: `%${name}%` }
    }
    //Necesario para el findAndCountAll de Sequelize
    options.distinct = true

    const tags = await models.Tags.findAndCountAll(options)
    return tags;
  }
}

module.exports = PublicationsService