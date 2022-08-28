const token = require('../middleware/token');
const userService = require('../services/userServices');

// MENSAGENS DAS VALIDAÇÔES
const validNameLength = '"displayName" length must be at least 8 characters long';
const validEmailFormat = '"email" must be a valid email';
const validPasswordLength = '"password" length must be at least 6 characters long';
const validUser = 'User already registered';

async function newUser({ displayName, email, password, image }) {
  if (displayName.length < 8) return { code: 400, message: { message: validNameLength } };

  const regex = /^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/i;
  if (!(email.match(regex))) return { code: 400, message: { message: validEmailFormat } };

  if (password.length < 6) return { code: 400, message: { message: validPasswordLength } };

  const verifyUserExistence = await userService.findUserByEmail({ email });
  if (verifyUserExistence != null) return { code: 409, message: { message: validUser } };

  const createdUser = await userService.addNewUser({ displayName, email, password, image });
  const result = await token.generateToken(
    {
      email: createdUser.email,
    },
  );
  return { code: 201, message: { token: result } };
}

async function getAll(authorization) {
  try {
    await token.verifyJWT(authorization);
    const result = await userService.getAll();
    return { code: 200, message: result };
  } catch (err) {    
    if (err.message === 'jwt malformed') {
      return { code: 401, message: { message: 'Expired or invalid token' } };
    }
    if (err.message === 'jwt must be provided') {
      return { code: 401, message: { message: 'Token not found' } };
    }
  }
}

module.exports = { newUser, getAll };