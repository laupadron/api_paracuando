'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publications extends Model {
    static associate(models) {
      Publications.belongsTo(models.Users, { as: 'users', foreignKey: 'user_id' })
      Publications.belongsTo(models.Cities, { as: 'cities', foreignKey: 'cities_id' })
      Publications.belongsTo(models.Publications_types, { as: 'publications_types', foreignKey: 'publications_types_id' })
      Publications.hasMany(models.Publications_images, { as: 'publications_images', foreignKey: 'publication_id' })
      Publications.belongsToMany(models.Users,{through:'votes',as:'votes', foreignKey:'publication_id'})
      Publications.belongsToMany(models.Tagns,{through:'publications_tags',as:'publications_tags',foreignKey:'publication_id'})
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