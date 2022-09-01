const postService = require('../services/postServices');

async function getAll() {
  const result = await postService.getAll();
  return { code: 200, message: result };
}

async function getOne(id) {
  const result = await postService.getOne(id);
  if (result === null) return { code: 404, message: { message: 'Post does not exist' } };
  return { code: 200, message: result };
}

async function newPost(email, title, content, categoryIds) {
  const result = await postService.newPost(email, title, content, categoryIds);
  const conditions = !title || !content || !categoryIds.length;
  if (conditions) return { code: 400, message: { message: 'Some required fields are missing' } };
  if (categoryIds.length === 0) return { code: 400, message: { message: 'Post does not exist' } };
  return { code: 201, message: result };
}

module.exports = { getAll, getOne, newPost };