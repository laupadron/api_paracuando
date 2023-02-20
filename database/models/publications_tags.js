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
    tag_id: DataTypes.BIGINT,
    
    publication_id:  DataTypes.UUID
    
  }, {
    sequelize,
    modelName: 'Publications_tags',
    tableName: 'publications_tags',
    underscored: true,
    timestamps: true,
  });
  return Publications_tags;
};