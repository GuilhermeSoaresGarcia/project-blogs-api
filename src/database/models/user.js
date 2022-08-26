'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER
    },
    displayName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    }
  })

  User.associate = (models) => {
    User.hasMany(models.BlogPost,
      { foreignKey: 'id', as: 'userId' });
    };

  return User;
};
