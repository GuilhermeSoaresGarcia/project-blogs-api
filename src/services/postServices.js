const Sequelize = require('sequelize');

const { Op } = Sequelize;

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

async function deletePost(id) {
  const data = await BlogPost.findByPk(id);
  const result = await data.destroy();
  return result;
}

async function editPost(id, title, content) {
  const data = await getOne(id);
  await data.set({
    title,
    content,
  });
  const modifiedData = await data.save();
  return modifiedData;
}

async function searchPost(q) { // Me baseei neste SO para entender o uso do like: https://stackoverflow.com/a/53972540/18172843
  const result = await BlogPost.findAll(
    {
      include: [{
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
      where:
        { [Op.or]: { title: { [Op.like]: `%${q}%` }, content: { [Op.like]: `%${q}%` } } }, // Para o uso do "OR", me baseei neste SO: https://stackoverflow.com/a/31390257/18172843
    },
  );

  return result;
}

module.exports = {
  getAll,
  getOne,
  newPost,
  deletePost,
  editPost,
  searchPost,
};  