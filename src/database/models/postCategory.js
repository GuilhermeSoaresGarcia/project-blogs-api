'use strict';

module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,      
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,      
    },
  },
    { timestamps: false });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, { through: PostCategory });
    models.Category.belongsToMany(models.BlogPost, { through: PostCategory });
  }
  return PostCategory;
};
