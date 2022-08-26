const { User } = require('../database/models');

async function findUserByEmail({ email, password }) {
  const result = await User.findOne({ where: { email, password } });
  return result;
}

module.exports = { findUserByEmail };  