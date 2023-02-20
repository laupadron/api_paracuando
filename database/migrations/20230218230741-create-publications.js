'use strict';
// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize)=> {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('publications', {
        id: {
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          type: Sequelize.UUID
        },
        title: {
          allowNull: false,
          type: Sequelize.STRING
        },
        description: {
          type: Sequelize.STRING
        },
        content: {
          allowNull: false,
          type: Sequelize.STRING
        },
       cities_id: {
          allowNull: false,
          type: Sequelize.BIGINT,
          references: {
            model: 'cities',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        user_id: {
          allowNull: false,
          type: Sequelize.UUID,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        publications_types_id: {
          allowNull: false,
          type: Sequelize.BIGINT,
          references: {
            model: 'publications_types',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
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
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropTable('publications');
      await transaction.commit()
      
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
};

