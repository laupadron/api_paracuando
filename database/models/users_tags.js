'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users_tags extends Model {
    static associate(models) {
    Users_tags.belongsTo(models.Tags,{as:'tags',foreignKey:'tag_id'})
    Users_tags.belongsTo(models.Users,{as:'users',foreignKey:'user_id'})
    }
  }
  users_tags.init({
    tag_id:{
      allowNull: true,
      type: DataTypes.BIGINT
    },
    user_id: {
      allowNull: true,
      type: DataTypes.UUID
    },
  }, {
    sequelize,
    modelName: 'Users_tags',
  });
  return Users_tags;
};