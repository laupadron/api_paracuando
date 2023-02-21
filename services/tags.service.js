const models = require('../database/models')
const { Op } = require('sequelize')
const  { CustomError }  = require('../utils/helpers')

class TagsService {

  constructor() {
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