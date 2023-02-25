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

    
    const publicationsSeed = [
      {
        id: uuid.v4(),
        title: 'publicacion 1',
        description: 'descripcion 1',
        content: 'content 1',
        cities_id: 1,
        user_id: user1.id,
        publications_types_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuid.v4(),
        title: 'publicacion 2',
        description: 'descripcion 2',
        content: 'content 2',
        cities_id: 1,
        user_id: user1.id,
        publications_types_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuid.v4(),
        title: 'publicacion 3',
        description: 'descripcion 3',
        content: 'content 3',
        cities_id: 1,
        user_id: user1.id,
        publications_types_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuid.v4(),
        title: 'publicacion 4',
        description: 'descripcion 4',
        content: 'content 4',
        cities_id: 4,
        user_id: user2.id,
        publications_types_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuid.v4(),
        title: 'publicacion 5',
        description: 'descripcion 5',
        content: 'content 5',
        cities_id: 4,
        user_id: user2.id,
        publications_types_id: 4,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuid.v4(),
        title: 'publicacion 6',
        description: 'descripcion 6',
        content: 'content 6',
        cities_id: 4,
        user_id: user2.id,
        publications_types_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
    ]

    try {
      await queryInterface.bulkInsert('publications', publicationsSeed)
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    const user1 = await usersService.findUserByEmailOr404('laupadron1458@academlo.com')
    const user2 = await usersService.findUserByEmailOr404('chisa@peek.com')
    const dataToDelete = [user1.id, user2.id]

    try {
      await queryInterface.bulkDelete('publications', { 
        user_id: dataToDelete 
      }, { transaction});

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
};
