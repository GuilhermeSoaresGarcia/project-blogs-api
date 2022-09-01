const postService = require('../services/postServices');
const categoryService = require('../services/categoryServices');

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
  const conditions = !title || !content;
  if (conditions) return { code: 400, message: { message: 'Some required fields are missing' } };
  if (categoryIds.length === 0) return { code: 400, message: { message: 'Post does not exist' } };

  const categoryVerification = await Promise.all(
    categoryIds.map((catId) => categoryService.getOne(catId)),
  );
  if (categoryVerification.includes(null)) {
    return { code: 400, message: { message: '"categoryIds" not found' } };
  }

  const result = await postService.newPost(email, title, content, categoryIds);
  return { code: 201, message: result };
}

module.exports = { getAll, getOne, newPost };