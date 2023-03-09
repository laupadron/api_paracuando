'use strict';
// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try{
      await queryInterface.createTable('publications_images',{
      
      
      publication_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'publications',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      image_url: {
        type: Sequelize.UUID,
        primaryKey: true,
        
        allowNull: false
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        validate: {
          min: 1,
          max: 3
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, { transaction })
    await transaction.commit()
  } catch (error) {
    await transaction.rollback()
    throw error
  }
},
down: async (queryInterface, /*Sequelize*/) => {
  const transaction = await queryInterface.sequelize.transaction()
  try {
    await queryInterface.dropTable('publications_images', { transaction })
    await transaction.commit()
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
}