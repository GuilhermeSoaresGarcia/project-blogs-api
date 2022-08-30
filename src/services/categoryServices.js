const { Category } = require('../database/models');

async function addNewCategory(name) {
  const { dataValues } = await Category.create({ name });
  return dataValues;
}

async function getAll() {
  const result = await Category.findAll();
  return result;
}

module.exports = {
  addNewCategory,
  getAll,
};  