const { Category } = require('../database/models');

async function addNewCategory(name) {
  const { dataValues } = await Category.create({ name });
  return dataValues;
}

module.exports = {
  addNewCategory,
};  