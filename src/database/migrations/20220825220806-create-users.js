'use strict';

//FONTE: https://medium.com/@stroklabs/migrations-e-seeders-no-sequelizejs-67ba3571ed0e
// Como essas migrations são basicamente só boilerplate, fiz aquele comando pra criar o arquivo de migrations 
// e depois me guiei por esse artigo, mudando basicamente só os nomes das colunas e as tipagens conforme necessidade

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const UsersTable = queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },      
      displayName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
      },
    });
    return UsersTable;
  },

  down: queryInterface => queryInterface.dropTable('Users'),
};
