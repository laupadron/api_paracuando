'use strict'
const { Op } = require('sequelize')
const rolesServices = require('../../services/roles.service')
const usersServices = require('../../services/users.service')

const rolesService = new rolesServices()
const usersService = new usersServices()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()    
    try {
      const adminUser = await usersService.findUserByEmailOr404('lauther@gmail.com')
      const adminUser2 = await usersService.findUserByEmailOr404('laupadron1458@academlo.com')
      const publicUser = await usersService.findUserByEmailOr404('carlos@academlo.com')
      const publicUser2 = await usersService.findUserByEmailOr404('chisa@peek.com')

      const adminRole = await rolesService.findRoleByName('admin')
      const publicRole = await rolesService.findRoleByName('public')
      const profiles = [
        {
          user_id: adminUser.id,
          role_id: adminRole.id,
          created_at: new Date(),
          updated_at: new Date(),
        } ,
        {
          user_id: adminUser2.id,
          role_id: adminRole.id,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: publicUser.id,
          role_id: publicRole.id,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: publicUser2.id,
          role_id: publicRole.id,
          created_at: new Date(),
          updated_at: new Date(),
        }
      ]
      
      await queryInterface.bulkInsert('profiles', profiles , {transaction})
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      const adminUser = await usersService.findUserByEmailOr404('lauther@gmail.com')
      const adminUser2 = await usersService.findUserByEmailOr404('laupadron1458@academlo.com')
      const publicUser = await usersService.findUserByEmailOr404('carlos@academlo.com')
      const publicUser2 = await usersService.findUserByEmailOr404('chisa@peek.com')
      
      const adminRole = await rolesService.findRoleByName('admin')
      const publicRole = await rolesService.findRoleByName('public')
      
      await queryInterface.bulkDelete('profiles', {
        user_id: {
          [Op.and]: [adminUser.id]
        },
        role_id:{
          [Op.and]:[adminRole.id]
        }
      }, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
