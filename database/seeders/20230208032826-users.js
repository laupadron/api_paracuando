'use strict'
const uuid = require('uuid')
const { Op } = require('sequelize')
const { hashPassword } = require('../../libs/bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    const usersSeeds = [
      {
        id: uuid.v4(),
        first_name: 'Lauther',
        last_name: 'Valladares',
        email: 'lauther@gmail.com',
        username: 'lauther@gmail.com',
        password: hashPassword('1234'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid.v4(),
        first_name: 'Laura',
        last_name: 'Padrón',
        email: 'laupadron1458@academlo.com',
        username: 'laupadron1458@academlo.com',
        password: hashPassword('1458'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid.v4(),
        first_name: 'Carlos',
        last_name: 'Carlin',
        email: 'carlos@academlo.com',
        username: 'carlos@academlo.com',
        password: hashPassword('1458'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid.v4(),
        first_name: 'Chisa',
        last_name: 'Boo',
        email: 'chisa@peek.com',
        username: 'chisa@peek.com',
        password: hashPassword('1234'),
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]

    try {
      await queryInterface.bulkInsert('users', usersSeeds, { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    const userNames = [
      'lauther@gmail.com', 'laupadron1458@academlo.com', 'carlos@academlo.com', 'chisa@peek.com'
    ]

    try {
      await queryInterface.bulkDelete(
        'users',
        {
          username: {
            [Op.or]: userNames,
          },
        },
        { transaction }
      )

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
