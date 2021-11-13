'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Favorite, { through: 'UserFavorite' }); 
      this.belongsToMany(models.groups, { 
        foreignKey: 'userId', 
        through: 'users_groups', 
        as: 'groups' 
      });
    }
  };
  User.init({
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};