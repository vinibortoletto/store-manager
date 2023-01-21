const { productService } = require('../services');
const { errorTypes } = require('../utils/errorTypes');
const { OK, CREATED } = require('../utils/httpStatus');

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

const insert = async (req, res) => {
  const newProduct = req.body;
  const { type, message } = await productService.insert(newProduct);

  if (type) return res.status(errorTypes[type]).json({ message });
  res.status(CREATED).json(message);
};

const update = async (req, res) => {
  const newProduct = req.body;
  const { id } = req.params;
  const { type, message } = await productService.update(newProduct, id);

  if (type) return res.status(errorTypes[type]).json({ message });
  res.status(OK).json(message);
};

module.exports = { getAll, findById, insert, update };