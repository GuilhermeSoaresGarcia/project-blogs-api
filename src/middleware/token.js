const jwt = require('jsonwebtoken');
const userService = require('../services/userServices');

require('dotenv').config();

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

async function generateToken({ email }) {
  const { id } = await userService.findUserByEmail({ email });
  const token = jwt.sign({ id, email }, secret, jwtConfig);
  return token;
}

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const user = jwt.verify(token, secret);
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { generateToken, validateToken };
