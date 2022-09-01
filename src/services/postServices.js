const { BlogPost, Category, User, PostCategory, sequelize } = require('../database/models');

async function getAll() {
  const result = await BlogPost.findAll(
    {
      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: 'password' },
        },
        {
          model: Category,
          as: 'categories',
          through: { attributes: [] },
        },
      ],
    },
  );
  return result;
}

async function getOne(id) {
  const result = await BlogPost.findByPk(id,
    {
      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: 'password' },
        },
        {
          model: Category,
          as: 'categories',
          through: { attributes: [] },
        },
      ],
    });
  return result;
}

async function newPost(email, title, content, categoryIds) {
  const { id } = await User.findOne({ where: { email } });
  const t = await sequelize.transaction();
  try {
    const createPost = await BlogPost.create(
      { userId: id, title, content, categoryIds, published: Date.now(), updated: Date.now() },
      { transaction: t },
    );

    await Promise.all(categoryIds.map((catId) => (
      PostCategory.create(
        { postId: createPost.id, categoryId: catId }, { transaction: t },
      ))));

    t.commit();

    return createPost;
  } catch (err) {
    t.rollback();
    return { code: 404, message: err.message };
}
}

module.exports = {
  getAll,
  getOne,
  newPost,
};  