const { saleProductService } = require('../services');
const { errorTypes } = require('../utils/errorTypes');
const httpStatus = require('../utils/httpStatus');

const insert = async (req, res) => {
  const { type, message } = await saleProductService.insert(req.body);
  if (type) return res.status(errorTypes[type]).json({ message });
  res.status(httpStatus.CREATED).json(message);
};

const getAll = async (_req, res) => {
  const { type, message } = await saleProductService.getAll();
  if (type) return res.status(errorTypes[type]).json({ message });
  res.status(httpStatus.OK).json(message);
};

module.exports = { insert, getAll };