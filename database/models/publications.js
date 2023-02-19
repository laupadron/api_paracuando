'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publications extends Model {
    static associate(models) {
      Publications.belongsTo(models.Profiles, { as: 'profile', foreignKey: 'profiles_id' })
      Publications.belongsTo(models.Cities, { as: 'city', foreignKey: 'cities_id' })
      Publications.belongsTo(models.Publications_types, { as: 'publication_type', foreignKey: 'publications_types_id' })
      Publications.hasMany(models.Votes, { as: 'votes', foreignKey: 'publications_id' })
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
    picture: DataTypes.STRING,
    image_url: DataTypes.STRING,
    cities_id: DataTypes.BIGINT,
    profiles_id: DataTypes.BIGINT,
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