'use strict';

module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER
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
  })
  
  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User,
      { foreignKey: 'userId', as: 'id' });
    };
  
    return BlogPost;
};
