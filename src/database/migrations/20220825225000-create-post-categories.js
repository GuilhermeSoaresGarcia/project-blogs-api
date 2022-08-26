'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const PostCategoriesTable = queryInterface.createTable('PostCategories', {
      postId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        onUpdate: 'cascade',
        onDelete: 'cascade',
        references: {
          model: 'BlogPosts',
          key: 'id'
        },
      },      
      categoryId: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        onUpdate: 'cascade',
        onDelete: 'cascade',
        references: {
          model: 'Categories',
          key: 'id'
        },
      },      
    });
    return PostCategoriesTable;
  },
  down: queryInterface => queryInterface.dropTable('PostCategories'),
};
