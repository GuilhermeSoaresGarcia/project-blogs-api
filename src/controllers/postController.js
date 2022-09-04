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

async function deletePost(id, email) {
  const post = await postService.getOne(id);
  if (!post) return { code: 404, message: { message: 'Post does not exist' } };
  if (post.user.email !== email) return { code: 401, message: { message: 'Unauthorized user' } };
  await postService.deletePost(id);
  return { code: 204 };
}

async function editPost(id, email, title, content) {
  const post = await postService.getOne(id);
  if (post.user.email !== email) return { code: 401, message: { message: 'Unauthorized user' } };
  if (!title || !content) {
    return { code: 400, message: { message: 'Some required fields are missing' } };
  }
  const result = await postService.editPost(id, title, content);
  return { code: 200, message: result };
}

async function searchPost(q) {
  const result = await postService.searchPost(q);
  return { code: 200, message: result };
}

module.exports = { getAll, getOne, newPost, deletePost, editPost, searchPost };