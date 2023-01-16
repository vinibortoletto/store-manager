const { productModel } = require('../models');

const getAll = async () => {
  const productList = await productModel.getAll();
  return productList;
};

module.exports = { getAll };