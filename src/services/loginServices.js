const { User } = require('../database/models');

async function findUserByEmailAndPassword({ email, password }) {
  const result = await User.findOne({ where: { email, password } });
  return result;
}

module.exports = { findUserByEmailAndPassword };  