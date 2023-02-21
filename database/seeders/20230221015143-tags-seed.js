'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    const tagsSeed = [
      {
        id: '1',
        name: 'foodie',
        description: 'Para publicaciones relacionadas con comida, recetas, restaurantes, etc.',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '2',
        name: 'travel',
        description: 'Para publicaciones relacionadas con viajes, turismo, lugares turísticos, etc.',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '3',
        name: 'fitness',
        description: 'Para publicaciones relacionadas con ejercicio, deporte, vida saludable, etc.',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '4',
        name: 'fashion',
        description: 'Para publicaciones relacionadas con moda, ropa, accesorios, etc.',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: '5',
        name: 'throwback',
        description: 'Para publicaciones de recuerdos, momentos del pasado, nostalgia, etc.',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]

    try {
      await queryInterface.bulkInsert('tags', tagsSeed)

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
      await queryInterface.bulkDelete('tags', { 
        id: dataToDelete 
      }, { transaction});

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
};
