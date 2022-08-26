'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const CategoriesTable = queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },      
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },      
    });
    return CategoriesTable;
  },

  down: queryInterface => queryInterface.dropTable('Categories'),
};
