'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publications_tags extends Model {
    static associate(models) {
      Publications_tags.belongsTo(models.Tags,{as:'tags',foreignKey:tag_id})
      Publications_tags.belongsTo(models.Publications,{as:'publications',foreignKey:tag_id})
    }
  }
  Publications_tags.init({
    tag_id: {
      allowNull: false,
      type: DataTypes.BIGINT
    },
    publication_id: {
      allowNull: false,
      type: DataTypes.UUID
    },
  }, {
    sequelize,
    modelName: 'Publications_tags',
  });
  return Publications_tags;
};