const { productService } = require('../services');
const { OK } = require('../utils/httpStatus');

const getAll = async (req, res) => {
  const productList = await productService.getAll();
  res.status(200).json(productList);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const product = await productService.findById(id);
  res.status(OK).json(product);
};

module.exports = { getAll, findById };