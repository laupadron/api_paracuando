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
    publication_id:{
      type: DataTypes.UUID,
      allowNull:false
    },
    image_url: {
      allowNull: true,
      type: DataTypes.STRING
    },
    order: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'publications_images',
  });
  return Publications_images;
};