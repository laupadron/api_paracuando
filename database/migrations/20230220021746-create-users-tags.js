'use strict';
// /** @type {import('sequelize-cli').Migration} */
module.exports = {
 up:  async (queryInterface, Sequelize) =>{
    const transaction = await queryInterface.sequelize.transaction()
    try{
      await queryInterface.createTable('users_tags',{
      
      tag_id: {
        type: Sequelize.BIGINT,
        allowNull:false,
        foreignKey: true,
        references: {
          model: 'tags',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull:false,
        foreignKey: true,
        references: {
          model: 'users',
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
down: async (queryInterface, /*Sequelize*/) => {
  const transaction = await queryInterface.sequelize.transaction()
  try {
    await queryInterface.dropTable('users_tags', { transaction })
    await transaction.commit()
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
}