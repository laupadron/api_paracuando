'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    static associate(models) {
      Tags.hasMany(models.Publications_tags,{as:'publications_tags',foreignKey:'tag_id'})
      Tags.belongsToMany(models.Tags,{throw: 'Users_tags',as:'tags',foreignKey:'tag_id'})
    }
  }
  Tags.init({
    id: {
      type:DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING
    },
    image_url: {
      allowNull: true,
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Tags',
    tableName: 'tags',
    underscored: true,
    timestamps: true,
  });
  return Tags;
};