const token = require('../middleware/token');
const loginService = require('../services/loginServices');

async function login({ email, password }) {
  if (!email || !password) {
    return { code: 400, message: { message: 'Some required fields are missing' } };
  }

  const verifyUserExistence = await loginService.findUserByEmailAndPassword({ email, password });
  if (verifyUserExistence === null) {
    return { code: 400, message: { message: 'Invalid fields' } };
  }

  const result = await token.generateToken({ email, password });
  return { code: 200, message: { token: result } };
}

module.exports = { login };