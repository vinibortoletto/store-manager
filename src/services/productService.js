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
  
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' }; 
  return { type: null, message: product }; 
};

module.exports = { getAll, findById };