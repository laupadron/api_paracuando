const { v4: uuid4 } = require('uuid');
const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/helpers');
const { hashPassword } = require('../libs/bcrypt');
const { uploadFile, getObjectSignedUrl, deleteFile, getFileStream } = require('../libs/s3')

class UsersService {

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

    const { first_name } = query
    if (first_name) {
      options.where.first_name = { [Op.iLike]: `%${first_name}%` }
    }

    const { last_name } = query
    if (last_name) {
      options.where.last_name = { [Op.iLike]: `%${last_name}%` }
    }

    const { email } = query
    if (email) {
      options.where.email = { [Op.iLike]: `%${email}%` }
    }

    const { username } = query
    if (username) {
      options.where.username = { [Op.iLike]: `%${username}%` }
    }

    //Necesario para el findAndCountAll de Sequelize
    options.distinct = true

    const users = await models.Users.scope('view_me').findAndCountAll(options)

    const promises = users.rows.map(async (user) => {
      if (user.image_url) {
        const imageURL = await getObjectSignedUrl(user.image_url)
        user.image_url = imageURL
      }
      return user
    })

    const updatedUsers = await Promise.all(promises)
    users.rows = updatedUsers
    return users
  }

  async createAuthUser(obj) {
    const transaction = await models.sequelize.transaction()
    try {

      obj.id = uuid4()
      obj.password = hashPassword(obj.password)
      let newUser = await models.Users.create(obj, { transaction, fields: ['id', 'first_name', 'last_name', 'password', 'email', 'username'] })

      let publicRole = await models.Roles.findOne({ where: { name: 'public' } }, { raw: true })

      let newUserProfile = await models.Profiles.create({ user_id: newUser.id, role_id: publicRole.id }, { transaction })

      await transaction.commit()
      return newUser
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }


  async getAuthUserOr404(id) {
    let user = await models.Users.scope('auth_flow').findByPk(id, { raw: true })
    if (!user) throw new CustomError('Not found User', 404, 'Not Found')
    return user
  }

  async getUser(id) {
    let user = await models.Users.scope('view_same_user').findByPk(id, {
      include: {
        model: models.Tags.scope('view_public'),
        as: 'interests'
      }
    })
    if (!user) throw new CustomError('Not found User', 404, 'Not Found')
    if (user.image_url) user.image_url = await getObjectSignedUrl(user.image_url)
    return user
  }

  async getUserVotes(userId, limit, offset) {
    const userVotes = await models.Votes.findAndCountAll({
      limit,
      offset,
      where: {
        user_id: userId
      }
    })
    return userVotes
  }

  async getUserPublications(query) {
    let options = {
      where: {},
      include: [
        {
          model: models.Publications_images.scope('view_public'),
          as: 'images'
        }
      ]
    }

    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    const { user_id } = query
    if (user_id) {
      options.where.user_id = user_id
    }

    const { title } = query
    if (title) {
      options.where.title = { [Op.iLike]: `%${title}%` }
    }

    const { description } = query
    if (description) {
      options.where.description = { [Op.iLike]: `%${description}%` }
    }

    const { content } = query
    if (content) {
      options.where.content = { [Op.iLike]: `%${content}%` }
    }

    const { cities_id } = query
    if (cities_id) {
      options.where.cities_id = { [Op.iLike]: `%${cities_id}%` }
    }

    const { publications_types_id } = query
    if (publications_types_id) {
      options.where.publications_types_id = { [Op.iLike]: `%${publications_types_id}%` }
    }

    //Necesario para el findAndCountAll de Sequelize
    options.distinct = true
    const userPublications = await models.Publications.findAndCountAll(options)

    const updatedPublications = await Promise.all(userPublications.rows.map(async publication => {
      const images = await Promise.all(publication.images.map(async image => {
        if (image.image_url) {
          const image_url = await getObjectSignedUrl(image.image_url)
          return { ...image.toJSON(), image_url }
        }
      }))
      return { ...publication.toJSON(), images }
    }))
    userPublications.rows = updatedPublications
    return userPublications
  }

  async findUserByEmailOr404(email) {
    if (!email) throw new CustomError('Email not given', 400, 'Bad Request')
    let user = await models.Users.findOne({ where: { email } }, { raw: true })
    if (!user) throw new CustomError('Not found User', 404, 'Not Found')
    return user
  }

  async updateUser(id, obj) {
    const transaction = await models.sequelize.transaction()
    try {
      let user = await models.Users.findByPk(id)

      if (!user) throw new CustomError('Not found user', 404, 'Not Found')
      let updatedUser = await user.update(obj, { transaction })
      await transaction.commit()
      return updatedUser
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeUser(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let user = await models.Users.scope('view_same_user').findByPk(id, { raw: true })

      if (!user) throw new CustomError('Not found user', 404, 'Not Found')
      await user.destroy({ transaction })
      await transaction.commit()
      return user
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async setTokenUser(id, token) {
    const transaction = await models.sequelize.transaction()
    try {
      let user = await models.Users.findByPk(id)
      if (!user) throw new CustomError('Not found user', 404, 'Not Found')
      let updatedUser = await user.update({ token }, { transaction })
      await transaction.commit()
      return updatedUser
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeTokenUser(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let user = await models.Users.findByPk(id)
      if (!user) throw new CustomError('Not found user', 404, 'Not Found')
      await user.update({ token: null }, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async verifiedTokenUser(id, token, exp) {
    const transaction = await models.sequelize.transaction()
    try {

      if (!id) throw new CustomError('Not ID provided', 400, 'Bad Request')
      if (!token) throw new CustomError('Not token provided', 400, 'Bad Request')
      if (!exp) throw new CustomError('Not exp exist', 400, 'Bad Request')


      let user = await models.Users.findOne({
        where: {
          id,
          token
        }
      })
      if (!user) throw new CustomError('The user associated with the token was not found', 400, 'Invalid Token')
      if (Date.now() > exp * 1000) throw new CustomError('The token has expired, the 15min limit has been exceeded', 403, 'Forbbiden')
      await user.update({ token: null }, { transaction })
      await transaction.commit()
      return user
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async updatePassword(id, newPassword) {
    const transaction = await models.sequelize.transaction()
    try {
      if (!id) throw new CustomError('Not ID provided', 400, 'Bad Request')
      let user = await models.Users.findByPk(id)
      if (!user) throw new CustomError('Not found user', 404, 'Not Found')
      let restoreUser = await user.update({ password: hashPassword(newPassword) }, { transaction })
      await transaction.commit()
      return restoreUser
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async addInterestUser(user_id, tag_id) {
    const transaction = await models.sequelize.transaction();
    try {
      const tag = await models.Tags.findByPk(tag_id);
      if (!tag) throw new CustomError('Not valid interest', 404, 'Not Found');
      const userTags = await models.Users_tags.findOne({ where: { user_id, tag_id } });
      if (userTags) throw new CustomError('Interest already exists', 400, 'Bad Request');
      await models.Users_tags.create({ tag_id, user_id }, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async removeInterestUser(user_id, tag_id) {
    const transaction = await models.sequelize.transaction();
    try {
      const tag = await models.Tags.findByPk(tag_id);
      if (!tag) throw new CustomError('Not valid interest', 404, 'Not Found');
      const userTags = await models.Users_tags.findOne({ where: { user_id, tag_id } });
      if (!userTags) throw new CustomError('Not found interest', 400, 'Bad Request');
      const deleteTag = await models.Users_tags.destroy({ where: { tag_id, user_id } }, { transaction });
      await transaction.commit();
      return deleteTag;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }



}


module.exports = UsersService