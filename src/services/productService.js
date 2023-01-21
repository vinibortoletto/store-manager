const { productModel } = require('../models');
const { validateId } = require('./validations/validateId');
const { validateNewProduct } = require('./validations/validateNewProduct');

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

const insert = async (newProduct) => {
  const error = validateNewProduct(newProduct);
  if (error) return error;
    
  const insertedProductId = await productModel.insert(newProduct);
  const insertedProduct = await productModel.findById(insertedProductId);

  return { type: null, message: insertedProduct };
};

const update = async (newProduct, id) => {
  const error = validateNewProduct(newProduct);
  if (error) return error;

  const hasProduct = await productModel.findById(id);
  if (!hasProduct) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' }; 

  await productModel.update(newProduct, id);
  const updatedProduct = await productModel.findById(id);

  return { type: null, message: updatedProduct };
};

const remove = async (id) => {
  const hasProduct = await productModel.findById(id);
  if (!hasProduct) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' }; 

  await productModel.remove(id);
  return { type: null, message: '' };
};

module.exports = {
  getAll,
  findById,
  insert,
  update,
  remove,
};