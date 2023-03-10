const models = require('../database/models')
const Sequelize = require('sequelize')
const { Op, cast, literal, fn, col } = require('sequelize')
const { CustomError } = require('../utils/helpers');


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
        }
      ],
      attributes: {
        include: [
          [cast(literal(
            `(SELECT COUNT(*) FROM "votes" 
						WHERE "votes"."publications_id" = "Publications"."id")`
          ), 'integer'), 'votes_count']
        ]
      }
    }

    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
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

    const { content } = query
    if (content) {
      options.where.content = { [Op.iLike]: `%${content}%` }
    }

    const { description } = query
    if (description) {
      options.where.description = { [Op.iLike]: `%${description}%` }
    }
    //Necesario para el findAndCountAll de Sequelize
    options.distinct = true

    const publications = await models.Publications.scope('no_timestamps').findAndCountAll(options)

    // const promises = publications.rows.map(async (element) => {
    //   const votes = await this.countVotes(element.id)
    //   return { ...element.toJSON(), votes }
    // })
    // const results = await Promise.all(promises)

    return publications
  }

  async findById(id) {
    try {
      const result = await models.Publications.scope('no_timestamps').findByPk(id, {
        include: [
          {
            model: models.Users.scope('view_public'),
            as: 'user'
          },
          {
            model: models.Cities.scope('no_timestamps'),
            as: 'city'
          },
          {
            model: models.Publications_types.scope('no_timestamps'),
            as: 'publications_type'
          }
        ],
        attributes: {
          include: [
            [cast(literal(
              `(SELECT COUNT(*) FROM "votes" 
              WHERE "votes"."publications_id" = "Publications"."id")`
            ), 'integer'), 'votes_count']
          ]
        }
      })
      if (!result) throw new CustomError('Not found Publication', 400, 'Publication not registered');
      return result
    } catch (error) {
      throw error;
    }
  }

  async createPublication(data) {
    const transaction = await models.sequelize.transaction();
    try {
      const result = await models.Publications.create({
        id: data.id,
        title: data.title,
        description: data.description,
        content: data.content,
        cities_id: data.cities_id,
        user_id: data.user_id,
        publications_types_id: data.publications_types_id
      }, { transaction })

      data.tags.forEach(async tag => {
        await this.createPublicationTags(tag, result.id)
        //await this.userPublicationTags(tag, result.user_id)
      })
      await transaction.commit();
      await this.addAndDelete(result.id, result.user_id)
      return result
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async createPublicationTags(tag_id, publication_id) {
    const tag = models.Tags.findByPk(tag_id)
    if (!tag) throw new CustomError('Not found tag', 400, 'Bad request');
    const transaction = await models.sequelize.transaction();
    try {
      await models.Publications_tags.create({ tag_id, publication_id }, { transaction })
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async userPublicationTags(tag_id, user_id) {
    const transaction = await models.sequelize.transaction();
    try {
      await models.Users_tags.create({ tag_id, user_id }, { transaction })
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async delete(id) {
    const transaction = await models.sequelize.transaction();
    try {
      const publication = await models.Publications.findByPk(id);

      if (!publication) throw new CustomError('Not found publication', 404, 'Not Found');
      const deletePublication = await publication.destroy({ transaction });
      await transaction.commit();

      return deletePublication;

    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async addAndDelete(publicationId, userId) {
    const transaction = await models.sequelize.transaction();
    try {
      // const publication = await models.Publications.findByPk(publicationId);
      const vote = await models.Votes.findOne({ where: { user_id: userId, publications_id: publicationId } });
      if (vote) {
        const deleteVote = await models.Votes.destroy({ where: { user_id: userId, publications_id: publicationId } }, { transaction });
        await transaction.commit();

        return deleteVote;

      } else {
        const newVote = await models.Votes.create({ user_id: userId, publications_id: publicationId }, { transaction });
        await transaction.commit();

        return newVote;
      }
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = PublicationsService;