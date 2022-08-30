const categoryService = require('../services/categoryServices');

async function newCategory(name) {
  if (!name) return { code: 400, message: { message: '"name" is required' } };

  const result = await categoryService.addNewCategory(name); 
  return { code: 201, message: result };
}

module.exports = { newCategory };