const { productModel } = require('../models');
const { validateId } = require('./validations/validateId');

const getAll = async () => {
  const productList = await productModel.getAll();
  return productList;
};

const findById = async (id) => {
  const error = validateId(id);
  if (error) return error;

  const product = await productModel.findById(id);
  return product;
};

module.exports = { getAll, findById };