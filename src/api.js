const express = require('express');
require('express-async-errors');

const login = require('./controllers/loginController');
const user = require('./controllers/userController');
// ...

const app = express();

app.use(express.json());

// ROTA LOGIN
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const { code, message } = await login.login({ email, password });
  return res.status(code).json(message);
});

// ROTA USER
app.post('/user', async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { code, message } = await user.newUser({ displayName, email, password, image });
  return res.status(code).json(message);
});

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
