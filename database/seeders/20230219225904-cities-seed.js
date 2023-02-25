'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    const citiesSeeds = [
      {
        id: '1',
        name: 'Zarumilla',
        state_id: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        name: 'Sullana',
        state_id: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        name: 'Trujillo',
        state_id: '3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '4',
        name: 'San Miguel',
        state_id: '4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '5',
        name: 'Pariñas',
        state_id: '2',
        createdAt: new Date(),
        updatedAt: new Date()
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