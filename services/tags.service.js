const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/helpers');

// get

class TagsService {
  constructor() {
  }

  async getFilteredTags(query) {
    const options = {
      where: {},
    }

    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    const { name } = query
    if (name) {
      options.where.name = { [Op.iLike]: `%${name}%` }
    }

    const { description } = query
    if (description) {
      options.where.description = { [Op.iLike]: `%${description}%` }
    }
    //Necesario para el findAndCountAll de Sequelize
    options.distinct = true

    const tags = await models.Tags.findAndCountAll(options)
    return tags;
  }

  async createTag(tag) {
    const transaction = await models.sequelize.transaction()
    try {
      await models.Tags.create(tag, { transaction });
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async getDetailTag(id) {
    const tagDetail = await models.Tags.findByPk(id)
    if (!tagDetail) throw new CustomError('Not found Tag', 404, 'Not Found')
    return tagDetail
  }

  async updateTagById(id, obj) {
    const transaction = await models.sequelize.transaction()
    try {
      const tag = await this.getDetailTag(id)
      const updatedTag = await tag.update(obj, { transaction })
      await transaction.commit()
      return updatedTag
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async deleteTagById(id) {
    const transaction = await models.sequelize.transaction()
    try {
      const tag = await models.Tags.findByPk(id)
      console.log(tag)
      if (!tag) throw new CustomError('Not found Tag', 404, 'Not Found')
      const deletedTag = await tag.destroy()
      await transaction.commit()
      return deletedTag
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}

module.exports = TagsService