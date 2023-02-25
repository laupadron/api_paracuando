'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    const pubsTypesSeeds = [
      {
        id: '1',
        name: 'Historias',
        description: 'Publicacion de historias en tu feed',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        name: 'Memes',
        description: 'Compartir algunos memes divertidos con tu comunidad',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        name: 'Reels',
        description: 'Videos cortos para compartir momentos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '4',
        name: 'Noticias',
        description: 'Relatos sobre algun hecho importante',
        createdAt: new Date(),
        updatedAt: new Date()
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


