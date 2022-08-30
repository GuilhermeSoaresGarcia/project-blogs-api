const postService = require('../services/postServices');

async function getAll() {
  const result = await postService.getAll();
  return { code: 200, message: result };
}

module.exports = { getAll };