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
  const allUsers = await User.findAll();
  const removePasswordField = allUsers.map((user) => (
    {
      id: user.id,
      displayName: user.displayName,
      email: user.email,
      image: user.image,
    }
  ));
  return removePasswordField;
}

module.exports = {
  findUserByEmail,
  addNewUser,
  getAll,
};  