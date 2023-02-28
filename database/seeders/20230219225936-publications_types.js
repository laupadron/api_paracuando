'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    const pubsTypesSeeds = [
      {
        name: 'Historias',
        description: 'Publicacion de historias en tu feed',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Memes',
        description: 'Compartir algunos memes divertidos con tu comunidad',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Reels',
        description: 'Videos cortos para compartir momentos',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Noticias',
        description: 'Relatos sobre algun hecho importante',
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


