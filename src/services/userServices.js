const { User } = require('../database/models');

async function findUserByEmail({ email }) {
  const result = await User.findOne({ where: { email } });
  return result;
}

async function addNewUser({ displayName, email, password, image }) {
  const result = await User.create({ displayName, email, password, image });  
  return result.dataValues;
}

module.exports = {
  findUserByEmail,
  addNewUser,
};  