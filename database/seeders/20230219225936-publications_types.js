'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    const pubsTypesSeeds = [
      {
        name: 'Marcas y Tiendas',
        description: 'empresas y tiendas que ofrecen productos y servicios de una amplia variedad de marcas reconocidas en el mercado',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Artistas y Conciertos',
        description: 'industria del entretenimiento en general',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Torneos',
        description: 'Eventos competitivos',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]

    try {
      await queryInterface.bulkInsert('publications_types', pubsTypesSeeds)

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    const dataToDelete = [1,2,3,4]

    try {
      await queryInterface.bulkDelete('publications_types', { 
        id: dataToDelete 
      }, { transaction});

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
};


