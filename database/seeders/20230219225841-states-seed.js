'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    const statesSeeds = [
      {
        id: '1',
        name: 'Tumbes',
        country_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '2',
        name: 'Piura',
        country_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '3',
        name: 'La Libertad',
        country_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '4',
        name: 'Lima',
        country_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '5',
        name: 'Cajamarca',
        country_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]

    try {
      await queryInterface.bulkInsert('states', statesSeeds)

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    const dataToDelete = [1,2,3,4,5]

    try {
      await queryInterface.bulkDelete('states', { 
        id: dataToDelete 
      }, { transaction});

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
};

