'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const BlogPostsTable = queryInterface.createTable('BlogPosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },      
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },      
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },      
      userId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'Users',
          key: 'id'
        },        
      },      
      published: {
        type: Sequelize.DATE,
      },      
      updated: {
        type: Sequelize.DATE,
      },      
    });
    return BlogPostsTable;
  },
  down: queryInterface => queryInterface.dropTable('BlogPosts'),
};
