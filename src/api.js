const express = require('express');
require('express-async-errors');

const login = require('./controllers/loginController');
const user = require('./controllers/userController');
const category = require('./controllers/categoryController');
const post = require('./controllers/postController');
const token = require('./middleware/token');

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

app.get('/user', token.validateToken, async (_req, res) => {
  const { code, message } = await user.getAll();
  return res.status(code).json(message);
});

app.get('/user/:id', token.validateToken, async (req, res) => {
  const { id } = req.params;
  const { code, message } = await user.getOne(id);
  return res.status(code).json(message);
});

app.delete('/user/me', token.validateToken, async (req, res) => {
  const { id } = req.user;
  const { code, message } = await user.deleteMe(id);
  return res.status(code).json(message);
});

// ROTA CATEGORIES
app.post('/categories', token.validateToken, async (req, res) => {
  const { name } = req.body;
  const { code, message } = await category.newCategory(name);
  return res.status(code).json(message);
});

app.get('/categories', token.validateToken, async (_req, res) => {
  const { code, message } = await category.getAll();
  return res.status(code).json(message);
});

// ROTA POST
app.post('/post', token.validateToken, async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { email } = req.user;
  const { code, message } = await post.newPost(email, title, content, categoryIds);
  return res.status(code).json(message);
});

app.get('/post', token.validateToken, async (_req, res) => {
  const { code, message } = await post.getAll();
  return res.status(code).json(message);
});

app.get('/post/search/', token.validateToken, async (req, res) => {
  const { q } = req.query;
  const { code, message } = await post.searchPost(q);
  return res.status(code).json(message);
});

app.get('/post/:id', token.validateToken, async (req, res) => {
  const { id } = req.params;
  const { code, message } = await post.getOne(id);
  return res.status(code).json(message);
});

app.put('/post/:id', token.validateToken, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { email } = req.user;
  const { code, message } = await post.editPost(id, email, title, content);
  return res.status(code).json(message);
});

app.delete('/post/:id', token.validateToken, async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;
  const { code, message } = await post.deletePost(id, email);
  return res.status(code).json(message);
});

// ...

// ?? importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
