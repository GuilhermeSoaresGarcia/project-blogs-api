const { Category } = require('../database/models');

async function addNewCategory(name) {
  const { dataValues } = await Category.create({ name });
  return dataValues;
}

async function getAll() {
  const result = await Category.findAll();
  return result;
}

async function getOne(id) {
  const result = await Category.findByPk(id);
  return result;
}

module.exports = {
  addNewCategory,
  getAll,
  getOne,
};  