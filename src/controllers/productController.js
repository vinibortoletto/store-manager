const { productService } = require('../services');
const { errorTypes } = require('../utils/errorTypes');
const { OK } = require('../utils/httpStatus');

const getAll = async (req, res) => {
  const productList = await productService.getAll();
  res.status(200).json(productList);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.findById(id);

  if (type) return res.status(errorTypes[type]).json({ message });
  res.status(OK).json(message);
};

module.exports = { getAll, findById };