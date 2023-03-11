const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/helpers');
const { uploadFile, getObjectSignedUrl, deleteFile, getFileStream } = require('../libs/s3')


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

    const tags = await models.Tags.scope('no_timestamps').findAndCountAll(options)
    const promises = tags.rows.map(async (tag) => {
      if (tag.image_url) {
        const imageURL = await getObjectSignedUrl(tag.image_url)
        tag.image_url = imageURL
      }
      return tag
    })

    const updatedTags = await Promise.all(promises)
    tags.rows = updatedTags
    
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
    const tagDetail = await models.Tags.scope('no_timestamps').findByPk(id)
    if (!tagDetail) throw new CustomError('Not found Tag', 404, 'Not Found')
    if (tagDetail.image_url) tagDetail.image_url = await getObjectSignedUrl(tagDetail.image_url)
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
      if (!tag) throw new CustomError('Not found Tag', 404, 'Not Found')
      if (tag.image_url) {
        const imageKey = tag.image_url.split('/').pop().split('?')[0]
        await deleteFile(imageKey)
      }
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