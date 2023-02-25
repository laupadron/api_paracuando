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
    publication_id: DataTypes.UUID,
     
    image_url: 
    DataTypes.STRING,
    order: {
      allowNull: true,
      type: DataTypes.INTEGER
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