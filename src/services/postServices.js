const { BlogPost, Category, User } = require('../database/models');

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

module.exports = {
  getAll,
  getOne,
};  