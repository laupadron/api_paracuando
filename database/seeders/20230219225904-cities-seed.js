'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    const citiesSeeds = [
      {
        name: 'Zarumilla',
        state_id: '1',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Sullana',
        state_id: '2',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Trujillo',
        state_id: '3',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'San Miguel',
        state_id: '4',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Pariñas',
        state_id: '2',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]

    try {
      await queryInterface.bulkInsert('cities', citiesSeeds)

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
      await queryInterface.bulkDelete('cities', { 
        id: dataToDelete 
      }, { transaction});

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
};