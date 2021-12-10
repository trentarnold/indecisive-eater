'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavoriteRestaurants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, {
        foreignKey: 'favRestaurantId', 
        through: 'UserFavoriteRestaurant',
        as: 'User' 
      });
    }
  };
  FavoriteRestaurants.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FavoriteRestaurants',
  });
  return FavoriteRestaurants;
};