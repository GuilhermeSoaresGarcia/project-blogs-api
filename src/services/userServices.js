const { User } = require('../database/models');

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

module.exports = {
  findUserByEmail,
  addNewUser,
  getAll,
  getOne,
};  