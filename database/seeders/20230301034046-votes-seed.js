'use strict';

const uuid = require('uuid')
const UsersServices = require('../../services/users.service')
const models = require('../models')

const usersService = new UsersServices()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    
    const pub1 = await models.Publications.findOne({where: {title: 'El Deporte del siglo'}})
    const pub2 = await models.Publications.findOne({where: {title: 'Conciertos en Viena'}})
    const pub3 = await models.Publications.findOne({where: {title: 'Gran barata'}})
    const pub4 = await models.Publications.findOne({where: {title: 'abrigos'}})

    const votesTagsSeed = [
      {
        user_id: pub1.user_id,
        publications_id: pub1.id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: pub2.user_id,
        publications_id: pub2.id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: pub3.user_id,
        publications_id: pub3.id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: pub4.user_id,
        publications_id: pub4.id,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]

    try {
      await queryInterface.bulkInsert('votes', votesTagsSeed)
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    const pub1 = await models.Publications.findOne({where: {title: 'El Deporte del siglo'}})
    const pub2 = await models.Publications.findOne({where: {title: 'Conciertos en Viena'}})
    const pub3 = await models.Publications.findOne({where: {title: 'Gran barata'}})
    const pub4 = await models.Publications.findOne({where: {title: 'abrigos'}})
    const dataToDelete = [pub1.publications_id, pub2.publications_id, pub3.publications_id, pub4.publications_id]

    try {
      await queryInterface.bulkDelete('votes', { 
        publications_id: dataToDelete 
      }, { transaction});

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
};
