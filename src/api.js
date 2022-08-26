const express = require('express');
require('express-async-errors');

const login = require('./controllers/loginController');
// ...

const app = express();

app.use(express.json());

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const { code, message } = await login.login({ email, password });
  return res.status(code).json(message);
});

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
