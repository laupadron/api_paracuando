const models = require('../database/models')
const Sequelize = require('sequelize');
const { Op } = require('sequelize')
const { CustomError } = require('../utils/helpers');

// get

class PublicationsService {
  constructor() {
  }

  async findAndCount(query) {
    const options = {
      where: {},
      include: [
        {
          model: models.Users.scope('view_public'),
          as: 'user'
        },
        // {
        //   model: models.Votes.scope('allvotes'),
        //   as: 'votes',
        //   attributes: [Sequelize.fn('COUNT', Sequelize.col('votes.publications_id')), 'total_votes']
        // }
      ],
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

    const { tag_id } = query
    if (tag_id) {
      const publication_id = await models.Publications_tags.findAll({ where: { tag_id }, attributes: { exclude: ['id'] } })
      const ids = publication_id.map(pub => pub.publication_id) // armo el array con las ids que tiene el tag buscado
      options.where.id = { [Op.in]: ids }
    }

    const { publications_types_id } = query
    if (publications_types_id) {
      options.where.publications_types_id = publications_types_id
    }

    const { title } = query
    if (title) {
      options.where.title = { [Op.iLike]: `%${title}%` }
    }

    const { description } = query
    if (description) {
      options.where.description = { [Op.iLike]: `%${description}%` }
    }
    //Necesario para el findAndCountAll de Sequelize
    options.distinct = true

    const publications = await models.Publications.findAndCountAll(options)

    const promises = publications.rows.map(async (element) => {
      const votes = await this.countVotes(element.id)
      return { ...element.toJSON(), votes }
    })

    const results = await Promise.all(promises)

    return { ...publications, rows: results }
  }

  async countVotes(publications_id) {
    const { count } = await models.Votes.scope('allvotes').findAndCountAll({
      where: { publications_id },
    })
    return count
  }
}

module.exports = PublicationsService