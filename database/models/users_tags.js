'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users_tags extends Model {
    static associate(models) {
    Users_tags.belongsTo(models.Tags,{as:'tags',foreignKey:'tag_id'})
    Users_tags.belongsTo(models.Users,{as:'interests',foreignKey:'user_id'})
    }
  }
  Users_tags.init({
    tag_id:{
      type: DataTypes.BIGINT,
      primaryKey: true},
  
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true}
    
  }, {
    sequelize,
    modelName: 'Users_tags',
    tableName: 'users_tags',
    underscored: true,
    timestamps: true,
    scopes: {
      no_timestamps: { attributes: { exclude: ['created_at', 'updated_at'] } }
    }
  });
  return Users_tags;
};