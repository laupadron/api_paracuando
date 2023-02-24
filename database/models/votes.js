'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Votes extends Model {
    static associate(models) {
      Votes.belongsTo(models.Users, { as: 'users', foreignKey: 'user_id' })
      Votes.belongsTo(models.Publications, { as: 'publications', foreignKey: 'publications_id' })
    }
  }
  Votes.init({
    user_id: DataTypes.UUID,
    publications_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Votes',
    tableName: 'votes',
    underscored: true,
    timestamps: true,
    scopes: {
      no_timestamps: { attributes: { exclude: ['created_at', 'updated_at'] } },
      allvotes: {attributes: { exclude: ['id'] } }
    }
  });
  return Votes;
};