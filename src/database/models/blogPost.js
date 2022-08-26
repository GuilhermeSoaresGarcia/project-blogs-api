'use strict';

module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.INTEGER
    },
    published: {
      type: DataTypes.DATE
    },
    updated: {
      type: DataTypes.DATE
    },
  },
    { timestamps: false })

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user_id' });
  };

  return BlogPost;
};
