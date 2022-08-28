const jwt = require('jsonwebtoken');

require('dotenv').config();

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

async function generateToken({ email }) {
  const token = jwt.sign({ email }, secret, jwtConfig);
  return token;
}

module.exports = { generateToken };
