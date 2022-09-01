/* eslint-disable max-lines-per-function */
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
      {
        userId: id,
        title,
        content,
        categoryIds,
        published: Date.now(),
        updated: Date.now(),
      },
      { transaction: t },
    );

    // await PostCategory.create(
    //   categoryIds.forEach((item) => ({
    //     postId: createPost.id,
    //     categoryId: item,
    //   })), { transaction: t },
// );

    const postCategoryObj = categoryIds.map((item) => (
      {
        postId: createPost.id,
        categoryId: item,
      }
    ));

    postCategoryObj.forEach((item) =>
      PostCategory.create(
        { postId: item.postId, categoryId: item.categoryId },
      ), { transaction: t });

    t.commit();
    return createPost;
  } catch (err) {
    t.rollback();
    console.log(err.message);
  }
}

module.exports = {
  getAll,
  getOne,
  newPost,
};  