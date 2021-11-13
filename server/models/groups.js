'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class groups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association heregroups.associate = (models) => {
        // this.belongsToMany(models.User, { through: 'UserFavorite' }); 
    this.belongsToMany(models.User, {
      foreignKey: 'groupId', 
      through: 'users_groups',
      as: 'User' 
    });
  }
  };
  groups.init({
    groupName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'groups',
  });
  return groups;
};