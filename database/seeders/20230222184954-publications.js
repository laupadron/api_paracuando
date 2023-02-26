'use strict';


/** @type {import('sequelize-cli').Migration} */
const uuid = require('uuid')
const { Op } = require('sequelize')
const { hashPassword } = require('../../libs/bcrypt')
const rolesServices = require('../../services/roles.service')
const usersServices = require('../../services/users.service')

const rolesService = new rolesServices()
const usersService = new usersServices()

module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      const adminUser = await usersService.findUserByEmailOr404('lauthervalladares@academlo.com')
      const adminUser2 = await usersService.findUserByEmailOr404('laupadron1458@academlo.com')
      const publicUser = await usersService.findUserByEmailOr404('carlos@academlo.com')
      const adminRole = await rolesService.findRoleByName('admin')
      const publicRole = await rolesService.findRoleByName('public')
      
    const publicationsSeeds =[
      {
        id: uuid.v4(),
        title:"El Deporte del siglo",
        description:"todo sobreel fútbol",
        content:"fulbol europeo",
        cities_id:1,
        user_id:adminUser.id,
        publications_types_id:2,
        created_at: new Date(),
          updated_at: new Date(),
      },
      {
        id: uuid.v4(),
        title:"Conciertos en Viena",
        description:"música clásica",
        content:"agenda de conciertos en viena",
        cities_id:2,
        user_id:adminUser.id,
        publications_types_id:4,
        created_at: new Date(),
          updated_at: new Date(),
      },
      {
        id: uuid.v4(),
        title:"Gran barata",
        description:"liquidación al costo",
        content:"ropa y accesorios",
        cities_id:4,
        user_id: publicUser.id,
        publications_types_id:2,
        created_at: new Date(),
          updated_at: new Date(),
      },
      {
        id: uuid.v4(),
        title:"abrigos",
        description:"abrigos de temporada",
        content:"ropa y accesorios",
        cities_id:5,
        user_id: publicUser.id,
        publications_types_id:3,
        created_at: new Date(),
          updated_at: new Date(),
      },
    ]
    await queryInterface.bulkInsert('publications', publicationsSeeds , {transaction})
    await transaction.commit()
  } catch (error) {
    await transaction.rollback()
    throw error
  }
},

async down (queryInterface, Sequelize) {
  const transaction = await queryInterface.sequelize.transaction()

  try {
    const adminUser = await usersService.findUserByEmailOr404('example@academlo.com')
    const adminRole = await rolesService.findRoleByName('admin')
    
    await queryInterface.bulkDelete('publications', {
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


