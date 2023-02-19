'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Votes extends Model {
    static associate(models) {
      Votes.belongsTo(models.Profiles, { as: 'profile', foreignKey: 'profiles_id' })
      Votes.belongsTo(models.Publications, { as: 'publication', foreignKey: 'publications_id' })
    }
  }
  Votes.init({
    profiles_id: DataTypes.BIGINT,
    publications_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Votes',
    tableName: 'votes',
    underscored: true,
    timestamps: true,
    scopes: {
      no_timestamps: { attributes: { exclude: ['created_at', 'updated_at'] } }
    }
  });
  return Votes;
};