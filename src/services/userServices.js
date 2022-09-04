const { User, sequelize } = require('../database/models');

async function findUserByEmail({ email }) {
  const result = await User.findOne({ where: { email } });
  return result;
}

async function addNewUser({ displayName, email, password, image }) {
  const result = await User.create({ displayName, email, password, image });
  return result.dataValues;
}

async function getAll() {
  const allUsers = await User.findAll({ attributes: { exclude: 'password' } });
  return allUsers;
}

async function getOne(id) {
  const oneUser = await User.findByPk(id, { attributes: { exclude: 'password' } }); // Exclusão do campo 'password'. FONTE: https://stackoverflow.com/a/58769473
  return oneUser;
}

async function deleteMe(id) {
  const userToDelete = await getOne(id);
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0'); // Isso desativa a verificação de constraints das chaves estrangeiras para poder excluir o usuário sem a necessidade de excluir os posts primeiro. FONTE: https://stackoverflow.com/a/34619180/18172843
  await userToDelete.destroy();
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 1'); // Reativa a verificação de constraints das chaves estrangeiras.
}

module.exports = {
  findUserByEmail,
  addNewUser,
  getAll,
  getOne,
  deleteMe,
};  