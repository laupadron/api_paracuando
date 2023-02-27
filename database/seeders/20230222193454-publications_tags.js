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

    const publicationsTagsSeed = [
      {
        tag_id: 1,
        publication_id: pub1.id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        tag_id: 1,
        publication_id: pub2.id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        tag_id: 2,
        publication_id: pub3.id,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        tag_id: 2,
        publication_id: pub4.id,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]

    try {
      await queryInterface.bulkInsert('publications_tags', publicationsTagsSeed)
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    const dataToDelete = [1, 2,3,4]

    try {
      await queryInterface.bulkDelete('publications_tags', { 
        tag_id: dataToDelete 
      }, { transaction});

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
};
