'use strict';
// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) =>{
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.createTable('votes', {
        user_id: {
          allowNull: false,
          type: Sequelize.UUID,
          primaryKey: true,
          foreignKey: true,
          references: {
            model: 'users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        publications_id: {
          allowNull: false,
          type: Sequelize.UUID,
          primaryKey: true,
          foreignKey: true,
          references: {
            model: 'publications',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
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
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.dropTable('votes');
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
};
