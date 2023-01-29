const { saleProductService } = require('../services');
const { errorTypes } = require('../utils/errorTypes');
const httpStatus = require('../utils/httpStatus');

const insert = async (req, res) => {
  const { type, message } = await saleProductService.insert(req.body);
  if (type) return res.status(errorTypes[type]).json({ message });
  res.status(httpStatus.CREATED).json(message);
};

const getAll = async (_req, res) => {
  const { message } = await saleProductService.getAll();
  res.status(httpStatus.OK).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleProductService.findById(id);

  if (type) return res.status(errorTypes[type]).json({ message });
  res.status(httpStatus.OK).json(message);
};

const remove = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { type, message } = await saleProductService.remove(id);
    if (type) return res.status(errorTypes[type]).json({ message });
    res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  insert,
  getAll,
  findById,
  remove,
};