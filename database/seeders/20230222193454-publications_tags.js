'use strict';

const uuid = require('uuid')
const UsersServices = require('../../services/users.service')

const usersService = new UsersServices()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    const user1 = await usersService.findUserByEmailOr404('laupadron1458@academlo.com')
    const user2 = await usersService.findUserByEmailOr404('chisa@peek.com')
    

    const publicationsTagsSeed = [
      {
        tag_id: 1,
        publication_id: 'ca360fde-a826-4f51-b240-da5d5c513c7b',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        tag_id: 1,
        publication_id: 'c96fbf1b-6328-41d2-87b7-de2912eedd87',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        tag_id: 2,
        publication_id: 'c9a23322-33be-4724-8b74-949c0bac1ccf',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        tag_id: 2,
        publication_id: '70d62a38-8f7c-4d81-b137-8f555a026e88',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        tag_id: 3,
        publication_id: 'c3d8882a-bb7d-4a83-95bf-7d0b06336de4',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        tag_id: 4,
        publication_id: '4230e2b0-eb65-4a01-a861-d059fa1af2b9',
        created_at: new Date(),
        updated_at: new Date()
      },
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
