'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    const tagsSeed = [
      {
        name: 'Ropa y Accesorios',
        description: 'productos relacionados con la moda y el estilo personal',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Deportes',
        description: 'actividades físicas competitivas o recreativas',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Conciertos',
        description: 'eventos musicales en vivo',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Meet and Greet',
        description: 'Eventos para fans, tienen la oportunidad de conocer y saludar a sus artistas, celebridades o personajes públicos favoritos en persona',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'E-Sport',
        description: 'deportes electrónicos',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Pop/Rock',
        description: 'música popular que combina elementos de pop y rock',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Tecnologia',
        description: 'abarca una amplia variedad de campos, desde la informática y la electrónica hasta la inteligencia artificial, la robótica y la biotecnología',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Hogar y Decoracion',
        description: 'desde ideas de diseño y tendencias de decoración hasta consejos sobre cómo organizar y limpiar el hogar.',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Abastecimiento',
        description: 'todo lo relacionado con la gestión de la cadena de suministro de una empresa o negocio',
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
