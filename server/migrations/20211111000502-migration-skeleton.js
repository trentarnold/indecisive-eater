'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Favorites',
      'updatedAt',
      {
        allowNull: false,
        type: Sequelize.DATE
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Favorites',
      'updatedAt'
    );
  }
};
