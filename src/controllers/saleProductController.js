const { saleProductService } = require('../services');
const { errorTypes } = require('../utils/errorTypes');
const httpStatus = require('../utils/httpStatus');

const insert = async (req, res) => {
  const { type, message } = await saleProductService.insert(req.body);
  if (type) return res.status(errorTypes[type]).json({ message });
  res.status(httpStatus.CREATED).json({ message });
};

module.exports = { insert };