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

module.exports = { getAll, getOne };