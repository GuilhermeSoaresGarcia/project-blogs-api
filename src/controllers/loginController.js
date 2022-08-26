const token = require('../middleware/token');

async function login({ email, password }) {
  if (!email || !password) {
    return { code: 400, message: { message: 'Some required fields are missing' } };
  }

  // if (emailinexistente || passwordErrado) {
  //   return { code: 400, message: { message: 'Invalid fields' } };
  // }

  const result = await token.generateToken({ email, password });
  return { code: 200, message: { token: result } };
}

module.exports = { login };