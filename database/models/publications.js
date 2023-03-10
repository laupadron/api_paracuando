'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publications extends Model {
    static associate(models) {
      Publications.belongsTo(models.Users, { as: 'user', foreignKey: 'user_id' })
      Publications.belongsTo(models.Cities, { as: 'city', foreignKey: 'cities_id' })
      Publications.belongsTo(models.Publications_types, { as: 'publications_type', foreignKey: 'publications_types_id' })
      Publications.hasMany(models.Publications_images, { as: 'publications_images', foreignKey: 'publication_id' })
      Publications.hasMany(models.Votes, { as: 'votes', foreignKey: 'publications_id' })
      Publications.hasMany(models.Publications_tags, { as: 'publication_tags', foreignKey: 'publication_id' })
    }
  }
  Publications.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    content: DataTypes.STRING,
    reference_link:DataTypes.STRING,
    cities_id: DataTypes.BIGINT,
    user_id: DataTypes.UUID,
    publications_types_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Publications',
    tableName: 'publications',
    underscored: true,
    timestamps: true,
    scopes: {
      no_timestamps: { attributes: { exclude: ['created_at', 'updated_at'] } }
    }
  });
  return Publications;
};