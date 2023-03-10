'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    static associate(models) {
      Tags.hasMany(models.Publications_tags,{as:'publications_tags',foreignKey:'tag_id'})
      Tags.hasMany(models.Users_tags,{as:'users_tags',foreignKey:'tag_id'})
    }
  }
  Tags.init({
    id: {
      type:DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
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
      type: DataTypes.TEXT
    },
  }, {
    sequelize,
    modelName: 'Tags',
    tableName: 'tags',
    underscored: true,
    timestamps: true,
    scopes: {
      no_timestamps: { attributes: { exclude: ['created_at', 'updated_at'] } },
      view_public: {attributes: ['id', 'name']},
    }
  });
  return Tags;
};