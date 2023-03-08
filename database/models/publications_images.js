'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publications_images extends Model {
    static associate(models) {
      Publications_images.belongsTo(models.Publications,{as:'publications',foreignKey:'publication_id'})
    }
  }
  Publications_images.init({
    
    publication_id: {
      type: DataTypes.UUID,
      primaryKey:true
    },
    image_url: {
    type:DataTypes.UUID,
    primaryKey:true
    },
    order: {
      allowNull: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      validate: {
        min: 1,
        max: 3
      }
    },
  }, {
    sequelize,
    modelName: 'Publications_images',
    tableName: 'publications_images',
    underscored: true,
    timestamps: true,
  });
  return Publications_images;
};