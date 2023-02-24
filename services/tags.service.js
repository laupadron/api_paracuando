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
  async createdTag(tag) {
    const transaction = await models.sequelize.transaction()
    try {
      const newTag = await models.Tags.create(tag);
      return newTag
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  async getDetailTag(id) {
    const transaction = await models.sequelize.transaction()
    try {
      const tagDetail = await models.Tags.findByPk(id)
      return tagDetail
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async updateTagById(id, obj){
    const transaction = await models.sequelize.transaction()
    try {
      const tag = await models.Tags.findByPk(id)
      if (!tag) throw new CustomError('Not found Tag', 404, 'Not Found')
      const updatedTag = await tag.update(obj, { transaction })
      await transaction.commit()
      return updatedTag
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async deleteTagById(id){
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