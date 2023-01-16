const { productService } = require('../services');

const getAll = async (req, res) => {
  const productList = await productService.getAll();
  res.status(200).json(productList);
};

module.exports = { getAll };